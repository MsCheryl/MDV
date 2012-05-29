//Cheryl Ferguson
//VFW 1205 Project 2



//wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function addMemInfo(){
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
	
	// Find value of a selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				genderValue = radios[i].value;
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
	
	function storeData(){
		
		//var id 			= Math.floor( Math.random() *10001 );
		if(!key){
			var id		= Math.floor(Math.random()*1000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ket that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here, into the storeData function.
			id = key;
		}

		getSelectedRadio();
		getCheckboxValue();
		var item			= {};
		item.greetInfo 		= ["Select Appropriate Greeting:" , $('greetInfo').value];
		item.fname 			= ["First Name:" , $('fname').value];
		item.lname 			= ["Last Name:" , $('lname').value];
		item.username 		= ["Username:" , $('username').value];
		item.pw				= ["Password:", $('pw').value];
		item.email 			= ["Email:" , $('email').value];
		item.gender			= ["Gender:", genderValue]; 
		item.affirm			= ["Affirm:", affirmValue]; 	 
		item.ease	 		= ["Ease of Use", $('ease').value];
		item.date			= ["Date", $('date').value];
		item.notes			= ["Notes", $('notes').value]; 
		
		localStorage.setItem(id, JSON.stringify( item ));
		alert( "Your Information Added!" );
	}
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 ){
			alert( "No are no saved entries." );
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		$( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
			} 
		}
	}	
	
		//Make Item Links
	//Create the edit and delete Links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement( 'a' );
		editLink.href = "#";
		editLink.key = key;
		var editEntry = "Edit Entry";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editEntry;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement( 'br' );
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement( 'a' );
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteEntry = "Delete Entry";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteEntry;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the data from our item Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls( "off" );
		
		//populate the form fields with current localStorage values.
		$('greetInfo').value = item.greetInfo[1];
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
		$('ease').value = item.ease[1];
		$('date').value = item.date[1];
		$('notes').value = item.notes[1];
		
		//Remove the initial listener from the input 'save contact' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Button
		$('submit').value = "Edit Contact";
		var editSubmit = $('submit'); 
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.  
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to removed this entry?");
		if(ask){	
			localStorage.removeItem(this.key);
			alert("Information was removed!!");
			window.location.reload();
		}else{
			alert("Information was not removed.");	
		}
	}
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "No Saved Information." );
		}else{
			localStorage.clear();
			alert( "All information has been removed!" );
			window.location.reload();
			return false;
		}
	}

	function validate(e){
		//Define the elements we want to check
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
		//Title Validation
		if(getGreetInfo.value ==="--Select One--"){
			var greetInfoError = "Please choose a title";
			getGreetInfo.style.border = "1px solid red";
			messageAry.push(greetInfoError);
		}
		
		//First Name Validation
		if(getFname.value ===""){
			var fNameError = "Please enter your first name.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		
		//Last Name Validation
		if(getLname.value ===""){
			var lNameError = "Please enter your last name.";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);
		}
		
		//Email Validation
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter valid email address.";
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

	var greetInfo = ["--Select One--", "Miss", "Ms.", "Mrs.", "Master","Mr."],
		gendervalue,
		affirmValue = "Yes"
	;
	addMemInfo();
	
	var displayLink = $( 'displayData' );
	displayLink.addEventListener("click", getData);
	var clearLink   = $( 'clear' );
	clearLink.addEventListener( "click", clearLocal );
	var save        = $( 'submit' );
	save.addEventListener( "click", storeData );
	

});		
