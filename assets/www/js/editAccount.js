	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#editProfilePage1',  function(){
		 //alert("Edit account pageinit");
		 console.log("edit account page init"); 
		 //user_id = getCookie('myID');
		 user_id = $.cookie('myID');
		 console.log("id :: " + user_id);
		 //alert("user_id::" + user_id);
		 $('input#reguserid').val(user_id);
		 $('input#reguserid').attr('readonly','readonly');
		$.getJSON("http://localhost:8080/MobileServerSide/GetCountryNamesJSON.jsp?callback=?",
				null,
				function(data){
					   for(var i=0;i<data.length;i++){
					    //console.log(data[i].name_en); 
						   //alert(console.log(data[i].name_en));
					    $('select#ednationality').append('<option value="'+data[i].name_en+'">'+data[i].name_en+'</option>');
					   }
				}
				);
		//use user_id to get profile
        
        dataString = 'userid=' + user_id;
		
		$.ajax({
            type: "POST",
            url: "http://localhost:8080/MobileServerSide/GetUserProfileJSON.jsp?callback=?",
            data: dataString,
            dataType: "json",
          //if received a response from the server
            success: function( data, textStatus, jqXHR) {
            	if(data.length==1){
            		console.log(data[0].nationality);
            		$('input#regpassword').val(data[0].password);
            		$('input#name').val(data[0].name);
            		$('select#gender').val(data[0].gender).change();
            		$('input#age').val(data[0].age);
            		//$('select#ednationality option:selected').val(data[0].nationality)
            		//$('select#ednationality').val(data[0].nationality).attr("selected", "selected");
            		//$('select#ednationality').val(data[0].nationality);
            		$('select#ednationality').val("Angola").attr("selected", "selected");
            		//$(select[name=ednationality]).val('Angola').attr("selected", "selected");
            		$('input#level').val(data[0].level);
            		$('input#email').val(data[0].email);
            		$('input#phonenumber').val(data[0].phonenumber);
            	}else{
            		//$("#loginResponse").html("ID data has a problem");
					alert("Your editing process has a problem, contact System Administrator");
            	}
            },
        }); 
	});
		
	$(document).ready(function() {
	    //Stops the submit request
	    $("#editAccountForm").submit(function(e){
	        e.preventDefault();
	    });
	    
	    //checks for the button click event
	    $("#editAccountButton").click(function(e){
	           
	            //get the form data and then serialize that
	            dataString = $("#editAccountForm").serialize();
	            
	            //get the form data using another method 
	            var userid = $("input#reguserid").val();
	            var password = $("input#regpassword").val();
	            var name = $("input#name").val();
	            var gender = $("select#gender").val();
	            var age = $("input#age").val();
	            var nationality = $("select#nationality").val();
	            var level = $("input#level").val();
	            var email = $("input#email").val();
	            var phonenumber = $("input#phonenumber").val();
	            
	            dataString = 'userid=' + userid + 
	            				'&password=' + password +
	            				'&name=' + name +
	            				'&gender=' + gender +
	            				'&age=' + age +
	            				'&nationality=' + nationality +
	            				'&level=' + level +
	            				'&email=' + email +
	            				'&phonenumber=' + phonenumber + '';
	            System.out.println(dataString);
	            
	            //make the AJAX request, dataType is set to json
	            //meaning we are expecting JSON data in response from the server
	            
	            $.ajax({
	                type: "POST",
	                url: "http://localhost:8080/MobileServerSide/EditAccountProcess.jsp?callback=?",
	                data: dataString,
	                dataType: "json",
	                
	                //if received a response from the server
	                success: function( data, textStatus, jqXHR) {
	                    //our country code was correct so we have some information to display
	                	if(data.length==1){
							if(data[0].success){
								$.mobile.changePage("#loginPage", {transition:"slideup", reverse:true});
							} 
							 //display error message
							else {
								alert("Saving Account Failed");
							}
	                	}else{
	                		//$("#loginResponse").html("ID data has a problem");
							alert("Your profile has a problem, contact System Administrator");
	                	}
	                },
	                
	                //If there was no resonse from the server
	                error: function(jqXHR, textStatus, errorThrown){
	                     console.log("Something really bad happened " + textStatus);
	                      $("#createAccountResponse").html(jqXHR.responseText);
	                },
	                
	                //capture the request before it was sent to server
	                beforeSend: function(jqXHR, settings){
	                    //adding some Dummy data to the request
	                    settings.data += "&dummyData=whatever";
	                    //disable the button until we get the response
	                    $('#editAccountButton').attr("disabled", true);
	                },
	                
	                //this is called after the response or error functions are finsihed
	                //so that we can take some action
	                complete: function(jqXHR, textStatus){
	                    //enable the button 
	                    $('#editAccountButton').attr("disabled", false);
	                }
	      
	            });        
	    });
	    

	 
	});	
