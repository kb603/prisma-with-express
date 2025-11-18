import express from "express";
import categoryRoute from "./routes/category.route";
import productRoute from "./routes/product.route";

const app = express();
app.use(express.json());

app.use("/categories", categoryRoute);
app.use("/products", productRoute);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
