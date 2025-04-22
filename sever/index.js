import express from "express";
import Category from "./Routes/category.js";
import cors from "cors"; 
const port = 5000;
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', Category);

app.get('/', (req, res) => {
    res.send("Welcome to the Express server");
});

app.listen(port, () => {
    console.log(`Server listening on port :- http://localhost:${port}`);
});
