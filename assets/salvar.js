const {db} = require('./firebase');

async function salvar(id,data, hora, temp) {   
   try {
        await db.collection('Temperatura')
                .doc(id).collection(data)
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