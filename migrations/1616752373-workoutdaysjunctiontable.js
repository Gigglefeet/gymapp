exports.up = async (sql) => {
  await sql`
	CREATE TABLE workout_days( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		day VARCHAR(20),
		description VARCHAR(50),
		user_id INT REFERENCES users(id)
		);`;
};

exports.down = async (sql) => {
  await sql`DELETE FROM workout_days
`;

  await sql`
	DROP TABLE workout_days`;
};
