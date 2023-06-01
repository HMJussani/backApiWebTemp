const {db} = require('./firebase');

async function salvar(temp, umi,  hora, data,  ano, mes) {   
   try {
        await db.collection('Temperatura')
                .doc("ControlTemp").collection(ano)                
                .doc(mes).collection(data)
                .doc(hora)               
                .set({
                    temp: temp,
                    umi: umi,                   
                    hora: hora,
                    data: data,
                                       
                }); 
              return true; 
   } catch (error) {
    return false;
   }
}

module.exports = salvar;