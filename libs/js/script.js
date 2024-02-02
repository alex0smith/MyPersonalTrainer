$(function(){
    //DROPDOWN
    function populatePlans(data) {
        const dropdownAdd = $('#choosePlan');
        dropdownAdd.html('');
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            dropdownAdd.append(option);
        });
    }

    //INDEX
    
    //WEEK
    function populateDays(data) {
        var plan = $('#choosePlan').val();
        data.forEach((item) => {
                    
            if (item.id == plan) {
                $('#mon').html(item.monday);
                $('#tue').html(item.tuesday);
                $('#wed').html(item.wednesday);
                $('#thu').html(item.thursday);
                $('#fri').html(item.friday);
                $('#sat').html(item.saturday);
                $('#sun').html(item.sunday);
            }
        });
    }
    //GET PLANS
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
                    $('#choosePlan').val(selectedPlan);
                }

                populateDays(data);
            
            }
        },
        error: function (error) {
            //console.log('Error:', error);
        }
    });

    //DROPDOWN SELECT
    //let plan = $('#choosePlan').text();

    $("#choosePlan").on("change", function () {
        
        $.ajax({
            url: "libs/php/getPlans.php",
            type: "GET",
            dataType: "json",
            success: function(result) {
                //console.log(JSON.stringify(result));
                if (result.status.code === '200') {
    
                    var data = result.data;
                    populateDays(data);

                    //console.log(plan);
                    
                }
            },
            error: function (error) {
                //console.log('Error:', error);
            }
        });
        
        //SAVE OPTION
        var selectedPlan = $(this).val();
        localStorage.setItem('selectedPlan', selectedPlan);
        
        
    });

    


});