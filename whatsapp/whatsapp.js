const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const client = new Client();
const fs = require('fs');


const generateQR = async () => {
  try {
    client.initialize();

    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    return await new Promise((resolve, reject) => {
      client.on("ready",() => {
        console.log("Usuario logueado");

        fs.writeFile('user.json',JSON.stringify({logged:true}),(err, result) =>{
            if(err) console.log('Error creando user.json', err);
        } );

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

module.exports = {
  generateQR,
  sendMessageWS,
};
