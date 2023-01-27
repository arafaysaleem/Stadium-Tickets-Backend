const SnackRepository = require('../repositories/snack.repository');

class SnackController {
    getAllSnacksByBrandId = async(req, res, next) => {
        const response = await SnackRepository.findAllForBrand(req.params.brand_id);
        res.send(response);
    };

    getSnackById = async(req, res, next) => {
        const response = await SnackRepository.findOne(req.params.id, req.params.brand_id);
        res.send(response);
    };

    createSnack = async(req, res, next) => {
        const response = await SnackRepository.create(req.body, req.params.brand_id);
        res.status(201).send(response);
    };

    updateSnack = async(req, res, next) => {
        const response = await SnackRepository.update(req.body, req.params.id, req.params.brand_id);
        res.send(response);
    };

    deleteSnack = async(req, res, next) => {
        const response = await SnackRepository.delete(req.params.id, req.params.brand_id);
        res.send(response);
    };
}

module.exports = new SnackController;