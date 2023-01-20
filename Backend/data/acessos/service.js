const { default: mongoose } = require("mongoose");
function AcessosService(AcessoModel) {
  let service = {
    create,
    findAll,
    update,
    removeById,
    findAcessoById,
  };

  async function create(acesso) {
    console.log("acesso recebido:" + acesso._id);

    const acessoEncontrada = await AcessoModel.findOne({
      user: mongoose.Types.ObjectId(acesso._id),
      $and: [
        { entryHour: { $ne: null } },
        { exitHour: { $eq: null } },
        { local: acesso.local },
      ],
    });

    if (!!acessoEncontrada) {
      const response = await AcessoModel.findByIdAndUpdate(
        acessoEncontrada._id,
        {
          exitHour: new Date(),
          isIn: false,
        },
        { new: true }
      );

      return { message: "Acesso alterado com sucesso", acesso: response };
    } else {
      acesso.user = acesso._id;
      const result = {
        inIn: true,
        user: acesso.user,
        local: acesso.local,
        entryHour: acesso.entryHour,
      };
      console.log(result);

      let newAcesso = new AcessoModel(result);
      return await newAcesso.save();
    }
  }

  function findAll(pagination) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      AcessoModel.find({}, {}, { skip, limit }, function (err, acessos) {
        if (err) reject(err);

        resolve(acessos);
      });
    }).then(async (acessos) => {
      const totalAcessos = await AcessoModel.count();

      return Promise.resolve({
        data: acessos,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < totalAcessos,
          total: totalAcessos,
        },
      });
    });
  }

  function update(id, acesso) {
    return new Promise(function (resolve, reject) {
      AcessoModel.findByIdAndUpdate(id, acesso, function (err, acessoUpdated) {
        if (err) reject("Couldn't update acesso");
        resolve(acessoUpdated);
        console.log("Acesso: ", acesso);
      });
    });
  }

  function removeById(id) {
    return new Promise(function (resolve, reject) {
      AcessoModel.findByIdAndRemove(id, function (err) {
        if (err)
          reject({
            message: "Impossible to remove",
          });

        resolve();
      });
    });
  }

  function findAcessoById(id) {
    return new Promise(function (resolve, reject) {
      AcessoModel.findById(id, function (err, acesso) {
        if (err) reject(err);

        resolve(acesso);
      });
    });
  }

  return service;
}

module.exports = AcessosService;
