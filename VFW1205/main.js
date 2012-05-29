//Commented out parts are what I wanted to do but could not get to work right, also some are just parts I didn't want in it anymore

window.addEventListener("DOMContentLoaded", function doItAll(){
    
    function $(e){
        var elementID = document.getElementById(e);
        return elementID;
    }

    function makeSelect(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "status");
        for(var i = 0, j = statusType.length; i < j; i++){
            var makeOption = document.createElement("option");
            var optText = statusType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

    function getRadio(){
        var radios = document.forms[0].baptized;
        for(var i = 0; i < radios.length; i++){
            if (radios[i].checked){
                baptizedValue = radios[i].value;
            }
        }
    }

    function getCheckbox(){
        if($('gender').checked){
            favoriteValue = $('gender').value;
        } else {
            favoriteValue = "Female"
        }
    }
    /*function getCheckbox(){
var checkboxes = document.forms[0].uses;
for(var i = 0; i < checkboxes.length; i++){
if (checkboxes[i].checked){
usesValue = checkboxes[i].value;
}
}
}*/

    function toggleControls(n){
        switch(n){
            case "on":
                $("memberForm").style.display = "none";
                $('clearData').style.display = "inline";
                $("displayData").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("memberForm").style.display = "block";
                $('clearData').style.display = "inline";
                $("displayData").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }

    function validate(e){
        var getEmail = $("email");
        var getMaritalStatus = $("status");
        var getBaptized = $("baptized");
        var getJoinDate = $("joinDate");

        errMsg.innerHTML = "";
        getEmail.style.border = "1px solid black";
        getMartialStatus.style.border = "1px solid black";
        getBaptized.style.border = "1px solid black";
        getJoinDate.style.border = "1px solid black";

        var messageArray = [];

        if(getEmail.value === ""){
            var emailError = "Please enter your email.";
            getEmail.style.border = "1px solid red";
            messageArray.push(emailError);
        }

        if(getMaritalStatus.value === "--MaritalStatus--"){
            var maritalStatusError = "Please select one.";
            getMaritalStatus.style.border = "1px solid red";
            messageArray.push(maritalStatusError);
        }

        if(getBaptized.value === ""){
            var baptizedError = "Please select one.";
            getBaptized.style.border = "1px solid red";
            messageArray.push(baptizedError);
        }

        if(getJoinDate.value === ""){
            var joinDateError = "Please enter the day you joined.";
            getJoinDate.style.border = "1px solid red";
            messageArray.push(joinDateError);
        }

        if(messageArray.length >= 1){
            for(var i = 0, j = messageArray.length; i < j; i++){
                var text = document.createElement("li");
                text.innerHTML = messageArray[i];
                errMsg.appendChild(text);
            }
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        }
    }

    function storeData(key){
        if(!key){
            var id = Math.floor(Math.random()*100000001);
        } else {
            id = key;
        }
        getRadio();
        getCheckbox();
        var item = {};
            //item.userName = ["Username:", $("un").value];
            //item.password = ["Password:", $("pw").value];
            //item.date = ["Date Submitted:", $("date").value];
            item.email = ["email:", $("email").value];
            item.maritalStatus = ["Marital Status:", $("status").value];
            item.baptized = ["Baptized:", baptizedValue];
            item.gender = ["Gender:", genderValue];
            //item.uses = ["Uses:", usesValue];
            item.easy = ["Ease of Use:", $("easy").value];
            item.otherDetails = ["Other Details:", $("comments").value];
            item.subDate = ["Date Submitted:", $("subDate").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Stored!");
    }

function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no enteries.");
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for(var i = 0, len=localStorage.length; i < len; i++){
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi)
        }
    }

    function makeItemLinks(key, linksLi){
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Entry";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Entry";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        $("email").value = item.email[1];
        $("status").value = item.maritalStatus[1];
        var radios = document.forms[0].baptized;
        for(var i = 0; i < radios.length; i++){
            if(radios[i].value == "Yes" && item.baptized[1] == "Yes"){
                radios[i].setAttribute("checked", "checked");
            } else (radios[i].value == "No" && item.baptized[1] == "No")
                radios[i].setAttribute("checked", "checked");
        }
        if(item.gender[1] == "Male"){
            $('gender').setAttribute("checked", "checked");
            } else (item.gender[1] == "Male")  //added these two lines
            $('gender').setAttribute("checked", "checked");
            
        }
        //item.uses = ["Uses:", usesValue];
        $("easy").value = item.easeOfUse[1];
        $("comments").value = item.otherDetails[1];
        $("subDate").value = item.subDate[1];

        saveData.removeEventListener("click", storeData);

        $("saveData").value = "Edit Information";
        var editSubmit = $("saveData");

        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem( ){
        var ask = confirm("Are you sure yo want to remove your Information?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Information removed.");
            window.location.reload();
        } else {
            alert("Information was not removed.");
        }
    }

    function eraseData(){
        if(localStorage.length === 0){
            alert("There are currently no entries.");
        } else {
            localStorage.clear();
            alert("Membership database has been erased.");
            window.location.reload();
            return false;
        }
    }
    
    var maritalStatus = ["--Marital Status--", "Single", "Married", "Divorced", "Widow/Widower", "Domestic Partnership"],
        baptizedValue,
        genderValue = "Female",
        //usesValue,
        errMsg = $("errors");

    makeSelect(); 

    var saveData = $("saveData");
    saveData.addEventListener("click", validate);
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);
    var clearData = $("clearData");
    clearData.addEventListener("click", eraseData);

});