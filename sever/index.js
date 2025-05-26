import express from "express";
import Category from "./Routes/category.js";
import Product from "./Routes/product.js";
import Customers from "./Routes/customers.js";
import cors from "cors"; 
const port = 5000;
const app = express();


app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static('uploads')); 

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

app.use('/api', Category);
app.use('/api', Product);
app.use('/api', Customers);

app.get('/', (req, res) => {
    res.send("Welcome to the Express server");
});

app.listen(port, () => {
    console.log(`Server listening on port :- http://localhost:${port}`);
});
