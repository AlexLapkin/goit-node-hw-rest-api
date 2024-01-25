const mongoose = require("mongoose");
const app = require("./app");

const { DB_URI, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successFully");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
