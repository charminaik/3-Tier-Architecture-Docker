const express = require('express');
const mysql = require('mysql2'); // Import mysql2 instead of mysql

const connection = mysql.createConnection({
    host: '172.22.0.4',
    user: 'root', // default user
    database: 'cn',
    password: '12345678' // Provide the correct password here
    
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/user', (req, res) => {
    const { name, email, message } = req.body;

    const sqlQuery = 'INSERT INTO Persons (name, email, message) VALUES (?, ?, ?)';
    connection.query(sqlQuery, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            res.status(500).send(err);
            return;
        }
        console.log('Form data inserted successfully.');
        res.send('Form submitted successfully.');
    });
});

app.get('/data', (req, res) => {
    const sqlQuery = 'SELECT * FROM Persons';
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            res.status(500).send(err);
            return;
        }
        res.send(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
