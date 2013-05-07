	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#schedulePage',  function(){
		user_id = $.cookie('myID');
		console.log("schedule page init");
		$.getJSON("http://localhost:8080/MobileServerSide/GetCountryNamesJSON.jsp?callback=?",
				null,
				function(data){
					   for(var i=0;i<data.length;i++){
					    $('#pnationality').append('<option value="'+data[i].code+'">'+data[i].name_en+'</option>');
					   }
				}
				);
	});

	$(document).ready(function() {
		 
	    //Stops the submit request
	    $("#scheduleForm").submit(function(e){
	        e.preventDefault();
	    });
	    
	    //checks for the button click event
	    $("#makeScheduleButton").click(function(e){
	           
	            //get the form data and then serialize that
	            dataString = $("#scheduleForm").serialize();
	            
	            //get the form data using another method 
	            var date = $("input#date").val();
	            var timestart = $('input:radio[name=timestart]:checked').val();
	            var timeend = $('input:radio[name=timeend]:checked').val();
	            var plevelarr = [];
	            $('input[name="plevel"]:checked').each(function(i){
	                plevelarr[i] = $(this).val();
	            });
	            var plevel = plevelarr.join();
	            var pagearr = [];
	            $('input[name="page"]:checked').each(function(i){
	                pagearr[i] = $(this).val();
	            });
	            var page = pagearr.join();
	            var pgender = $("select#pgender").val();
	            var pnationality = $("select#pnationality").val();
	            var ptype = $("select#ptype").val();
	            
	            dataString = 'userid=' + user_id + 
	            				'&date=' + date +
	            				'&timestart=' + timestart +
	            				'&timeend=' + timeend +
	            				'&age=' + page +
	            				'&gender=' + pgender +
	            				'&nationality=' + pnationality +
	            				'&level=' + plevel +
	            				'&type=' + ptype + '';
	            
	    		console.log(dataString); 
	            
	            //make the AJAX request, dataType is set to json
	            //meaning we are expecting JSON data in response from the server
	            $.ajax({
	                type: "POST",
	                url: "http://localhost:8080/MobileServerSide/ScheduleProcess.jsp?callback=?",
	                data: dataString,
	                dataType: "json",
	                
	                //if received a response from the server
	                success: function( data, textStatus, jqXHR) {
	                    //our country code was correct so we have some information to display
	                	if(data.length==1){
							if(data[0].success){
								$.mobile.changePage("#main", {transition:"slideup", reverse:true});
							} 
							 //display error message
							else {
								alert("Schedule Failed");
							}
	                	}else{
	                		//$("#loginResponse").html("ID data has a problem");
							alert("Your schedule data have a problem, contact System Administrator");
	                	}
	                },
	                
	                //If there was no resonse from the server
	                error: function(jqXHR, textStatus, errorThrown){
	                     console.log("Something really bad happened " + textStatus);
	                      $("#scheduleResponse").html(jqXHR.responseText);
	                },
	                
	                //capture the request before it was sent to server
	                beforeSend: function(jqXHR, settings){
	                    //adding some Dummy data to the request
	                    settings.data += "&dummyData=whatever";
	                    //disable the button until we get the response
	                    $('#makeScheduleButton').attr("disabled", true);
	                },
	                
	                //this is called after the response or error functions are finsihed
	                //so that we can take some action
	                complete: function(jqXHR, textStatus){
	                    //enable the button 
	                    $('#makeScheduleButton').attr("disabled", false);
	                }
	      
	            });        
	    });
	    

	 
	});	
