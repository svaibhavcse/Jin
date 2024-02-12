const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "JinTimesheet",
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + db.threadId);
});

// API endpoint to store tasks
app.post('/storeData', (req, res) => {
  const tasks = req.body.tasks;
  const sales = req.body.sales;
//truncate the table to avoid duplicate entryies
db.query('Truncate Table tasks');
db.query('Truncate Table sales');
  // Check if tasks and sales are arrays
  if (!Array.isArray(tasks) || !Array.isArray(sales)) {
      return res.status(400).json({ error: "Invalid data format" });
  }

  // Store tasks
  const tasksSql = 'INSERT INTO tasks (id, projectName, task, comment, mon, tue, wed, thu, fri, sat, sun, tot) VALUES ?';
  db.query(tasksSql, [tasks.map(task => Object.values(task))], (err, result) => {
      if (err) {
          console.error('Error storing tasks: ' + err.stack);
          return res.status(500).json({ error: "Error storing tasks" });
      }
      
      // Store sales after tasks are stored
      const salesSql = 'INSERT INTO sales (id, projectName, task, comment, mon, tue, wed, thu, fri, sat, sun, tot) VALUES ?';
      db.query(salesSql, [sales.map(sale => Object.values(sale))], (err, result) => {
          if (err) {
              console.error('Error storing sales: ' + err.stack);
              return res.status(500).json({ error: "Error storing sales" });
          }
          res.status(200).json({ message: "Data stored successfully" });
      });
  });
});

// Port configuration
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
