import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import RecipeRoutes from './routes/recipe.routes.js'
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;
const app = express();

app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials:true,}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended:true,limit:"16kb"}));
app.use(express.static("public"));

app.use("/api/v1/recipes",RecipeRoutes);

export {app}