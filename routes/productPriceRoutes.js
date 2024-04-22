import express from 'express';
import { getAll,getProductPriceByProductAndPrice,getProductPriceByProduct,deleteProductPrice,createProductPrice,updateProductPrice } from '../controllers/productPriceController.js';


const productPriceRouter = express.Router();

productPriceRouter.get('/product/prices',getAll);
productPriceRouter.get('/product/:productId/price/:priceId',getProductPriceByProductAndPrice); 
productPriceRouter.get('/product/:productId/prices',getProductPriceByProduct); 

productPriceRouter.post('/product/price',createProductPrice);

productPriceRouter.put('/product/:productId/price/:priceId',updateProductPrice); /////  odificar para que solo edite el price , y no haga nada en el productprice

productPriceRouter.delete('/product/:productId/price/:priceId',deleteProductPrice);

export default productPriceRouter;