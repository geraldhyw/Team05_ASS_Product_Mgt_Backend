const express = require("express");
const mysql = require('mysql2')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost', // or ip address
  user: "user123",
  password: 'password123',
  database: 'mysqldb'
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack)
    return
  }
  console.log("Connected to MySQL!")
})

const productsRoute = require("./routes/products");

app.use("/products", productsRoute);

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
