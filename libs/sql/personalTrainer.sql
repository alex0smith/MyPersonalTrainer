
CREATE TABLE IF NOT EXISTS `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `monday` int(11) DEFAULT NULL,
  `tuesday` int(11) DEFAULT NULL,
  `wednesday` int(11) DEFAULT NULL,
  `thursday` int(11) DEFAULT NULL,
  `friday` int(11) DEFAULT NULL,
  `saturday` int(11) DEFAULT NULL,
  `sunday` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


INSERT INTO `plan` (`id`, `name`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`) VALUES
	(1, '3day plan', 2, 1, 3, 1, 4, 1, 1),
	(2, '2day plan', 2, 1, 1, 5, 1, 1, 1);


CREATE TABLE IF NOT EXISTS `workout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


INSERT INTO `workout` (`id`, `name`) VALUES
	(1, 'Rest'),
	(2, 'Workout A'),
	(3, 'Workout B'),
	(4, 'Workout C'),
	(5, 'Workout D');


CREATE TABLE IF NOT EXISTS `reps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `reps` (`value`) VALUES (5), (8), (10), (12), (15), (20), (60);

INSERT INTO `sets` (`value`) VALUES (1), (2), (3), (4), (5);


CREATE TABLE IF NOT EXISTS `exercise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `repsID` int(11) DEFAULT NULL,
  `setsID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`repsID`) REFERENCES `reps` (`id`),
  FOREIGN KEY (`setsID`) REFERENCES `sets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;


INSERT INTO `exercise` (`id`, `name`, `repsID`, `setsID`) VALUES
	(1, 'Squats', 3, 3),
	(2, 'Bench Press', 1, 5),
	(3, 'Barbell Row', 1, 5),
	(4, 'Upright Row', 3, 3),
	(5, 'Skullcrushers', 3, 3),
	(6, 'Dumbbell Curls', 5, 3),
	(7, 'Leg Curls', 5, 3),
	(8, 'Sit Ups', 5, 3),
	(9, 'Deadlifts', 1, 3),
	(10, 'Romanian Deadlift', 4, 2),
	(11, 'Seated Overhead Press', 3, 3),
	(12, 'Pull Ups', 5, 3),
	(13, 'Dips', 6, 3),
	(14, 'Barbell Shrugs', 3, 3),
	(15, 'Standing Calf Raise', 5, 3),
	(16, 'Plank', 7, 3),
	(17, 'Inclined Dumbbell Bench Press', 3, 3),
	(18, 'One Arm Dumbbell Row', 1, 3),
	(19, 'Seated Arnold Press', 5, 3),
	(20, 'Squats', 6, 1),
	(21, 'Tricep Extension', 3, 3),
	(22, 'Barbell Curls', 3, 3);




CREATE TABLE IF NOT EXISTS `exercise_workouts` (
  `exerciseID` int(11) NOT NULL,
  `workoutID` int(11) NOT NULL,
  PRIMARY KEY (`exerciseID`, `workoutID`),
  FOREIGN KEY (`exerciseID`) REFERENCES `exercise` (`id`),
  FOREIGN KEY (`workoutID`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `exercise_workouts` (`exerciseID`, `workoutID`) VALUES
  (1, 2), (2, 2), (3, 2), (4, 2), (5, 2), (6, 2), (7, 2), (8, 2), (9, 3), (10, 3), (11, 3),
  (12, 3),  (13, 3),  (14, 3),  (15, 3), (16, 3), (1, 4), (20, 4), (17, 4), (18, 4), (19, 4), (21, 4),
  (22, 4), (7, 4), (8, 4), (9, 5), (11, 5), (12, 5), (16, 5), (20, 5), (13, 5), (22, 5), (21,5);

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
