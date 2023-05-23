const {
  getStoreService,
  createStoreService,
  getStoreServiceById,
  updateStoreServiceById,
} = require("../services/store.service");

exports.getStore = async (req, res, next) => {
  try {
    const store = await getStoreService();
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find store",
    });
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the store",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't created the store",
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreServiceById(id);
    if (!store) {
      res.status(400).json({
        status: "fail",
        message: "Could't find the store with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find the store with this id",
    });
  }
};

exports.updateStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await updateStoreServiceById(id, req.body);
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the store with this id",
    });
  }
};
