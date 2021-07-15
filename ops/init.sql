SELECT current_database();

CREATE TABLE increment (
	counter_key VARCHAR ( 250 ) PRIMARY KEY,
	counter_value int NOT null
);
