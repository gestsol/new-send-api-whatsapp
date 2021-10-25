/* 1ero creamos las logicas que posteriormente seran asociadas en los controladores */
const express = require('express');


const processRestart = () =>{ 
    
    setTimeout(function () {
        process.on("exit", function () {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached : true,
                stdio: "inherit"
            });
        });
        process.exit();
    }, 2000)
} 

const processExit = () => process.exit(1); 


module.exports = {
    processRestart,
    processExit
 };