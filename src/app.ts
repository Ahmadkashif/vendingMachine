import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body !== 'object') {
        res.status(400).send('Invalid JSON input');
    } else {
        next();
    }
});


app.post('/', (req: Request, res: Response) => {
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;