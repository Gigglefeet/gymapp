exports.up = async (sql) => {
  await sql`
	CREATE TABLE workout_days( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		day INT REFERENCES days(id),
		description VARCHAR(50),
		id_users INT REFERENCES users(id)
		);`;
};

exports.down = async (sql) => {
  await sql`DELETE FROM workout_days
`;

  await sql`
	DROP TABLE workout_days`;
};
