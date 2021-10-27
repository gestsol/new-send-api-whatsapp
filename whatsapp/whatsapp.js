const path = require("path");
const fs = require("fs");
const fsSync = require("fs").promises;
const util = require("util");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

const SESSION_FILE_PATH = path.join(__dirname, "../session.json");

const fileExist = util.promisify(fs.exists);
const writeFile = util.promisify(fs.writeFile);

const qrListener = (qr) => {
  qrcode.generate(qr, { small: true });
};

class WhatsappClient {
  constructor() {
    this.client = null;
    this.isLoggedIn = false;
  }

  async _createClient() {
    const sessionData = await this.getSessionData();

    this.client = new Client({
      session: sessionData,
      puppeteer: { headless: true, args: ["--no-sandbox"] },
    });
  }

  async init() {
    await this._createClient();

    this.client.initialize();

    this.client.on("authenticated", async (session) => {
      try {
        await writeFile(SESSION_FILE_PATH, JSON.stringify(session));
      } catch (err) {
        console.log(err);
      }
    });

    this.client.on('auth_failure', (msg) => {
      console.log(msg);
    })

    if (this.isLoggedIn) {
      return new Promise((resolve, reject) => {
        this.client.on("ready", () => {
          const msg = 'Usuario Logeado.';
          resolve(msg);
        });
      });
    }
  }

  async getSessionData() {
    console.log("Checking status login...");

    // Load the session data if it has been previously saved
    const sessionFile = await fileExist(SESSION_FILE_PATH);

    if (!sessionFile) {
      return null;
    }

    this.isLoggedIn = true;

    return require(SESSION_FILE_PATH);
  }

  async generateQR() {
    try {
      this.client.on("qr", qrListener);

      return await new Promise((resolve, reject) => {
        this.client.on("ready", () => {
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
  }

  async sendMessageWS(code, phone, message) {
    const number = `${code + phone}`;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    return await new Promise((resolve, reject) => {
      this.client.sendMessage(chatId, message).then((response) => {
        if (response.id.fromMe) {
          resolve({
            message: `Message successfully sent to ${number}`,
          });
        }
      });
    });
  }

  async logout() {
    await fsSync.unlink(SESSION_FILE_PATH);
    await this.client.logout();
    await this.client.destroy();
    this.client.removeListener("qr", qrListener);
    this.client.options.session = undefined;
    this.client.initialize();
    this.isLoggedIn = false;
  }
}

const client = new WhatsappClient();

module.exports = client;
