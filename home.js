function openTab(evt, name) {
	// Declare all variables
	var i, tabcontent, tablinks;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(name).style.display = "block";
	evt.currentTarget.className += " active";

	console.log(document.getElementById(name).style.display)
  }


document.getElementById("defaultOpen").click();


function passValues(obj){
	array1 = []
	console.log(obj)
	var checkboxes = document.querySelectorAll("input[type=checkbox]");
	console.log(checkboxes)
	for (checkbox of checkboxes){
		if ($(checkbox).is(":checked")){
			console.log(checkbox)
			var id = checkbox.parentNode.children[3].childNodes[1].id
			array1.push(id)
		}

	}
	localStorage.setItem("favourites" , array1)
	}
	

	// var parentObj = obj.parentNode
	// if($(obj).is(":checked")){
	// 	var likedCard = parentObj;		
	// 	var cardElementString = likedCard.outerHTML
	// 	localStorage.setItem('thecard', cardElementString);
	//   }	  
