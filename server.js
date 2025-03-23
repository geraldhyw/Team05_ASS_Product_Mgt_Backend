const express = require("express")
const sequelize = require('./config')
const productsRoute = require("./routes/products");
const { seedData } = require("./seed");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

sequelize.sync({ force: false })  // Set force: true to drop and recreate tables
  .then(() => {
    console.log('Database started and tables created!')
    seedData()
  })
  .catch(err => {
    console.error('Error syncing database: ', err)
  });


app.use("/products", productsRoute)

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`)
});
