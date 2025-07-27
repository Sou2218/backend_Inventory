import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'
import { connectDB } from './config/db.js';

dotenv.config();
const app = express()

const allowedOrigins = ['https://frontend-inventory-eta.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const PORT = process.env.PORT || 4000

app.use (express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});


app.listen(PORT, ()=>{
    connectDB();
    console.log(`server started @http://localhost:${PORT}`)
})

