const ApiError = require('../error/ApiError');
const ProductService = require('../service/products');

class ProductController {

    async getAllProducts(req, res, next) {    
        try {
            const allProducts = await ProductService.getAllProducts();
            return res.status(200).json(allProducts);
        } catch (err) {
            next(err);
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await ProductService.getProductById(req.body.id)
            if (!product) return next(ApiError.notFound('product not found!'))
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }
};

module.exports = new ProductController();

