import express from "express"
import dotenv from "dotenv"
import db from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, someError } from "./middleware/errorMiddleware.js"
import cors from "cors"
import path from "path"
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
db()

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.use(notFound)
app.use(someError)
app.listen(process.env.PORT, () => {
  console.log("server is running")
})
