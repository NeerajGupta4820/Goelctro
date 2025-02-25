import app from "./app.js";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/database.js";
dotenv.config();

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Backend is running! 🚀');
  });
  
connectDB();

app.listen(PORT,()=>{
    console.log("Running on PORT: ",PORT);
})