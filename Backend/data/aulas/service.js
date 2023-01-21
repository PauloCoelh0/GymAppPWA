function AulaService(AulaModel) {
  let service = {
    create,
    findAll,
    update,
    removeById,
    findAulaById,
  };

  function create(aula) {
    let newAula = AulaModel(aula);
    return save(newAula);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Ocorreu um erro ao criar a aula");
        resolve({
          message: "Aula Criada",
          aula: model,
        });
      });
    });
  }

  function findAll(pagination) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      AulaModel.find({}, {}, { skip, limit }, function (err, aulas) {
        if (err) reject(err);

        resolve(aulas);
      });
    }).then(async (aulas) => {
      const totalAulas = await AulaModel.count();

      return Promise.resolve({
        data: aulas,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < totalAulas,
          total: totalAulas,
        },
      });
    });
  }

  function update(id, aula) {
    return new Promise(function (resolve, reject) {
      AulaModel.findByIdAndUpdate(id, aula, function (err, aulaUpdated) {
        if (err) reject("Couldn't update aula");
        resolve(aulaUpdated);
        console.log("Aula: ", aula);
      });
    });
  }

  function removeById(id) {
    return new Promise(function (resolve, reject) {
      AulaModel.findByIdAndRemove(id, function (err) {
        if (err)
          reject({
            message: "Impossible to remove",
          });

        resolve();
      });
    });
  }

  function findAulaById(id) {
    return new Promise(function (resolve, reject) {
      AulaModel.findById(id, function (err, aula) {
        if (err) reject(err);

        resolve(aula);
      });
    });
  }

  return service;
}

module.exports = AulaService;
