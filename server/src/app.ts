import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import { errorHandler } from './middleware/errorHandler';

const corsOptions = {
  origin : ['http://127.0.0.1:5173', 'http://localhost:5173'],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true, // Permite enviar credenciales (cookies, autenticaciones)
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', employeeRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;