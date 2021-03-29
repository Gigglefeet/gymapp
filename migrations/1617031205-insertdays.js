exports.up = async (sql) => {
  await sql`
	INSERT INTO days
  (name)
VALUES
  ('Monday'),
	('Tuesday'),
	('Wednesday'),
	('Thursday'),
  ('Friday'),
  ('Saturday'),
  ('Sunday')
`;
};
exports.down = async (sql) => {
  await sql`
	DELETE FROM days
	`;
};
