########################################
#       EXEMPLOS DE INSERCAO E CONSULTA DE DADOS(DOCUMENTOS)
########################################

# Inserir dados(documentos) em uma collection
use bdmobile
db.postagens.insert({ titulo: "Primeira Postagem", conteudo: "Conteudo 01", quantidade: 10, tags: [], redeSocial: [{ nome: "Facebook" }] });
db.postagens.insert({ titulo: "Segunda Postagem", conteudo: "Conteudo 02", quantidade: 10, tags: [], redeSocial: [{ nome: "Facebook" }] });
db.postagens.insert({ titulo: "Terceira Postagem", conteudo: "Conteudo 03", quantidade: 10, tags: [ "Esporte", "Cinema", "Praia"], redeSocial: [{ nome: "Facebook" }] });

# Mostrar todos os dados da collection
db.postagens.find();

# Exibir os dados formatados (em especial quando usando o console)
db.postagens.find().pretty();

# Limitar a quantidade de registros retornados na consulta
db.postagens.find().limit(2).pretty();
# ou
db.postagens.find().pretty().limit(2);

# Ordenar resultados de forma Crescente
db.postagens.find().sort({titulo: 1});
# Ordenar resultados de forma Decrescente
db.postagens.find().sort({titulo: -1});

# Limitar a quantidade de registros retornados e exibir de forma ordenada
db.postagens.find().sort({titulo: 1}).limit(2);

# Realizar a projeção de atributos(seleção dos atributos a serem exibidos)
db.postagens.find({}, {titulo: 1})
# ou
db.postagens.find({}, {titulo: 0})

# Por padrão, o MongoDB retorna o atributo "_id" nas consultas
# Caso não queira exibir este atributo basta adicionar o atributo "_id" na projecao com o seu valor para "false"
db.postagens.find({}, {titulo: true, _id: false}).sort({titulo: 1})

# Consultar os documentos com titulo "Primeira Postagem"
db.postagens.findOne({_id: ObjectId("5fdd0ce266c79f48e8fff4ac")});
# ou
db.postagens.findOne({titulo: "Primeira Postagem"});


# Consultar os documentos com um atributo inexistente "nome"
# Como o Mongo não trabalha com esquema rigido, não havera nenhum erro, apesar,
# claro, de não ser retornado nenhum resultado pois não existe nenhum documento com este atributo
db.postagens.findOne({nome: "Primeira Postagem"});


# Consulta especificando uma condicao de igualdade
db.postagens.find({titulo: "Primeira Postagem"});

# Consulta especificando uma condição "in"
db.postagens.find( { titulo: { $in: ["Primeira Postagem", "Segunda Postagem"] } } );

# Consulta especificando uma condição "AND"
db.postagens.find( { titulo: "Primeira Postagem", conteudo: "Conteudo 01" } );

# Consulta especificando uma condição "OR"
db.postagens.find( { $or: [ { titulo: "Primeira Postagem" }, { titulo: "Segunda Postagem" } ] } );

# Consulta especificando uma condição "MENOR QUE"
db.postagens.find( { quantidade: { $lt: 20}} );

# Consulta especificando uma condição "MAIOR QUE"
db.postagens.find( { quantidade: { $gt: 2}} );

# Contar a quantidade de registros retornados na consulta
db.postagens.count();
# ou
db.postagens.find( { titulo: "Primeira Postagem", quantidade: { $lt: 20}} ).count();

# Consulta especificando condição "AND" e "OR"
db.postagens.find( 
{   quantidade: 10,
    $or: [ { titulo: "Primeira Postagem" }, { titulo: "Segunda Postagem" } ] 
});

# Consultar informando um atributo do documento embutido ou (documento aninhado)
db.postagens.find( { "redeSocial.nome": "Facebook" });