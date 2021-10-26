const express = require("express");
const path = require("path");
const cors = require('cors');
const { statusLogin } = require('./whatsapp/whatsapp')
const whatsAppRoutes = require("./routes/whatsapp.route");
const serverControlRoutes = require("./routes/server-control.route");

const app = express();
const port = process.env.PORT || 3003;

/* fs.unlink('user.json').catch(()=>{}) */

//CORS
app.use(cors('*'));

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
