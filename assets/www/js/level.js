	/* select country names from database when createAccountPage initialize */
	$(document).on('pageinit', '#levelPage',  function(){
		//alert("Create account pageinit");
		 console.log("level page init"); 
	});

	$(document).ready(function() {
		 
	    //Stops the submit request
	    $("#levelForm").submit(function(e){
	        e.preventDefault();
	    });
	    
	    //checks for the button click event
	    $("#submitButton").click(function(e){
	           
	            var highest = parseInt($("select#highest").val());
	            var often = parseInt($("select#often").val());
	            var experience = parseInt($("select#experience").val());
	            
	            var data = highest + often + experience;
	            alert("Based on our test, your level is " + data);
	            
	            
	    });
	    $("#backButton").click(function(e){
	    	history.back();
	    });
	 
	});	
