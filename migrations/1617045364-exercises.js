exports.up = async (sql) => {
  await sql`
	CREATE TABLE exercises
	( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	exercise_name VARCHAR(50),
	reps INT,
	weight INT,
	workout_id INT REFERENCES workout_days(id)
	);
	`;

	await sql`
	CREATE TABLE workoutDayWithAllExercises
	( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		data TEXT,
		user_id INT REFERENCES users(id) UNIQUE
	);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE exercises`;

	await sql`DROP TABLE workoutDayWithAllExercises`;
};
