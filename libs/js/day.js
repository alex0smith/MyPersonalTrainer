$(function(){
    //DROPDOWN
    function populatePlans(data) {
        const dropdownAdd = $('#selectPlan');
        dropdownAdd.html('');
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            dropdownAdd.append(option);
        });
    }

    
    //      //
    //MONDAY // 
    //      //
    
    function workout(data){
        var plan = $('#selectPlan').val();
        var day = $('#day').text();
                data.forEach((item) => {
                        
                    if (item.id == plan) {

                        if (day == 'MONDAY') {
                            $('#workout').html(item.monday);
                        } else if (day == 'TUESDAY') {
                            $('#workout').html(item.tuesday);
                        } else if (day == 'WEDNESDAY') {
                            $('#workout').html(item.wednesday);
                        } else if (day == 'THURSDAY') {
                            $('#workout').html(item.thursday);
                        } else if (day == 'FRIDAY') {
                            $('#workout').html(item.friday);
                        } else if (day == 'SATURDAY') {
                            $('#workout').html(item.saturday);
                        } else if (day == 'SUNDAY') {
                            $('#workout').html(item.sunday);
                        }
                        
                    }
                });
    }



    //CREATES TABLE
    function exercises() {
        $.ajax({
            url: "libs/php/getWorkouts.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
    
                    var data = result.data;
                    data.sort((a, b) => a.exercise_name.localeCompare(b.exercise_name));
                    var workout = $('#workout').text();
                    var table =  '<table class="table table-hover table-dark"><thead><tr><th class="text-start text-nowrap d-sm-table-cell text-primary">Exercise</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Reps</th><th class="text-start text-nowrap d-sm-table-cell text-primary">Sets</th><tr></thead><tbody>';
                    if (workout != 'Rest') {

                        data.forEach((item) => {
                            if (item.workout_name == workout) {
                                table += '<tr><td class="text-start text-nowrap d-sm-table-cell">'+ item.exercise_name +'</td>';
                                table += '<td class="text-start text-nowrap d-sm-table-cell">'+ item.reps +'</td>';
                                table += '<td class="text-start text-nowrap d-md-table-cell">'+ item.sets +'</td>';
                                table += '</tr>';
                            } 
                            
                        });
                        table += '</tbody></table>'
                        $('#dayTable').html(table);

                    } else {
                        $('#dayTable').html('');
                    }
           
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        
    }

    //LOAD WORKOUT
    //LOAD EXERCISE
    $.ajax({
        url: "libs/php/getPlans.php",
        type: "GET",
        dataType: "json",
        success: function(result) {
            //console.log(JSON.stringify(result));
            if (result.status.code === '200') {

                var data = result.data;
                populatePlans(data);
                
                //SELECTED DROPDOWN
                var selectedPlan = localStorage.getItem('selectedPlan');
                if (selectedPlan) {
                    $('#selectPlan').val(selectedPlan);
                }

                workout(data);
                
                exercises();
            }
        },
        error: function (error) {
            //console.log('Error:', error);
        }
    });
    

    //CHANGE PLAN
    $("#selectPlan").on("change", function () {
        
        //LOAD WORKOUT
        $.ajax({
            url: "libs/php/getPlans.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
    
                    var data = result.data;
                    workout(data);
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });

        //SAVE OPTION - REMOVE IF DONT WANT TO CHANGE HOME PAGE PLAN 
        //var selectedPlan = $(this).val();
        //localStorage.setItem('selectedPlan', selectedPlan);

        //LOAD EXERCISE
        exercises();
        
    });

});