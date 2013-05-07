	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#mySchedulePage',  function(){
		 console.log("my schedule page init"); 
		 scheduleid = $.cookie('scheduleid');
		 console.log("scheduleid :: " + scheduleid);
         dataString = 'userid=' + user_id;
		
		$.ajax({
            type: "POST",
            url: "http://localhost:8080/MobileServerSide/GetUserSchedule.jsp?callback=?",
            data: dataString,
            dataType: "json",
          //if received a response from the server
            success: function( data, textStatus, jqXHR) {
            	if(data.length>0){
            		//for(var i = 2; i<data.length;i+3)
            		//{
            		var i=2;
            		console.log(data);
            		$('input#scheduleId').val(data[i].scheduleid);
            		$('input#scheduleId').attr('readonly','readonly');
            		$('input#date').val(data[i].date);
            		$('input#date').attr('readonly','readonly');
            		$('input#timestart').val(data[i].timestart);
            		$('input#timestart').attr('readonly','readonly');
            		$('input#timeend').val(data[i].timeend);
            		$('input#timeend').attr('readonly','readonly');
            		$('input#plevel').val(data[i].levelarr);
            		$('input#plevel').attr('readonly','readonly');
            		$('input#page').val(data[i].agearr);
            		$('input#page').attr('readonly','readonly');
            		$('input#pgender').val(data[i].pgender);
            		$('input#pgender').attr('readonly','readonly');
            		$('input#pnationality').val(data[i].pnationality);
            		$('input#pnationality').attr('readonly','readonly');
            		$('input#type').val(data[i].type);
            		$('input#type').attr('readonly','readonly');
            		$('input#status').val(data[i].status);
            		$('input#status').attr('readonly','readonly');
            		$('input#statuspush').val(data[i].statuspush);
            		$('input#statuspush').attr('readonly','readonly');
            		$('input#statusmail').val(data[i].statusmail);
            		$('input#statusmail').attr('readonly','readonly'); 
            		//}
            		
            		
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
