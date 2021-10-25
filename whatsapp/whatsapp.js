const qrcode = require("qrcode-terminal");
const fs = require('fs');
const fsSync = require('fs').promises;
const { Client } = require("whatsapp-web.js");

let client 
const SESSION_FILE_PATH = __dirname + "session.json";

const statusLogin = () => {

  console.log('Checking status login...');
  

  // Load the session data if it has been previously saved
  let sessionData;
  if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
  }
  // Use the saved values
  client = new Client({
    session: sessionData,
    puppeteer: { headless: true, args: ["--no-sandbox"] },
  });

  client.initialize()
  // Save session values to the file upon successful auth
  client.on("authenticated", (session) => {
    sessionData = session;
    console.log(session);
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  
  client.on("ready",() => console.log("Usuario logueado"))
};


const generateQR = async () => {
  try {

    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    return await new Promise((resolve, reject) => {
      client.on("ready",() => {
        /* console.log("Usuario logueado"); */

        /* fs.writeFile('user.json',JSON.stringify({logged:true}),(err, result) =>{
            if(err) console.log('Error creando user.json', err);
        } ); */

        resolve("Servicio listo para enviar mensajes");
      });
    });

  } catch (error) {
    return error;
  }
};

const sendMessageWS = async (code, phone, message) => {
  const number = `${code + phone}`;

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";

  return await new Promise((resolve, reject) => {

      
      client.sendMessage(chatId, message).then((response) => {
        if (response.id.fromMe) {

         resolve({
            message: `Message successfully sent to ${number}`,
          })
          
        }
      })

  });

};

const logout = async () => {
  try {

    return await new Promise((resolve, reject) => {

      client.logout().then(()=> {

        fsSync.unlink('session.json').catch(()=>{})
        fsSync.unlink('whatsappsession.json').catch(()=>{})

        console.log("Usuario Desvinculado");
        resolve('Ha cerrado Sesion');
      }) 
      
    });

  } catch (error) {
    return error;
  }
};



module.exports = {
  logout,
  statusLogin,
  generateQR,
  sendMessageWS,
};
