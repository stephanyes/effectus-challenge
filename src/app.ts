import router from "./routes/routes";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
