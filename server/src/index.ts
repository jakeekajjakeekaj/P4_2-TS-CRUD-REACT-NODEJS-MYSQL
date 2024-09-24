import express, { Application } from 'express';

const app: Application = express();
app.use(express.json());

// process.env.PORT devuelve una cadena, es por esto que usamos parseInt
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));