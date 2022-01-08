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
exports.viewAllInstructor = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM instructor', (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                const removedInstuctor = req.query.removed;
                res.render('instructor/viewall-instructor', { rows, removedInstuctor });
            } else {
                console.log(err);
            } 
        })
    })

}


exports.findInstructor = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM student WHERE instructorid LIKE ? OR name LIKE ? OR address LIKE ? OR course LIKE ? OR status LIKE ? AND status NOT LIKE "deleted"',
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
 

exports.formInstructor = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM course', (err, courses) => {
            // when done with connection release the connection
            connection.release();
            if (!err) { 
                res.render('instructor/add-instructor', {courses})
            } else {
                console.log(err);
            } 
        })
    }) 
}

exports.createInstructor = (req, res) => {
    //  res.render('add-student')
    const { instructorid, instructorname, yearsofexperience, domain, courseid } = req.body;
    console.log(req.body)
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
 

        connection.query('INSERT INTO instructor SET instructorid = ?, instructorname= ?, yearsofexperience = ?, domain = ?, courseid = ?',
                         [instructorid ,instructorname, yearsofexperience, domain, courseid ], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('instructor/add-instructor', {alert: "Instructor added successfully!", flag:"success"});
            } else {  
                res.render('instructor/add-instructor', {alert: "Invalid instructor entry!", flag:"danger"});
                console.log(err) 
            }
            console.log("The data from user table: \n", rows)
        })
    })
}

// Edit student
exports.editInstructor = (req, res) => {  
     const instructorid = req.params.id;
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM instructor WHERE instructorid = ?', [instructorid], (err, rows) => {
            // when done with connection release the connection
             connection.release();
            if (!err) {
                console.log(rows)
                res.render('instructor/edit-instructor', { rows });
            } else {
                console.log(err);
            } 
             
        })
    })
}

exports.updateInstructor = (req, res) => {   
    const { instructorname, yearsofexperience, domain, courseid } = req.body;  
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('UPDATE instructor SET instructorname= ?, yearsofexperience = ?, domain = ?, courseid = ? WHERE instructorid = ?',
                         [ instructorname, yearsofexperience, domain, courseid, req.params.id], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) { 
                pool.getConnection((error, connection) => {
                    if (error) throw error; // not connected
                    console.log("Connected as ID" + connection.threadId);
                    connection.query('SELECT * FROM instructor WHERE instructorid = ?', [req.params.id], (err, rows) => {
                        // when done with connection release the connection
                        connection.release();
                        if (!err) {
                            console.log(rows)
                            res.render('instructor/edit-instructor', { rows, alert: "Instructor has been updated!", flag:"success"});
                        } else {
                            console.log(err);
                        } 
                    })
                })
            } else {  
                res.render('instructor/add-instructor', {alert: "Invalid update!", flag:"danger"});
                
                console.log(err.message) 
            } 
        })
    })
}

//Delete User
exports.deleteInstructor = (req, res) => {
    const instructorid = req.params.id;  
     pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('DELETE FROM instructor WHERE instructorid = ?', [instructorid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                let removedUser = encodeURIComponent("User Succesfully Removed.")
                res.redirect('/viewallinstructor/?removed='+removedUser);
            } else { 
                let removedUser = encodeURIComponent("User Succesfully Removed.")
                res.redirect('/viewallinstructor/?removed='+removedUser);
            } 
        })
    })
}

exports.viewInstructor = (req, res) => {
    const instructorid = req.params.id;
    pool.getConnection((error, connection) => {
        if (error) throw error; // not connected
        console.log("Connected as ID" + connection.threadId);
        connection.query('SELECT * FROM instructor WHERE instructorid = ?', [instructorid], (err, rows) => {
            // when done with connection release the connection
            connection.release();
            if (!err) {
                res.render('instructor/view-instructor', { rows });
            } else {
                console.log(err);
            } 
        })
    })

}