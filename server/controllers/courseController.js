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
exports.viewAllCourse = (req, res) => {
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


exports.findCourse = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM course WHERE studid LIKE ? OR name LIKE ? OR address LIKE ? OR course LIKE ? OR status LIKE ? AND status NOT LIKE "deleted"',
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
 

exports.formCourse = (req, res) => {
    res.render('course/add-course')
}

exports.createCourse = (req, res) => {
    //  res.render('add-course')
    const { studid, course, name, address, contactno, status } = req.body;
    console.log(req.body)
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('INSERT INTO course SET studid = ?, name= ?, course = ?, address = ?, contactno = ?, status = ?',
                         [studid ,name, course, address, contactno, status], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('course/add-course', {alert: "User added successfully!", flag:"success"});
            } else {  
                res.render('course/add-course', {alert: "Invalid course entry!", flag:"danger"});
                console.log(err.message) 
            }
            console.log("The data from user table: \n", rows)
        })
    })
}

// Edit course
exports.editCourse = (req, res) => {  
     const studid = req.params.id;
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM course WHERE studid = ?', [studid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                console.log(rows)
                res.render('course/edit-course', { rows });
            } else {
                console.log(err);
            } 
        })
    })
}

exports.updateCourse = (req, res) => {   
    const { studid, course, name, address, contactno, status } = req.body; 
    console.log("Studid: ", studid)
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('UPDATE course SET name= ?, course = ?, address = ?, contactno = ?, status = ? WHERE studid = ?',
                         [name, course, address, contactno, status, req.params.id], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) { 
                pool.getConnection((error, connection) => {
                    if (error) throw error; // not connected
                    console.log("Connected as ID" + connection.threadId);
                    connection.query('SELECT * FROM course WHERE studid = ?', [req.params.id], (err, rows) => {
                        // when done with connection release the connection
                        connection.release();
                        if (!err) {
                            console.log(rows)
                            res.render('course/edit-course', { rows, alert: "course has been updated!", flag:"success"});
                        } else {
                            console.log(err);
                        } 
                    })
                })
            } else {  
                res.render('course/add-course', {alert: "Invalid update!", flag:"danger"});
                console.log(err.message) 
            } 
        })
    })
}

//Delete User
exports.deleteCourse = (req, res) => {
    const studid = req.params.id;  
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('UPDATE course SET status = "deleted" WHERE studid = ?', [studid], (err, rows) => {
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

exports.viewCourse = (req, res) => {
    const studid = req.params.id;
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM course WHERE studid = ?', [studid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('course/view-course', { rows });
            } else {
                console.log(err);
            } 
        })
    })

}