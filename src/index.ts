import express from "express";
import userRoutes from "./routes/user.routes";
import tagRoutes from "./routes/tag.routes";
import signRoutes from "./routes/sign.routes";

const app = express();
app.use(express.json());

// rutas
app.use("/users", userRoutes);
app.use("/tags", tagRoutes);
app.use("/signs", signRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
