const express = require("express");
const path = require("path");
const app = express();
const { statusLogin } = require('./whatsapp/whatsapp')
const whatsAppRoutes = require("./routes/whatsapp.route");
const serverControlRoutes = require("./routes/server-control.route");

const fs = require('fs').promises;
const port = process.env.PORT || 3003;


/* fs.unlink('user.json').catch(()=>{}) */

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.set("views", path.join(__dirname, "views"));
// serving static files
app.use(express.json());

/* Chequeamos si ya hay  usuario logueado  */
statusLogin()

/* Rutas */
app.use("/whatsapp", whatsAppRoutes);
app.use("/server-control", serverControlRoutes);

app.listen(port, () => {
  console.log(`Listen in Port ${port}`);
});
