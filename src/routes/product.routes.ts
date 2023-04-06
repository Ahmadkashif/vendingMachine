import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const ProductRouter = Router();

ProductRouter.post('/', ProductController.add);
ProductRouter.get('/', ProductController.get);
ProductRouter.put('/:id', ProductController.update);
ProductRouter.delete('/:id', ProductController.delete);

export default ProductRouter;