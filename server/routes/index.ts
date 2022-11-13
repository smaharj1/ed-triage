import express from 'express';

export const router = express.Router();

router.get('/health', (req, res) => {
  console.log('Health Check: GREEN');
  res.send('Health Good');
});
