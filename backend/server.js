import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

// App Config
const app = express();
const port = 4000;

// Middlewares
app.use(express.json()); //get requestion from frontend to backend it will be parsed as json
app.use(cors()); // access backend from frontend

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food",foodRouter);

app.get("/", (req,res)=>{
    res.send("API is running");
}); 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

