import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connection from './database/index';
import { userRoutes } from './routes/userRoutes';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/v1/user', userRoutes);

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
    connection.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log('Error in initialising Database connection');
}


export default app;