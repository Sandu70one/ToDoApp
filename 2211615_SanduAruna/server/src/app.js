import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import { dbURL } from "./utils/constants.js";
import AuthMiddleware from "./middleware/AuthMiddleware.js";
import cors from 'cors'

const app= express();

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

app.use(cors())
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/',AuthMiddleware, apiProtected);

const PORT =8000;

app.listen(PORT, ()=> console.log("server is running on port :" , PORT))