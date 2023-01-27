const BrandRepository = require('../repositories/brand.repository');

class BrandController {
    getAllBrandsByCategoryId = async(req, res, next) => {
        const response = await BrandRepository.findAllForCategory(req.params.category_id);
        res.send(response);
    };

    getBrandById = async(req, res, next) => {
        const response = await BrandRepository.findOne(req.params.id, req.params.category_id);
        res.send(response);
    };

    createBrand = async(req, res, next) => {
        const response = await BrandRepository.create(req.body, req.params.category_id);
        res.status(201).send(response);
    };

    updateBrand = async(req, res, next) => {
        const response = await BrandRepository.update(req.body, req.params.id, req.params.category_id);
        res.send(response);
    };

    deleteBrand = async(req, res, next) => {
        const response = await BrandRepository.delete(req.params.id, req.params.category_id);
        res.send(response);
    };
}

module.exports = new BrandController;