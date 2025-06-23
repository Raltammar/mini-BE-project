import express from "express";
import authorRouter from "./routes/authorRouter";
import categoryRouter from "./routes/categoryRouter";
import BookRouter from "./routes/bookRouter";
import NotFoundHandler from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();
// app level Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//multer
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/author", authorRouter);
app.use("/category", categoryRouter);
app.use("/book", BookRouter);
//middleware handlers
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(NotFoundHandler);
app.use(errorHandler);
export default app;
