import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import { generateToken } from './sessions';
// Reads values from the .env file
// Which should be ignored in Git!
require('dotenv-safe').config();

const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}
export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getUserById(id) {
  const users = await sql`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING id, username
  `;
  return camelcaseRecords(users)[0];
}

export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

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

// WORKOUT DAYS

export async function insertWorkoutDay(day, description, userId) {
  const workoutDay = await sql`
    INSERT INTO workout_days
      (day, description, user_id)
    VALUES
      (${day}, ${description}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(workoutDay)[0];
}

// EXERCISES

export async function insertExercise(name, reps, weights, workoutId){
  const exercise = await sql`
    INSERT INTO exercises
      (exercise_name, reps, weight, workout_id)
    VALUES
      (${name}, ${reps}, ${weights},${workoutId})
    RETURNING *
  `;
  return camelcaseRecords(exercise)[0];
}

export async function getWorkoutDayAndAllExercises (userId){
    const trainingDays = await sql`
    SELECT e.exercise_name,e.reps,e.weight,workout_days.day,workout_days.description FROM exercises as e, workout_days
    WHERE workout_days.user_id=${userId}
    `;
    return camelcaseRecords(trainingDays);
}

export async function insertWorkoutDayWithAllExercises(userId,data){
   const day = await sql`
    INSERT INTO workoutDayWithAllExercises
      (data, user_id)
    VALUES
      (${data}, ${userId})
     ON CONFLICT (user_id) DO UPDATE SET data=${data}
    RETURNING *
  `;

  return camelcaseRecords(day)[0];
}

export async function getWorkoutDayWithAllExercises(userId) {
  const day = await sql`
    SELECT * FROM workoutDayWithAllExercises
    WHERE user_id=${userId}
  `;

  return camelcaseRecords(day)[0];
}