const crypto = require('crypto'); // importação do modulo de criptografia do node
const connection = require('../database/connection') // importação do connection

module.exports = {
  async index (request, response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response){
    const { name, email, whatsapp, city, uf} = request.body; // desestruturando dados que vem da requisição

  const id = crypto.randomBytes(4).toString('HEX'); // uso do crypto para criar número aleatório do id

  await connection('ongs').insert({ // usando os dados da requisição para serem enviados para do banco de dados
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  })

  return response.json({ id }); // devolve o id como resposta
  }
};