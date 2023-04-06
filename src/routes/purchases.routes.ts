import { Router } from 'express';
import { PurchaseController } from '../controllers/purchases.controller';

const PurchasesRouter = Router();

PurchasesRouter.post('/', PurchaseController.add);
PurchasesRouter.get('/', PurchaseController.get);
PurchasesRouter.put('/:id', PurchaseController.update);
PurchasesRouter.delete('/:id', PurchaseController.delete);

export default PurchasesRouter;
