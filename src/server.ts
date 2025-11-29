import express from 'express';
import { ErrorMiddleware } from './interface/middleware/error';
import logRoutes from './routes/logRoutes';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/logs', logRoutes);

app.use(ErrorMiddleware.handle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
