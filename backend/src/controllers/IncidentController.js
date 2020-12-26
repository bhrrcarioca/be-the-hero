const connection = require('../database/connection')


module.exports = {

  async index(request, response) {
    const {page = 1} = request.query; // pagina 1 vindo da requisição por padrão

    const [count] = await connection('incidents').count(); // cconta o total de incidents

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // junta tabela ongs com incidents
      .limit(5) // define quantidade porpágina
      .offset((page - 1) * 5) // define a partir de onde vai ser a paginação
      .select([
        'incidents.*',
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]); // campos selecionados das tabelas

      response.header('X-Total-Count', count['count(*)']) // envia a resposta pelo cabecalho

    return response.json(incidents);
  },

  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    
    
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })
     
    return response.json({ id });
  },

  async delete (request, response){
    const { id }= request.params; //trás o id do parãmetro da requisição
    const ong_id = request.headers.authorization; // trás o id da ong

    const incident = await connection('incidents') 
      .where('id', id) // busca no banco de dados um incidente igual ao pedido
      .select('ong_id') // seleciona o id da ONG 
      .first(); // aplica no primeiro

      if (incident.ong_id !== ong_id) { // if de comparação de ong id para evitar que o incidente de otura ong seja deletado
        return response.status(401).json({error: 'Operation not permitted.'})
      }

      await connection ('incidents').where('id', id).delete();

      return response.status(204).send() // resposta de conteúdo vazio
  }

}