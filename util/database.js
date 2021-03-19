import postgres from 'postgres';
import { generateToken } from './sessions';
import camelcaseKeys from 'camelcase-keys';
// Reads values from the .env file
// Which should be ignored in Git!
require('dotenv-safe').config();

const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}
export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();
  const sessions = await sql`
INSERT INTO sessions
  (token, expiry )
  VALUES
  (${token}, NOW() + INTERVAL '5 minutes')
  RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}
export async function createSessionByUserId(userId) {}
// this function get the data from the table in the database and returns it in the var candyInfo
// table is called sessions
export function getSessions() {
  const sessions = sql`SELECT * FROM sessions`;
  return sessions;
}
export async function deleteSessionById(id) {
  const sessions = await sql`
  DELETE FROM
  sessions
  WHERE
  id = ${id}
  RETURNING *
`;
}
export async function deleteAllExpiredSessions() {
  const sessions = await sql`
  DELETE FROM
  sessions
  WHERE
  expiry < NOW()
  RETURNING *
`;
}
