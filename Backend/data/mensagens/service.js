function MensagemService(MensagemModel) {
  let service = {
    create,
    findAll,
    removeById,
  };

  function create(mensagem) {
    let newMensagem = MensagemModel(mensagem);
    return save(newMensagem);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Ocorreu um erro ao criar a mensagem");
        resolve({
          message: "Mensagem Criada",
          mensagem: model,
        });
      });
    });
  }

  function findAll(pagination) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      MensagemModel.find({}, {}, { skip, limit }, function (err, mensagens) {
        if (err) reject(err);

        resolve(mensagens);
      });
    }).then(async (mensagens) => {
      const totalMensagens = await MensagemModel.count();

      return Promise.resolve({
        data: mensagens,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < totalMensagens,
          total: totalMensagens,
        },
      });
    });
  }

  function removeById(id) {
    return new Promise(function (resolve, reject) {
      MensagemModel.findByIdAndRemove(id, function (err) {
        if (err)
          reject({
            message: "Impossible to remove",
          });

        resolve();
      });
    });
  }
  return service;
}
module.exports = MensagemService;
