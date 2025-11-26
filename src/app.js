// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import solicitudesRouter from './routes/solicitudes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('API OK');
});

// Rutas
app.use('/solicitudes', solicitudesRouter);

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
