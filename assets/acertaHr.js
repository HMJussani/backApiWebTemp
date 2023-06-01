/**
 * Retomada 16/03/2023
*/
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const os = require('os');

let path = 'COM6';
let osSys = os.platform();
if (osSys === 'linux') path = '/dev/ttyUSB0';
const port = new SerialPort(path, {
  baudRate: 115200
})

const parser = new Readline();
port.pipe(parser);

const time = new Date();

function data() {
  let mes = time.getMonth() + 1;
  let dia = time.getDate();
  if (mes < 9) mes = '0' + mes;
  if (dia < 9) dia = '0' + dia;
  const data = dia + '/' + mes + '/' + time.getFullYear() + '#';
  return data;
}

function hora() {
  let hora = time.getHours();
  let min = time.getMinutes();
  let seg = time.getSeconds();
  if (hora < 9) hora = '0' + hora;
  if (min < 9) min = '0' + min;
  if (seg < 9) seg = '0' + seg;
  const horario = hora + ':' + min + ':' + seg + '#';
  return horario;
}



parser.on('data', line => {
  console.log(`=> ${line}`);
});

function acertaHr(funcao) {

    if(funcao==null){
      console.log('Digite [reset] para resetar.');
      console.log('Digite [getVal] para leitura do sensor.');
      console.log('Digite [getdata] para informacoes do sensor.');
      console.log('Digite [hora] para sincronizar data e hora com este host.');
      console.log('CRTL+c para sair.');
    }

    if(funcao==='reset'){
      port.write('rst#');
    }

    if(funcao==='getVal'){
      port.write('getDados#');
    }

    if(funcao==='getdata'){
      port.write('000?#');
    }
    if(funcao==='hora'){
      port.write(hora()); 
      console.log('Ajustada hora com a hora deste host '+ hora()); 
      port.write(data()); 
      console.log('Ajustada data com a data deste host '+ data());
      port.write('getVal#');
      console.log('CRTL+c para sair.');
    }
  }

acertaHr((process.argv[2]));


