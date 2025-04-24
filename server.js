const express = require("express")
const sequelize = require('./config')
const productsRoute = require("./routes/products")
const { seedData } = require("./seed")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const maxRetries = 120; // Maximum number of retries
const retryDelay = 5000; // Delay between retries in milliseconds (5 seconds)

function syncDatabase(retries = 0) {
  sequelize.sync({ force: false }) // Set force: true to drop and recreate tables
    .then(() => {
      console.log('Database started and tables created!');
      seedData(); // Call your seed function after the sync is successful
    })
    .catch(err => {
      console.error('Error syncing database: ', err);
      
      if (retries < maxRetries) {
        console.log(`Retrying... Attempt #${retries + 1}`);
        setTimeout(() => syncDatabase(retries + 1), retryDelay);
      } else {
        console.error('Max retries reached. Could not sync the database.');
      }
    });
}

if (process.env.NODE_ENV !== "production") {
  syncDatabase(); // Start the sync process
}


app.use("/products", productsRoute)

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`)
})
