const {db} = require('./firebase');

async function salvar(id, data, hora, temp, ano, mes) {   
   try {
        await db.collection('Temperatura')
                .doc(id).collection(ano)                
                .doc(mes).collection(data)
                .doc(hora)               
                .set({
                    id: id,
                    data: data,
                    hora: hora,
                    temp: temp                    
                }); 
              return true; 
   } catch (error) {
    return false;
   }
}

module.exports = salvar;