const whatsappClient = require('../whatsapp/whatsapp');

exports.getQRfromWs = async (req, res, next) => {

  try {

    const msg = await whatsappClient.generateQR();

    res.status(200).json({
      msg
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      status: "fail",
      message: "Unable to get QR code from Whatsapp.",
    });

  }
};

exports.sendMessage = async (req, res, next) => {

  const { code, phone, message } = req.body;

  if (!code || !phone || !message) {
    return res.status(400).json({
      status: 'fail',
      message: 'Faltan Campos',
    });
  }

  try {

   /*  await fs.readFile('user.json', (err, data) => {
      if (err) throw new Error("No hay dispositivo conectado"); */
      /* let user = JSON.parse(data);
      console.log(user); 
   });*/

    const msg = await whatsappClient.sendMessageWS(code, phone, message);

    return res.status(200).json({
      status: "success",
      ...msg
    });
    
  } catch (err) {

    console.log(err);
    res.status(500).json({
      status: "fail",
      message: 'No hay dispositivo conectado',
    });
  }
};

exports.logoutFromWS = async (req, res, next) => {

  try {

    const msg = await whatsappClient.logout();

    res.status(200).json({
      msg
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      status: "fail",
      message: "Unable to Logout from Whatsapp.",
    });

  }
};
