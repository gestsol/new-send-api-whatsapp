const express = require("express");
const path = require("path");
const app = express();
const whatsAppRoutes = require("./routes/whatsapp.route");
const fs = require('fs').promises;
const port = process.env.PORT || 3003;


fs.unlink('user.json').catch(()=>{
  /* No hacer nada */
})

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

/* Rutas */
app.use("/whatsapp", whatsAppRoutes);


app.listen(port, () => {
  console.log(`Listen in Port ${port}`);
});
