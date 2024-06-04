import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import clientRoutes from "./routes/client.routes.js"
import addressRoutes from "./routes/address.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();
app.use(cors({
    origin: 'https://localhost:4200',
    credentials: true
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())

app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", clientRoutes)
app.use("/api", addressRoutes)

export default app;
