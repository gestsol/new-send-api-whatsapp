/* 2do en los controladores organizamos las respuestas del Server hacia los CLientes */
const { processRestart, processExit } = require('../server-control/server-control');


exports.restartServer = async (req, res, next) => {

  try {

    res.status(200).json({
      message :"Server Restarted"
    });

    processRestart()

  } catch (err) {

    console.log(err);

    res.status(500).json({
      status: "fail",
      message: "Unable to reset server",
    });

  }
};

exports.shutdownServer = async (req, res, next) => {

  try {

    res.status(200).json({
      message :"Server Shutdown"
    });

    processExit()

  } catch (err) {

    console.log(err);

    res.status(500).json({
      status: "fail",
      message: "Unable to Shutdown server",
    });

  }
};