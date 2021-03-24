const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist", "angular-login-ngrx")));

app.get("/*", (req, res, next) => {
  console.log(
    "Path:",
    path.join(__dirname, "dist", "angular-login-ngrx", "index.html")
  );
  return res.sendFile(
    path.join(__dirname, "dist", "angular-login-ngrx", "index.html")
  );
});

app.listen(process.env.PORT || 3000);
