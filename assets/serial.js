const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const salvar = require('./salvar');
const tempo = 60000; //1min
let cont =0;

const time = new Date();
const mes = time.getMonth()+1;
const hoje = time.getDate()+'/'+mes+'/'+time.getFullYear()+'#';
const hora = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+'#';

 function serial (path) {
  const port = new SerialPort(path, {
    baudRate: 115200
  })
  
  const parser = new Readline();
  port.pipe(parser);
  
  setTimeout(inicio, 1000);

  parser.on('data', line => {
    if(cont===0|cont ===6){
    let recorte = line.split(';');
    recorte[2] =recorte[2].replace('/','-');
    recorte[2] =recorte[2].replace('/','-');
    const salvo = salvar(recorte[0],recorte[2],recorte[1],recorte[3]);
    console.log(`> ${recorte[3]}`);
    cont=1;
  }
  cont++;
  });
  function getdata () {
    port.write('getVal#\n');
  }

  function inicio(){
    if(cont===0){ 
      port.write(hoje);
      port.write(hora); 
      console.log('Ajustado o relógio com o relógio deste host') 
      port.write('getVal#\n');   
    }
  }

  setInterval(getdata, tempo*10);
  return true;
}

module.exports = serial;
//serial((process.argv[2]));


