const mysql = require('mysql')
// View users


// Connection port
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

//Connection to DB




exports.viewAllStudent = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM student WHERE status != "deleted"', (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                const removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            } else {
                console.log(err);
            } 
        })
    })

}


exports.find = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM student WHERE studid LIKE ? OR name LIKE ? OR address LIKE ? OR course LIKE ? OR status LIKE ? AND status NOT LIKE "deleted"',
                         ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            } 
        })
    })
}
 

exports.formStudent = (req, res) => {
    res.render('students/add-student')
}

exports.createStudent = (req, res) => {
    //  res.render('add-student')
    const { studid, course, name, address, contactno, status } = req.body;
    console.log(req.body)
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('INSERT INTO student SET studid = ?, name= ?, course = ?, address = ?, contactno = ?, status = ?',
                         [studid ,name, course, address, contactno, status], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('students/add-student', {alert: "User added successfully!", flag:"success"});
            } else {  
                res.render('students/add-student', {alert: "Invalid student entry!", flag:"danger"});
                console.log(err.message) 
            }
            console.log("The data from user table: \n", rows)
        })
    })
}

// Edit student
exports.editStudent = (req, res) => {  
     const studid = req.params.id;
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM student WHERE studid = ?', [studid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                console.log(rows)
                res.render('students/edit-student', { rows });
            } else {
                console.log(err);
            } 
        })
    })
}

exports.updateStudent = (req, res) => {   
    const { studid, course, name, address, contactno, status } = req.body; 
    console.log("Studid: ", studid)
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('UPDATE student SET name= ?, course = ?, address = ?, contactno = ?, status = ? WHERE studid = ?',
                         [name, course, address, contactno, status, req.params.id], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) { 
                pool.getConnection((error, connection) => {
                    if (error) throw error; // not connected
                    console.log("Connected as ID" + connection.threadId);
                    connection.query('SELECT * FROM student WHERE studid = ?', [req.params.id], (err, rows) => {
                        // when done with connection release the connection
                        connection.release();
                        if (!err) {
                            console.log(rows)
                            res.render('students/edit-student', { rows, alert: "Student has been updated!", flag:"success"});
                        } else {
                            console.log(err);
                        } 
                    })
                })
            } else {  
                res.render('students/add-student', {alert: "Invalid update!", flag:"danger"});
                console.log(err.message) 
            } 
        })
    })
}

//Delete User
exports.deleteStudent = (req, res) => {
    const studid = req.params.id;  
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('UPDATE student SET status = "deleted" WHERE studid = ?', [studid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                let removedUser = encodeURIComponent("User Succesfully Removed.")
                res.redirect('/?removed='+removedUser);
            } else {
                console.log(err);
            } 
        })
    })
}

exports.viewStudent = (req, res) => {
    const studid = req.params.id;
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM student WHERE studid = ?', [studid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('students/view-student', { rows });
            } else {
                console.log(err);
            } 
        })
    })

}