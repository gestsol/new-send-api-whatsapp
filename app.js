const express = require("express");
const path = require("path");
const cors = require('cors');
const whatsappClient = require('./whatsapp/whatsapp');
const whatsAppRoutes = require("./routes/whatsapp.route");
const serverControlRoutes = require("./routes/server-control.route");

const app = express();
const port = process.env.WHATSAPP_PORT || 3003;

/* fs.unlink('user.json').catch(()=>{}) */

//CORS
app.use(cors('*'));

app.set("views", path.join(__dirname, "views"));
// serving static files
app.use(express.json());

/* Rutas */
app.use("/whatsapp", whatsAppRoutes);
app.use("/server-control", serverControlRoutes);

/* Primero esperar chequear que haya usuario logeado e inicializar el cliente antes 
de empezar a recibir solicitudes.  */
whatsappClient.init().then(() => {
  app.listen(port, () => {
    console.log(`Listen in Port ${port}`);
  });
})

