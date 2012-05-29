//Cheryl Ferguson
//VFW 1205 Project 2



//wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function addSongsInfo(){
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
			affirmValue = "No"
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
		
		var id 			= Math.floor( Math.random() *10001 );
		
		getSelectedRadio();
		getCheckboxValue();
		var item			= {};
		item.greetInfo 		= ["Select Appropriate Greeting:" , $('greetInfo').value];
		item.fname 			= ["First Name:" , $('fname').value];
		item.lname 			= ["Last Name:" , $('lname').value];
		item.username 		= ["Username:" , $('username').value];
		item.email 			= ["Email:" , $('email').value];
		/*Item.gender		= ["Gender:", genderValue]; 
		Item.affirm			= ["Affirm:", affirmValue]; 	 
		Item.ease	 		= ["Ease of Use", $('ease').value];
		Item.date			= ["Date", $('date').value];
		Item.notes			= ["Notes", $('notes').value]; */
		
		localStorage.setItem(id, JSON.stringify( item ));
		alert( "Information Added!" );
	}
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 ){
			alert( "No Saved Information." );
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
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "No Saved Information." );
		}else{
			localStorage.clear();
			alert( "All information has been deleted!" );
			window.location.reload();
			return false;
		}
	}

	var greetInfo = ["--Select One--", "Miss", "Ms.", "Mrs.", "Master","Mr."],
		gendervalue,
		affirmValue = "No"
	;
	addSongsInfo();
	
	var displayLink = $( 'displayData' );
	displayLink.addEventListener("click", getData);
	var clearLink   = $( 'clear' );
	clearLink.addEventListener( "click", clearLocal );
	var save        = $( 'submit' );
	save.addEventListener( "click", storeData );
	

});		
