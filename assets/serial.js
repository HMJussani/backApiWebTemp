const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const salvar = require('./salvar');
const tempo = 1000; 
let cont =0;

function serial (path) {
  const port = new SerialPort(path, {
    baudRate: 115200
  })
  
  const parser = new Readline();
  port.pipe(parser);
  
  setTimeout(inicio, 1000);

  parser.on('data', line => {
    if(cont===0|cont ===90){
    let recorte = line.split(';');
    //recorte[2] =recorte[2].replace('/','-');
    //recorte[2] =recorte[2].replace('/','-');
    let ano = recorte[3].split('.');   
    salvar(recorte[0],recorte[1],recorte[2],recorte[3],ano[2],ano[1]); 
    //console.log(`> ${recorte}`);  
    console.log(`> ${recorte[0]} : ${recorte[2]} `);  
    cont=1;
  }
  cont++;
  });
  function getdata () {     
    port.write('getDados#');
  }

  function inicio(){
    if(cont===0){      
      console.log('Buscando dados'); 
      port.write('getDados#');   
    }
  }

  setInterval(getdata, tempo*10);
  return true;
}

module.exports = serial;