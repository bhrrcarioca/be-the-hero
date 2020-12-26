const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization; // usar o id da ong 

    const incidents = await connection('incidents') // método que pega todos os incidents de uma ong
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents) // retorno em json que nesse caso volta vazio
  }  
}