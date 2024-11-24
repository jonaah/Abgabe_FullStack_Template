CREATE DATABASE pernexample;

CREATE TABLE example (
  example_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE nodes (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE edges (
  id SERIAL PRIMARY KEY,
  source INTEGER NOT NULL,
  target INTEGER NOT NULL,
  FOREIGN KEY (source) REFERENCES nodes(id),
  FOREIGN KEY (target) REFERENCES nodes(id)
);