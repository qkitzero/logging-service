import express from "express";
import logRoutes from "./routes/logRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/log", logRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
