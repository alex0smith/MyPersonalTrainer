<?php	

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output);
		
		exit;

	}	

	// SQL statement accepts parameters and so is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

	$query = $conn->prepare('SELECT
		w.id AS workout_id,
		w.name AS workout,
		e.id AS exercise_id,
		e.name AS exercise,
		r.id AS reps_id,
		r.value AS reps,
		s.id AS sets_id,
		s.value AS sets
	FROM
		workout w
	JOIN
		exercise_workouts ew ON w.id = ew.workoutID
	JOIN
		exercise e ON ew.exerciseID = e.id
	LEFT JOIN
		reps r ON e.repsID = r.id
	LEFT JOIN
		sets s ON e.setsID = s.id
	WHERE
		w.id = ?');
		

	$query->bind_param("i", $_REQUEST['id']);

	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		echo json_encode($output); 
	
		mysqli_close($conn);
		exit;
		
	}

	$result = $query->get_result();

   	$id = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($id, $row);

	}

	$query = $conn->prepare('SELECT
		w.id AS id,
		w.name AS workout
	FROM
		workout w
	WHERE
		w.id = ?');
		

	$query->bind_param("i", $_REQUEST['id']);

	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		echo json_encode($output); 
	
		mysqli_close($conn);
		exit;

	}

	$result = $query->get_result();

   	$workout = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($workout, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['exercises'] = $id;
	$output['data']['workout'] = $workout;

	echo json_encode($output); 

	mysqli_close($conn);

?>