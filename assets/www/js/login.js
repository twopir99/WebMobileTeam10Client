$(document).ready(function() {
 
    //Stops the submit request
    $("#loginRequestForm").submit(function(e){
           e.preventDefault();
    });
    
    //checks for the button click event
    $("#loginButton").click(function(e){
            //get the form data and then serialize that
            dataString = $("#loginRequestForm").serialize();
            
            //get the form data using another method 
            var userid = $("input#userid").val();
            var password = $("input#password").val();
            dataString = 'userid=' + userid + 
            				'&password=' + password + '';
            
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/MobileServerSide/LoginProcess.jsp?callback=?",
                data: dataString,
                dataType: "json",
                
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    //our country code was correct so we have some information to display
                	if(data.length==1){
						if(data[0].success){
							//alert(userid);
							$.cookie('myID', userid);
							//setCookie('myID', userid);  
							//alert(getCookie('myID'));
							
							$.mobile.changePage("#main", {transition:"slideup", reverse:true});
							
						} 
						 //display error message
						else {
							$("#loginResponse").html("Login failed");
							alert("wrong ID or password");
						}
                	}else{
                		$("#loginResponse").html("ID data has a problem");
						alert("Your ID has a problem, contact System Administrator");
                	}
                },
                
                //If there was no resonse from the server
                error: function(jqXHR, textStatus, errorThrown){
                     console.log("Something really bad happened " + textStatus);
                     console.log("Something really bad happened2 " + jqXHR.responseText);
                      $("#loginResponse").html(jqXHR.responseText);
                },
                
                //capture the request before it was sent to server
                beforeSend: function(jqXHR, settings){
                    //adding some Dummy data to the request
                    settings.data += "&dummyData=whatever";
                    //disable the button until we get the response
                    $('#loginButton').attr("disabled", true);
                },
                
                //this is called after the response or error functions are finsihed
                //so that we can take some action
                complete: function(jqXHR, textStatus){
                    //enable the button 
                    $('#loginButton').attr("disabled", false);
                }
      
            });        
    });
    

 
});