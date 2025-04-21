import express from "express";
import Category from "./Routes/category.js";


const port = 5000;

const app = express();
app.use(express.json())

app.use('/api', Category);

app.get('/',(req,res)=>{
    res.send("Welcome to the Express server");
});

app.listen(port,()=>{
    console.log(`server listen on port :- http://localhost:${port}`);
})