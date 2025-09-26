import express from "express";
import logRoutes from "./routes/logRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/log", logRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
