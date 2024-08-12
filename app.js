const express = require('express');
const db = require('./db');

const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM users');
    res.json(data.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.json())

app.post('/add', async (req, res) => {
    const { username, email } = req.body;// change to req.query if you prefer to send the data from URL path
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
    try {
      const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
      const values = [username, email];
      const data = await db.query(query, values);
      res.json(data.rows[0]);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});