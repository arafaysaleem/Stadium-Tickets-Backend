const CategoryRepository = require('../repositories/category.repository');

class CategoryController {
    getAllCategories = async(req, res, next) => {
        const response = await CategoryRepository.findAll(req.query);
        res.send(response);
    };

    getCategoryById = async(req, res, next) => {
        const response = await CategoryRepository.findOne(req.params.id);
        res.send(response);
    };

    createCategory = async(req, res, next) => {
        const response = await CategoryRepository.create(req.body);
        res.status(201).send(response);
    };

    updateCategory = async(req, res, next) => {
        const response = await CategoryRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteCategory = async(req, res, next) => {
        const response = await CategoryRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new CategoryController;