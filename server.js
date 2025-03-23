const express = require("express");
const app = express();

const productsRoute = require("./routes/products");

app.use("/products", productsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
