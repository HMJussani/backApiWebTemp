const serial = require('./serial');
const os = require('os');

let path = 'COM3';
let osSys = os.platform();

if(osSys==='linux') path = '/dev/ttyUSB0';

const conectado = serial(path);
if(conectado){
    console.log(`Conectado em: ${path}`);
}





