import express from "express";
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import bettingRoutes from './routes/betting.routes.js'


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 9000

//Import DB
import './config/db.js'

/**HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request')
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/betting', bettingRoutes)


app.listen(PORT, () => {
    console.log(`Server runing on port http://localhost:${PORT}`)
})