import express from 'express';
import path from 'path';
import { clog } from './middleware/clog';
import { router } from './routes/index';
import dbConnection from './config/database';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

app.use(cors());

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

console.log(`Environment is ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) => res.status(404).send('Not Found'));

dbConnection.once('open', () => {
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
});
