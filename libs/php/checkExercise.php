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
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

	$query = $conn->prepare('SELECT COUNT(ew.workoutID) AS workoutCount, e.id AS exerciseID, e.name AS exercise
		FROM exercise e
		LEFT JOIN exercise_workouts ew ON e.id = ew.exerciseID
		WHERE e.id = ?
		GROUP BY e.id, e.name');

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

   	$dependencies = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($dependencies, $row);

	}

	$query = $conn->prepare('SELECT
		e.id AS id,
		e.name AS exercise,
		r.id AS reps_id,
		r.value AS reps,
		s.id AS sets_id,
		s.value AS sets
	FROM
		exercise e
	LEFT JOIN reps r ON e.repsID = r.id
	LEFT JOIN sets s ON e.setsID = s.id
	WHERE e.id = ?');

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

   	$exercise = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($exercise, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['dependencies'] = $dependencies;
	$output['data']['exercise'] = $exercise;

	echo json_encode($output); 

	mysqli_close($conn);

?>