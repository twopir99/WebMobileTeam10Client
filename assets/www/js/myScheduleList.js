	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#myScheduleList',  function(){
		 console.log("my schedule page init"); 
		 user_id = $.cookie('myID');
		 console.log("id :: " + user_id);
         dataString = 'userid=' + user_id;
		$.ajax({
            type: "POST",
            url: "http://localhost:8080/MobileServerSide/GetUserSchedule.jsp?callback=?",
            data: dataString,
            dataType: "json",
          //if received a response from the server
            success: function( data, textStatus, jqXHR) {
            	if(data.length>0){
            		for(var i=0;i<data.length;i++){
					    //console.log(data[i].scheduleid);
					    $('#schedulelist').append('<p><a href="#mySchedulePage" onClick="getid('+data[i].scheduleid+');">"'+data[i].date+'"'+data[i].timestart+'"'+data[i].timeend+'</p>');
					    $('#schedulelistdate').append(data[i].date);
            		}
            		
            		
            	}else{
					alert("Your editing process has a problem, contact System Administrator");
            	}
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log("Something really bad happened " + textStatus);
                 $("#myScheduleResponse").html(jqXHR.responseText);
            }
        }); 
	});
		
	$(document).ready(function() {
	    //Stops the submit request
	    $("#myScheduleForm").submit(function(e){
	        e.preventDefault();
	    });
	    
	    //checks for the button click event
	    $("#cancellButton").click(function(e){
	           
	            //get the form data and then serialize that
	            dataString = $("#myScheduleForm").serialize();
	            
	            //get the form data using another method 
	            var scheduleid =$('input#scheduleId').val();
	            dataString = 'scheduleid=' + scheduleid +  '';
	            console.log("scheduleid::"+scheduleid);
	            //make the AJAX request, dataType is set to json
	            //meaning we are expecting JSON data in response from the server
	            
	            $.ajax({
	                type: "POST",
	                url: "http://localhost:8080/MobileServerSide/CancellScheduleProcess.jsp?callback=?",
	                data: dataString,
	                dataType: "json",
	                
	                //if received a response from the server
	                success: function( data, textStatus, jqXHR) {
	                    $.mobile.changePage("index.html#main", {transition:"slideup", reverse:true});
	                },
	                error: function(jqXHR, textStatus, errorThrown){
	                     console.log("Something really bad happened " + textStatus);
	                      $("#createAccountResponse").html(jqXHR.responseText);
	                },
	                
	                //capture the request before it was sent to server
	                beforeSend: function(jqXHR, settings){
	                    //adding some Dummy data to the request
	                    settings.data += "&dummyData=whatever";
	                    //disable the button until we get the response
	                    $('#cancellButton').attr("disabled", true);
	                },
	                
	                //this is called after the response or error functions are finsihed
	                //so that we can take some action
	                complete: function(jqXHR, textStatus){
	                    //enable the button 
	                    $('#cancellButton').attr("disabled", false);
	                }
	      
	            });        
	    });
	    
	 
	});	

	function getid(scheduleid){
    	$.cookie("scheduleid", scheduleid);
    	alert("schedule id " + scheduleid);
    	console.log(scheduleid);
    };
    