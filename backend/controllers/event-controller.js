import { getConnection } from '../utils/db-connection.js';

async function getEvents (req, res) {
  try {
    const connection = await getConnection();
    const events = await connection.query('SELECT * FROM events');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default getEvents;