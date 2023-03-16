const serial = require('./serial');
const os = require('os');

let path = 'COM3';
let osSys = os.platform();

if(osSys==='linux') path = '/dev/ttyUSB0';

if(osSys==='windows') console.log('Digite inde.js + COMXX ou setar porta COM3');

function index(funcao){

    if(funcao==null){
        const conectado = serial(path);
    if(conectado){
     console.log(`Conectado em: ${path}`);
        }
    }

    if(funcao!=null){
        const conectado = serial(funcao);
    if(conectado){
     console.log(`Conectado em: ${funcao}`);
        }
    }

}

index((process.argv[2]));




