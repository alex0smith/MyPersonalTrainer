$(function(){
    
    //DROPDOWNS 
    function populateWorkouts(data) {
        const dropdownAdd = $('.day');
        dropdownAdd.html('');
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.workout;
            dropdownAdd.append(option);
        });
    }
    //POPULATE EXERCISES
    function populateExercises(data) {
        const dropdownAdd = $('.selectExercise');
        dropdownAdd.html('');
        data.sort((a, b) => a.exercise.localeCompare(b.exercise));
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.exercise;
            dropdownAdd.append(option);
        });
    }
    //POPULATE REPS
    function populateReps(data) {
        const dropdownAdd = $('.selectReps');
        dropdownAdd.html('');
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.reps;
            dropdownAdd.append(option);
        });
    }
    //POPULATE SETS
    function populateSets(data) {
        const dropdownAdd = $('.selectSets');
        dropdownAdd.html('');
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.sets;
            dropdownAdd.append(option);
        });
    }

    
    //LOAD PLANS    
    function loadPlans(){
        $.ajax({
            url: "libs/php/getPlans.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
    
                    var data = result.data;
                    var table =  '<table class="table table-hover table-dark">';
                    
                    data.forEach((item) => {
                        
                        table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.name +'</td>';
                        table += '<td class="text-end text-nowrap">';
                        table += '<button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#editPlanModal" data-id="'+item.id+'"><i class="fa-solid fa-pencil fa-md text-primary"></i></button>';
                        table += '<button type="button" class="btn btn-sm deletePlan" data-id="'+item.id+'"><i class="fa-solid fa-trash-can fa-md text-danger"></i></button>';
                        table += '</td></tr>';
                        
                        
                    });
                    table += '</table>'
                    $('#planTable').html(table);
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    };

    
    loadPlans();

    
    //LOAD WORKOUTS
    function loadWorkout() {
        $.ajax({
            url: "libs/php/getWorkoutID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {

                    var data = result.data;
                    var table =  '<table class="table table-hover table-dark">';
                    
                    data.forEach((item) => {
                        if (item.id > 1) {
                            table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.workout +'</td>';
                            table += '<td class="text-end text-nowrap">';
                            table += '<button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#addExerciseModal" data-id="'+item.id+'"><i class="fa-solid fa-plus fa-md text-success"></i></button>';
                            table += '<button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#removeExerciseModal" data-id="'+item.id+'"><i class="fa-solid fa-minus fa-md text-light"></i></button>';
                            table += '<button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#editWorkoutModal" data-id="'+item.id+'"><i class="fa-solid fa-pencil fa-md text-primary"></i></button>';
                            table += '<button type="button" class="btn btn-sm deleteWorkout" data-id="'+item.id+'"><i class="fa-solid fa-trash-can fa-md text-danger"></i></button>';
                            table += '</td></tr>';
                        } 
                        
                        
                    });
                    table += '</table>'
                    $('#workoutTable').html(table);
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    }
    
    loadWorkout();

    //SEARCH
    $('#searchForm').on("submit", function(e) {
        e.preventDefault(); 
    
        var searchTerm = $('#search').val().toLowerCase();
        
        $('#exerciseTable tr').each(function() {
            var rowText = $(this).text().toLowerCase();
        
            if (rowText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        
    });

    //LOAD EXERCISES
    function loadExercises() {
        $.ajax({
            url: "libs/php/getExerciseID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {

                    var data = result.data;
                    var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                    data.sort((a, b) => a.exercise.localeCompare(b.exercise));

                    data.forEach((item) => {
                        
                        table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise +'</td>';                        
                        table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                        table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                        table += '<td class="text-end text-nowrap">';
                        table += '<button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#editExerciseModal" data-id="'+item.id+'"><i class="fa-solid fa-pencil fa-md text-primary"></i></button>';
                        table += '<button type="button" class="btn btn-sm deleteExercise" data-id="'+item.id+'"><i class="fa-solid fa-trash-can fa-md text-danger"></i></button>';
                        table += '</td></tr>';
                        
                        
                        
                    });
                    table += '</tbody></table>'
                    $('#exerciseTable').html(table);
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    }
    
    loadExercises();
    
    //ADD
    
    //ADD PLAN
    $('#addPlan').on("click", function() {
        $.ajax({
            url: "libs/php/getWorkoutID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
    
                    populateWorkouts(data);
                    $('#newPlanModal').modal('show');
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        $('#newPlanModal').modal('show');
    });

    $('#newPlan').on('submit', function(e) {
        e.preventDefault();

        var name = $('#planName').val();
        var monday = $('#mondayID').val();
        var tuesday = $('#tuesdayID').val();
        var wednesday = $('#wednesdayID').val();
        var thursday = $('#thursdayID').val();
        var friday = $('#fridayID').val();
        var saturday = $('#saturdayID').val();
        var sunday = $('#sundayID').val();

        $.ajax({
            url: "libs/php/insertPlan.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadPlans();
                $('#newPlanModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //ADD WORKOUT
    $('#addWorkout').on("click", function() {
        $('#newWorkoutModal').modal('show');
    });

    $('#newWorkout').on('submit', function(e) {
        e.preventDefault();

        var name = $('#workoutName').val();

        $.ajax({
            url: "libs/php/insertWorkout.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadWorkout();
                $('#newWorkoutModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //ADD TO WORKOUT
    $("#addExerciseModal").on("show.bs.modal", function (e) {
        
        //GET EXERCISES
        $.ajax({
            url: "libs/php/getExerciseID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
    
                    populateExercises(data);

                    //GET REPS SETS
                    $.ajax({
                        url: "libs/php/getRepSetsByID.php",
                        type: "GET",
                        dataType: "json",
                        data: {
                            id: $('#selectedExercise').val() 
                        },
                        success: function(result) {
                            //console.log(JSON.stringify(result));
                            if (result.status.code === '200') {
                                
                                var data = result.data;
                                
                                $('#selectedReps').val(data.id[0].repsID);
                                $('#selectedReps').prop('value', data.id[0].reps);
                                $('#selectedSets').val(data.id[0].setsID).text(data.id[0].sets);
                                $('#selectedSets').prop('value', data.id[0].sets);

                            }
                        },
                        error: function (error) {
                            //console.log('Error:', error);
                        }
                    });
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });

        //CHANGE EVENT
        $("#selectedExercise").on("change", function () {
            
            //GET REPS SETS
            $.ajax({
                url: "libs/php/getRepSetsByID.php",
                type: "GET",
                dataType: "json",
                data: {
                    id: $('#selectedExercise').val() 
                },
                success: function(result) {
                    //console.log(JSON.stringify(result));
                    if (result.status.code === '200') {
                        
                        var data = result.data;
                        
                        $('#selectedReps').val(data.id[0].repsID);
                        $('#selectedReps').prop('value', data.id[0].reps);
                        $('#selectedSets').val(data.id[0].setsID).text(data.id[0].sets);
                        $('#selectedSets').prop('value', data.id[0].sets);

                    }
                },
                error: function (error) {
                    //console.log('Error:', error);
                }
            });
                  
        });

        $.ajax({
            url: "libs/php/getExerciseByWorkout.php",
            type: "GET",
            dataType: "json",
            data: {
                id: $(e.relatedTarget).attr("data-id") 
              },
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
                    var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                    data.exercises.sort((a, b) => a.exercise.localeCompare(b.exercise));

                    data.exercises.forEach((item) => {
                        
                        table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise +'</td>';
                        table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                        table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                        table += '</tr>';
                        
                    });

                    table += '</tbody></table>'
                    $('.existingExercises').html(table);
                    $('#addToWorkoutID').val(data.workout[0].id);
                    $('.currentWorkout').html(data.workout[0].workout);
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        

    });

    $('#addExerciseForm').on('submit', function(e) {
        e.preventDefault();

        var exercise = $('#selectedExercise').val();
        var workout = $('#addToWorkoutID').val();
        //console.log(exercise, workout);

        $.ajax({
            url: "libs/php/insertExerciseToWorkout.php",
            type: "POST",
            dataType: "json",
            data: {
                exerciseID: exercise,
                workoutID: workout
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                $.ajax({
                    url: "libs/php/getExerciseByWorkout.php",
                    type: "GET",
                    dataType: "json",
                    data: {
                        id: $('#addToWorkoutID').val()
                      },
                    success: function(result) {
                        //console.log(JSON.stringify(result));
                        if (result.status.code === '200') {
                            
                            var data = result.data;
                            var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                            data.exercises.sort((a, b) => a.exercise.localeCompare(b.exercise));
        
                            data.exercises.forEach((item) => {
                                
                                table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise +'</td>';
                                table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                                table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                                table += '</tr>';
                                
                            });
        
                            table += '</tbody></table>'
                            $('.existingExercises').html(table);
                            
                        }
                    },
                    error: function (error) {
                        //console.log('Error:', error);
                    }
                });
                
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //REMOVE FROM WORKOUT
    $("#removeExerciseModal").on("show.bs.modal", function (e) {
        
        //GET EXERCISES
        $.ajax({
            url: "libs/php/getExerciseByWorkout.php",
            type: "GET",
            dataType: "json",
            data: {
                id: $(e.relatedTarget).attr("data-id") 
              },
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
                    
                    const dropdownAdd = $('.selectExercise');
                    dropdownAdd.html('');
                    data.exercises.sort((a, b) => a.exercise.localeCompare(b.exercise));
                    data.exercises.forEach((item) => {
                        const option = document.createElement('option');
                        option.value = item.exercise_id;
                        option.textContent = item.exercise;
                        dropdownAdd.append(option);
                    });

                    var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                    
                    data.exercises.forEach((item) => {
                        
                        table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise +'</td>';
                        table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                        table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                        table += '</tr>';
                        
                    });

                    table += '</tbody></table>'
                    $('.existingExercises').html(table);
                    $('#removeFromWorkoutID').val(data.workout[0].id);
                    $('#removeFromWorkout').html(data.workout[0].workout);

                    //GET REPS SETS
                    $.ajax({
                        url: "libs/php/getRepSetsByID.php",
                        type: "GET",
                        dataType: "json",
                        data: {
                            id: $('#exerciseRemove').val() 
                        },
                        success: function(result) {
                            //console.log(JSON.stringify(result));
                            if (result.status.code === '200') {
                                
                                var data = result.data;
                                
                                $('#repsRemove').val(data.id[0].repsID);
                                $('#repsRemove').prop('value', data.id[0].reps);
                                $('#setsRemove').val(data.id[0].setsID).text(data.id[0].sets);
                                $('#setsRemove').prop('value', data.id[0].sets);

                            }
                        },
                        error: function (error) {
                            //console.log('Error:', error);
                        }
                    });
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });

        //CHANGE EVENT
        $("#exerciseRemove").on("change", function () {
            
            //GET REPS SETS
            $.ajax({
                url: "libs/php/getRepSetsByID.php",
                type: "GET",
                dataType: "json",
                data: {
                    id: $('#exerciseRemove').val() 
                },
                success: function(result) {
                    //console.log(JSON.stringify(result));
                    if (result.status.code === '200') {
                        
                        var data = result.data;
                        
                        $('#repsRemove').val(data.id[0].repsID);
                        $('#repsRemove').prop('value', data.id[0].reps);
                        $('#setsRemove').val(data.id[0].setsID).text(data.id[0].sets);
                        $('#setsRemove').prop('value', data.id[0].sets);

                    }
                },
                error: function (error) {
                    //console.log('Error:', error);
                }
            });
                  
        });

    });

    $('#removeExerciseForm').on('submit', function(e) {
        e.preventDefault();

        var exercise = $('#exerciseRemove').val();
        var workout = $('#removeFromWorkoutID').val();
        //console.log(exercise, workout);

        $.ajax({
            url: "libs/php/removeExerciseToWorkout.php",
            type: "POST",
            dataType: "json",
            data: {
                exerciseID: exercise,
                workoutID: workout
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                $.ajax({
                    url: "libs/php/getExerciseByWorkout.php",
                    type: "GET",
                    dataType: "json",
                    data: {
                        id: $('#removeFromWorkoutID').val()
                      },
                    success: function(result) {
                        //console.log(JSON.stringify(result));
                        if (result.status.code === '200') {
                            
                            var data = result.data;
                            
                            const dropdownAdd = $('.selectExercise');
                            dropdownAdd.html('');
                            data.exercises.sort((a, b) => a.exercise.localeCompare(b.exercise));
                            data.exercises.forEach((item) => {
                                const option = document.createElement('option');
                                option.value = item.exercise_id;
                                option.textContent = item.exercise;
                                dropdownAdd.append(option);
                            });
        
                            var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                            
                            data.exercises.forEach((item) => {
                                
                                table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise +'</td>';
                                table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                                table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                                table += '</tr>';
                                
                            });
        
                            table += '</tbody></table>'
                            $('.existingExercises').html(table);
        
                            //GET REPS SETS
                            $.ajax({
                                url: "libs/php/getRepSetsByID.php",
                                type: "GET",
                                dataType: "json",
                                data: {
                                    id: $('#exerciseRemove').val() 
                                },
                                success: function(result) {
                                    //console.log(JSON.stringify(result));
                                    if (result.status.code === '200') {
                                        
                                        var data = result.data;
                                        
                                        $('#repsRemove').val(data.id[0].repsID);
                                        $('#repsRemove').prop('value', data.id[0].reps);
                                        $('#setsRemove').val(data.id[0].setsID).text(data.id[0].sets);
                                        $('#setsRemove').prop('value', data.id[0].sets);
        
                                    }
                                },
                                error: function (error) {
                                    //console.log('Error:', error);
                                }
                            });
                            
                        }
                    },
                    error: function (error) {
                        //console.log('Error:', error);
                    }
                });
                
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //ADD EXERCISE
    $('#addNewExercise').on("click", function() {
        
        $.ajax({
            url: "libs/php/getSetsID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
    
                    populateSets(data);
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        $.ajax({
            url: "libs/php/getRepsID.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
                    
                    var data = result.data;
    
                    populateReps(data);
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        $('#newExerciseModal').modal('show');
    });

    $('#addExercise').on('submit', function(e) {
        e.preventDefault();

        var name = $('#exerciseName').val();
        var reps = $('#reps').val();
        var sets = $('#sets').val();

        $.ajax({
            url: "libs/php/insertExercise.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                reps: reps,
                sets: sets
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadExercises();
                $('#newExerciseModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });


    //EDIT
    var editClicked = false;

    //EDIT PLAN
    $("#editPlanModal").on("show.bs.modal", function (e) {
        $.ajax({
            url: "libs/php/getPlanByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(e.relatedTarget).attr("data-id") 
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                
                if (resultCode == 200) {

                    populateWorkouts(result.data.workouts);
            
                    $("#editPlanID").val(result.data.plan[0].id);
                    $("#editPlanName").val(result.data.plan[0].name);
                    $("#editMonday").val(result.data.plan[0].monday);
                    $("#editTuesday").val(result.data.plan[0].tuesday);
                    $("#editWednesday").val(result.data.plan[0].wednesday);
                    $("#editThursday").val(result.data.plan[0].thursday);
                    $("#editFriday").val(result.data.plan[0].friday);
                    $("#editSaturday").val(result.data.plan[0].saturday);
                    $("#editSunday").val(result.data.plan[0].sunday);
            
                
                } else {
                    $("#editPlanModal .modal-title").replaceWith(
                        "Error retrieving data"
                    );
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#editPlanModal .modal-title").replaceWith(
                "Error retrieving data"
              );
            }
        });
        
    });

    $('#editPlanBtn').on("click", function() {
        if (editClicked) {
            return;
        }
        editClicked = true;

        $('#editPlanName').prop('disabled', false);
        $('#editMonday').prop('disabled', false);
        $('#editTuesday').prop('disabled', false);
        $('#editWednesday').prop('disabled', false);
        $('#editThursday').prop('disabled', false);
        $('#editFriday').prop('disabled', false);
        $('#editSaturday').prop('disabled', false);
        $('#editSunday').prop('disabled', false);
    });

    $("#updatePlan").on("submit", function (e) {
        e.preventDefault();

        var id = $('#editPlanID').val();
        var name = $('#editPlanName').val();
        var monday = $('#editMonday').val();
        var tuesday = $('#editTuesday').val();
        var wednesday = $('#editWednesday').val();
        var thursday = $('#editThursday').val();
        var friday = $('#editFriday').val();
        var saturday = $('#editSaturday').val();
        var sunday = $('#editSunday').val();

       
        $.ajax({
            url: "libs/php/updatePlan.php",
            type: "GET",
            dataType: "json",
            data: {
                id: id,
                name: name,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadPlans();
                $('#editPlanModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //EDIT WORKOUT
    $("#editWorkoutModal").on("show.bs.modal", function (e) {
        
        $.ajax({
            url: "libs/php/getWorkoutByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(e.relatedTarget).attr("data-id") 
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                
                if (resultCode == 200) {
                    
                    $("#editWorkoutID").val(result.data[0].id);
                    $("#editWorkoutName").val(result.data[0].workout);
                    
                
                } else {
                    $("#editWorkoutModal .modal-title").replaceWith(
                        "Error retrieving data"
                    );
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#editWorkoutModal .modal-title").replaceWith(
                "Error retrieving data"
              );
            }
        });
        
    });

    $('#editWorkoutBtn').on("click", function() {
        if (editClicked) {
            return;
        }
        editClicked = true;

        $('#editWorkoutName').prop('disabled', false);
    });

    $("#updateWorkout").on("submit", function (e) {
        e.preventDefault();

        var id = $('#editWorkoutID').val();
        var name = $('#editWorkoutName').val();

        $.ajax({
            url: "libs/php/updateWorkout.php",
            type: "GET",
            dataType: "json",
            data: {
                id: id,
                name: name
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadWorkout();
                $('#editWorkoutModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //EDIT EXERCISE
    $("#editExerciseModal").on("show.bs.modal", function (e) {
        
        $.ajax({
            url: "libs/php/getExerciseByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(e.relatedTarget).attr("data-id") 
            },
            beforeSend: function() {
                $.ajax({
                    url: "libs/php/getSetsID.php",
                    type: "GET",
                    dataType: "json",
                    success: function(result) {
                        //console.log(JSON.stringify(result));
                        if (result.status.code === '200') {
                            
                            var data = result.data;
            
                            populateSets(data);
                        }
                    },
                    error: function (error) {
                        //console.log('Error:', error);
                    }
                });
                $.ajax({
                    url: "libs/php/getRepsID.php",
                    type: "GET",
                    dataType: "json",
                    success: function(result) {
                        //console.log(JSON.stringify(result));
                        if (result.status.code === '200') {
                            
                            var data = result.data;
            
                            populateReps(data);
                        }
                    },
                    error: function (error) {
                        //console.log('Error:', error);
                    }
                });         
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                
                if (resultCode == 200) {
                    
                    $("#editExerciseID").val(result.data[0].id);
                    $("#editExerciseName").val(result.data[0].exercise);
                    $("#editReps").val(result.data[0].reps_id);
                    $("#editSets").val(result.data[0].sets_id);
                    //console.log(result.data[0].reps_id, result.data[0].sets_id)
                    
                } else {
                    $("#editExerciseModal .modal-title").replaceWith(
                        "Error retrieving data"
                    );
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#editExerciseModal .modal-title").replaceWith(
                "Error retrieving data"
              );
            }
        });
        
    });

    $('#editExerciseBtn').on("click", function() {
        if (editClicked) {
            return;
        }
        editClicked = true;

        $('#editExerciseName').prop('disabled', false);
        $('#editReps').prop('disabled', false);
        $('#editSets').prop('disabled', false);
    });

    $("#updateExercise").on("submit", function (e) {
        e.preventDefault();

        var id = $('#editExerciseID').val();
        var name = $('#editExerciseName').val();
        var reps = $('#editReps').val();
        var sets = $('#editSets').val();
       
        $.ajax({
            url: "libs/php/updateExercise.php",
            type: "GET",
            dataType: "json",
            data: {
                id: id,
                name: name,
                reps: reps,
                sets: sets
            },
            success: function(result) {
                //console.log(JSON.stringify(result));
                loadExercises();
                $('#editExerciseModal').modal('hide');
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
    });

    //RE-DISABLE
    $(document).on('hidden.bs.modal', '#editPlanModal', function () {
        editClicked = false;

        $('#editPlanName').prop('disabled', true);
        $('#editMonday').prop('disabled', true);
        $('#editTuesday').prop('disabled', true);
        $('#editWednesday').prop('disabled', true);
        $('#editThursday').prop('disabled', true);
        $('#editFriday').prop('disabled', true);
        $('#editSaturday').prop('disabled', true);
        $('#editSunday').prop('disabled', true);
    });

    $(document).on('hidden.bs.modal', '#editWorkoutModal', function () {
        editClicked = false;
        
        $('#editWorkoutName').prop('disabled', true);
    });
    
    $(document).on('hidden.bs.modal', '#editExerciseModal', function () {
        editClicked = false;
        
        $('#editExerciseName').prop('disabled', true);
        $('#editReps').prop('disabled', true);
        $('#editSets').prop('disabled', true);
    });

    //DELETE

    //DELETE PLAN
    $(document).on('click', '.deletePlan', function() {
        //$('#deletePlanModal').modal('show');
        $.ajax({
            url: "libs/php/getPlanByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(this).attr("data-id")
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
        
                if (resultCode == 200) {
                    
                    var plan = result.data.plan[0].name;

                    $('#confirmPlan').html('');
                    $('#confirmPlan').append(`<li><h4>${plan}</h4></li>`);
                    $('#deletePlanModal').modal('show');
                    $("#deletePlanID").val(result.data.plan[0].id);
                    //console.log($("#deleteContactID").val());
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#confirmPlan").replaceWith(
                "Error retrieving data"
              );
              $('#deletePlanModal').modal('show');
            }
        });
    });

    //CONFIRM DELETE
    $(document).on('click', '#confirmDeletePlan', function() {
        $.ajax({
            url: "libs/php/deletePlanByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $("#deletePlanID").val() 
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                        
                if (resultCode == 200) {
                    loadPlans();
                    $('#deletePlanModal').modal('hide');
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
    });


    //DELETE WORKOUT
    $(document).on('click', '.deleteWorkout', function() {
        $('#deleteWorkoutModal').modal('show');
        $.ajax({
            url: "libs/php/getWorkoutByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(this).attr("data-id")
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
        
                if (resultCode == 200) {
                    
                    var workout = result.data[0].workout;

                    $('#confirmWorkout').html('');
                    $('#confirmWorkout').append(`<li><h4>${workout}</h4></li>`);
                    $('#deleteWorkoutModal').modal('show');
                    $("#deleteWorkoutID").val(result.data[0].id);
                    //console.log($("#deleteContactID").val());
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#confirmWorkout").replaceWith(
                "Error retrieving data"
              );
              $('#deleteWorkoutModal').modal('show');
            }
        });
    });

    //CONFIRM DELETE
    $(document).on('click', '#confirmDeleteWorkout', function() {
        $.ajax({
            url: "libs/php/deleteWorkoutByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $("#deleteWorkoutID").val() 
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                        
                if (resultCode == 200) {
                    loadWorkout();
                    $('#deleteWorkoutModal').modal('hide');
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
    });

    //DELETE EXERCISE
    $(document).on('click', '.deleteExercise', function() {
        //$('#deleteExerciseModal').modal('show');
        $.ajax({
            url: "libs/php/checkExercise.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(this).attr("data-id")
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
        
                if (resultCode == 200) {
                    
                    var exercise = result.data.exercise[0].exercise;
                    var reps = result.data.exercise[0].reps;
                    var sets = result.data.exercise[0].sets;

                    $("#deleteExerciseID").val(result.data.exercise[0].id);
                    //console.log($("#deleteContactID").val());

                    if (result.data.dependencies[0].workoutCount == 0) {
                        
                        $('#confirmExercise').html('');
                        $('#confirmExercise').append(`<li><h4>${exercise} - ${reps}reps, ${sets}sets</h4></li>`);
                        $('#deleteExerciseModal').modal("show");
                        
                    } else {
                        
                        $('#cantDelete').html('You cannot remove the exercise <span id="cantDeleteName" class="fw-bold"></span> because it is assigned to <span id="pc" class="fw-bold"></span> workouts.');
                        $("#cantDeleteName").text(result.data.dependencies[0].exercise);
                        $("#pc").text(result.data.dependencies[0].workoutCount);
                        
                        $('#selectModal').modal("show");          
                        
                    }
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#confirmExercise").replaceWith(
                "Error retrieving data"
              );
              $('#deleteExerciseModal').modal('show');
            }
        });
    });

    //CONFIRM DELETE
    $(document).on('click', '#confirmDeleteExercise', function() {
        $.ajax({
            url: "libs/php/deleteExerciseByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $("#deleteExerciseID").val() 
            },
            success: function (result) {
                //console.log(JSON.stringify(result));
                var resultCode = result.status.code;
                        
                if (resultCode == 200) {
                    loadExercises();
                    $('#deleteExerciseModal').modal('hide');
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
    });



});