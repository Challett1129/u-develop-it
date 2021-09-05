const db = require('./db/connections')
const apiRoutes = require('./routes/apiRoutes')
const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck')

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.use('/api', apiRoutes);

// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

//Start server after a DB connection 
db.connect(err => {
  if (err) throw err; 
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
});