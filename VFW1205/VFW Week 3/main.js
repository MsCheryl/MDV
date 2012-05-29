/*Cheryl Ferguson VFW 1205 Week3*/

//wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	//Create select field element and populate with options.
	function addGreetInfo(){
		var formTag		= document.getElementsByTagName( "form" ),
			selectLi = $( 'greetInfo' ),
			makeSelect = document.createElement( 'select' );
			makeSelect.setAttribute( "id", "greetInfo" );
		for( var i = 0, j = greetInfo.length; i < j; i++ ){
			var makeOption = document.createElement( 'option' );
			var optText = greetInfo[i];
			makeOption.setAttribute( "value", optText );
			makeOption.innerHTML = optText;
			makeSelect.appendChild( makeOption );
		}
		selectLi.appendChild( makeSelect );
	}

	// Find value of radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				gendervalue = radios[i].value;
			}
		}
	}

	function getCheckboxValue(){
		if($('affirm').checked){
			affirmValue = $('affirm').value;
		}else{
			affirmValue = "No";
		}
	}  
	
	function toggleControls( n ){
		switch( n ){
			case "on":
				$('memberForm').style.display  = "none";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display      = "inline";
				break;
		case "off":
				$('memberForm').style.display  = "block";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display      = "none";
				$('items').style.display       = "none";
				break;

			default:
				return false;	
		}
	}

	
	function storeData(key){
		
		if(!key){
			var id		= Math.floor(Math.random()*100000001);
		}else{
		
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
		
		var item			= {};
		item.greetInfo 		= ["Select Appropriate Greeting:" , $('greetInfo').value];
		item.fname 			= ["First Name:" , $('fname').value];
		item.lname 			= ["Last Name:" , $('lname').value];
		item.username 		= ["Username:" , $('username').value];
		item.email 			= ["Email:" , $('email').value];
		//item.gender		= ["Gender:", gendervalue]; 
		item.affirm			= ["Ease of Use:", ease]; 	 
		item.range	 		= ["Rating", $('range').value];*/
		item.date			= ["Date", $('date').value];
		item.notes			= ["Notes", $('notes').value];	
		
		localStorage.setItem(id, JSON.stringify( item ));
		alert( "Your information has been Stored!" );
	}
	
	function getData(){
		toggleControls("on");
		
		var makeDiv = document.createElement( 'div' );
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display       = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement( 'li' );
			var linksLi = document.createElement( 'li' );
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			var obj = JSON.parse(value);
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement( 'li' );
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
		}
	}
	
	//Make Item Links
	//edit and delete Links for each stored item when displayed
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement( 'a' );
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Individual Entry";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement( 'br' );
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement( 'a' );
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Individual Entry";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		// data from Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls( "off" );
		
		//populate the form fields with current localStorage values.
		//$('greetInfo').value = item.greetInfo[1];
		$('fname').value = item.fname[1];
		$('lname').value = item.lname[1];
		$('username').value = item.username[1];
		$('email').value = item.email[1];
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.gender[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.gender[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.affirm[1] == "Yes"){
			$('affirm').setAttribute("checked", "checked");
		}	
		$('range').value = item.range[1];
		$('date').value = item.date[1];
		$('notes').value = item.notes[1];
		
		
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Button
		$('submit').value = "Edit Contact";
		var editSubmit = $('submit'); 
		
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("This will delete this entry, proceed?");
		if(ask){	
			localStorage.removeItem(this.key)
			alert("Information was deleted!!");
			window.location.reload();
		}else{
			alert("Information was NOT deleted.");	
		}
	}
	
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "No information stored." );
		}else{
			localStorage.clear();
			alert( "Information has been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//elements we want to check
		var getGreetInfo = $('greetInfo');
		var getFname = $('fname');
		var getLname = $('lname');
		var getEmail = $('email');
		
		//Reset Errors Messages
		errMsg.innerHTML = "";
		getGreetInfo.style.border = "1px solid black";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		
		//Get Error Messages
		var messageAry = [];
		//Greeting Validation
		if(getGreetInfo.value ==="--Select One--"){
			var greetInfoError = "Please select a title.";
			getGreetInfo.style.border = "1px solid red";
			messageAry.push(greetInfoError);
		}
		
		//First Name Validation
		if(getFname.value ===""){
			var fNameError = "Field can not be blank.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		
		//Last Name Validation
		if(getLname.value ===""){
			var lNameError = "Field can not be blank.";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);
		}
		
		//Email Validation
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Valid email address required.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);

		}
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement( 'li' );
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;	
		}else{
			
			storeData(this.key);
		}
		
	}
	
//Variable defaults
var greetInfo = ["--Select One--", "Miss", "Ms.", "Mrs.", "Master","Mr."],
	gendervalue,
	affirmValue = "No",
	errMsg = $('errors');
	;
addGreetInfo();

//Set Link & Submit Click Events
	
	var displayLink = $( 'displayData' );
	displayLink.addEventListener("click", getData);
	var clearLink   = $( 'clear' );
	clearLink.addEventListener( "click", clearLocal); 
	var save        = $( 'submit' );
	save.addEventListener( "click", validate);
	

});		
