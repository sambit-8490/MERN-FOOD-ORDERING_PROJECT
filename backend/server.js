import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

// App Config
const app = express();
const port = 4000;

// Middlewares
app.use(express.json()); //parsed as json
app.use(cors());

// DB Connection
connectDB(); 

// API Endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));

app.get("/", (req,res)=>{
    res.send("API is running");
}); 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});