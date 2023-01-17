function ImageService(ImageModel) {
  let service = {
    create,
    findAll,
    update,
    removeById,
    findImageById,
  };

  function create(image) {
    let newImage = ImageModel(image);
    return save(newImage);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Ocorreu um erro ao criar a image");

        resolve({
          message: "Image Criada",
          image: model,
        });
      });
    });
  }

  function findAll(pagination) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      ImageModel.find({}, {}, { skip, limit }, function (err, images) {
        if (err) reject(err);

        resolve(images);
      });
    }).then(async (images) => {
      const totalImages = await ImageModel.count();

      return Promise.resolve({
        data: images,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < totalImages,
          total: totalImages,
        },
      });
    });
  }

  function update(id, image) {
    return new Promise(function (resolve, reject) {
      ImageModel.findByIdAndUpdate(id, image, function (err, ImageUpdated) {
        if (err) reject("Couldn't update image");
        resolve(ImageUpdated);
        console.log("Image: ", image);
      });
    });
  }

  function removeById(id) {
    return new Promise(function (resolve, reject) {
      ImageModel.findByIdAndRemove(id, function (err) {
        if (err)
          reject({
            message: "Impossible to remove",
          });

        resolve();
      });
    });
  }

  function findImageById(id) {
    return new Promise(function (resolve, reject) {
      ImageModel.findById(id, function (err, image) {
        if (err) reject(err);

        resolve(image);
      });
    });
  }

  return service;
}

module.exports = ImageService;
