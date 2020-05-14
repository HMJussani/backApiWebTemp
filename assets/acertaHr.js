const SerialPort = require('serialport');
const time = new Date();
const mes = time.getMonth()+1;
const hoje = time.getDate()+'/'+mes+'/'+time.getFullYear()+'#';
const hora = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+'#';

function acertar(path) {
  const port = new SerialPort(path, {
    baudRate: 115200
  });
  if(port.isOpen){
  port.write(hora);
  port.write(hoje);
  port.close();
  return true;
  }
  return false;
}
module.exports = acertar;