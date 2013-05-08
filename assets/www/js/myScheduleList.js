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
            	var content = "<div id=list><ul>";
            	if(data.length>0){
            		for(var i=0;i<data.length;i++){
            			var s ="";
            			if(data[i].status==1){
            				s = "unmatched";
            				content+="<li><a href=#mySchedulePage onClick=getid('"+data[i].scheduleid+"','"+data[i].matchid+"');>" + 
                            "<h3>" + "You have a schedule on " + data[i].date + "</h3>"+
                            "<h4>" + "Starts from " + data[i].timestart + " And ends at " + data[i].timeend + "</h4>"+
                            "<p style=color:red;margin-left:5em;><b>"  + "Status : " + s + "</b></p>"+
                            "</a></li>";
            			}
            			else{
            				s = "matched";
            				content+="<li><a href=#mySchedulePage onClick=getid('"+data[i].scheduleid+","+data[i].matchid+"');>" + 
                            "<h3>" + "You have a schedule on " + data[i].date + "</h3>"+
                            "<h4>" + "Starts from " + data[i].timestart + " And ends at " + data[i].timeend + "</h4>"+
                            "<p style=color:green;margin-left:5em;><b>" + "Status : " + s + "</b></p>"+
                            "</a></li>";
            			}
					    
            		}
            		content+="</ul>"
            		$("#list").append(content);
            		
                                   		
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

	    
	 
	});	

	function getid(scheduleid,matchid){
    	$.cookie("scheduleid", scheduleid);
    	$.cookie("matchid", matchid);
    	alert("schedule id " + scheduleid);
    	alert("match id " + matchid);
    	console.log(scheduleid);
    	console.log(matchid);
    };
    