import express from 'express';
// import path from 'path'
import { clog } from './middleware/clog';
import { router } from './routes/index';

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) => res.status(404).send('Not Found'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
