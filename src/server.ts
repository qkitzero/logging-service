import express from 'express';
import { errorHandler } from './interface/middleware/errorHandler';
import logRoutes from './routes/logRoutes';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/logs', logRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
