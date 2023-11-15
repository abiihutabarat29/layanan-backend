import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import InstansiRoute from "./routes/InstansiRoute.js";
import DivisionRoute from "./routes/DivisionRoute.js";

dotenv.config();

const app = express();

//Aktifkan jika melakukan seeder model tabel ke database mysql

// (async () => {
//     await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(InstansiRoute);
app.use(DivisionRoute);

//Aktifkan jika melakukan seeder tabel session ke database mysql

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
}); 