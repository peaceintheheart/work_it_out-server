 INSERT INTO body (body_part, date)
VALUES
  ('Shoulder', '2019-08-17'),
  ('Leg', '2019-08-17'),
  ('Arm', '2019-08-17');

INSERT INTO workout (exercise, sets, reps, weight, body_part_id)
VALUES
  ('Swinging', 1, 2, 100, 1),
  ('Rotating', 1, 2, 90, 1),
  ('Run', 2, 2, 200, 2),
  ('Striking', 2, 2, 130, 3);
