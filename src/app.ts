import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connection from './database/index';
import UserRouter from './routes/user.routes';
import ProductRouter from "./routes/product.routes";
import PurchasesRouter from "./routes/purchases.routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/v1/user', UserRouter);
app.use('/v1/product', ProductRouter);
app.use('/v1/purchase', PurchasesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body !== 'object') {
        res.status(400).send('Invalid JSON input');
    } else {
        next();
    }
});

app.get('/', (req: Request, res: Response) => {
    res.json(req.body);
});

try {
    connection.sync(({ force: true })).then().catch((error) => { console.log(error) });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log('Error in initialising Database connection');
}


export default app;