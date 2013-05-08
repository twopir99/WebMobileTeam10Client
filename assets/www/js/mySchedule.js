	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#mySchedulePage',  function(){
		 console.log("my schedule page init"); 
		 scheduleid = $.cookie('scheduleid');
		 matchid = $.cookie('matchid');
		 console.log("scheduleid :: " + scheduleid);
         dataString = 'scheduleid=' + scheduleid + '&matchid=' + matchid + '';
         console.log("dataString :: " + dataString);
		$.ajax({
            type: "POST",
            url: "http://localhost:8080/MobileServerSide/GetScheduleJSON.jsp?callback=?",
            data: dataString,
            dataType: "json",
          //if received a response from the server
            success: function( data, textStatus, jqXHR) {
            	if(data.length=1){
            		console.log(data);
            		$('input#date').val(data[0].date);
            		$('input#date').attr('readonly','readonly');
            		$('input#timestart').val(data[0].timestart);
            		$('input#timestart').attr('readonly','readonly');
            		$('input#timeend').val(data[0].timeend);
            		$('input#timeend').attr('readonly','readonly');
            		var levelarr = data[0].level[0].lv;
            		if(data[0].level.length>1){
	            		for(var i=1;i<data[0].level.length;i++){
	            			levelarr = levelarr + "," + data[0].level[i].lv;
	            		}
            		}
            		console.log(levelarr);
            		$('input#plevel').val(levelarr);
            		$('input#plevel').attr('readonly','readonly');
            		var agearr = data[0].age[0].a;
            		if(data[0].age.length>1){
	            		for(var i=1;i<data[0].age.length;i++){
	            			agearr = agearr + "," + data[0].age[i].a;
	            		}
            		}
            		console.log(agearr);
            		$('input#page').val(agearr);
            		$('input#page').attr('readonly','readonly');
            		$('input#pgender').val(data[0].pgender);
            		$('input#pgender').attr('readonly','readonly');
            		$('input#pnationality').val(data[0].pnationality);
            		$('input#pnationality').attr('readonly','readonly');
            		$('input#type').val(data[0].type);
            		$('input#type').attr('readonly','readonly');
            		$('input#status').val(data[0].status);
            		$('input#status').attr('readonly','readonly');
            		$('input#statuspush').val(data[0].statuspush);
            		$('input#statuspush').attr('readonly','readonly');
            		$('input#statusmail').val(data[0].statusmail);
            		$('input#statusmail').attr('readonly','readonly'); 
            		//}
            		
            		
            	}else{
					alert("This process has a problem, contact System Administrator");
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
