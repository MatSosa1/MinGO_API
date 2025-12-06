import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

// rutas
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
