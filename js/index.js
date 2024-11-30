var siteNameInput = document.getElementById("name");
var siteUrlInput = document.getElementById("siteUrl");
var searchInput = document.getElementById("search")
// console.log(siteNameInput);
// console.log(siteUrlInput);
var bookmarkList = [];
if(localStorage.getItem("bookmarkContainer") !== null){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"))
    displayData()
}
function addWeb(){
    if(validationInputs(siteNameInput , "msgName")&&
    validationInputs(siteUrlInput , "msgUrl")){
        var bookmark ={
            name: siteNameInput.value,
            site : siteUrlInput.value
        }
        // console.log(bookmark);
        for(var i=0 ; i< bookmarkList.length ; i++){
            if( bookmarkList[i].name.toLocaleLowerCase().includes(siteNameInput.value.toLocaleLowerCase())){
                alert("The name already exists, please enter another name.")
                return;
            }
            else if(bookmarkList[i].site.toLocaleLowerCase().includes(siteUrlInput.value.toLocaleLowerCase())){
                alert("The URL already exists, please enter another URL.")
                return;
            }
        }
        bookmarkList.push(bookmark)
        localStorage.setItem("bookmarkContainer" , JSON.stringify(bookmarkList) )
        displayData()
        console.log(bookmarkList);
        clearForm()
    }
    else if( validationInputs(siteUrlInput , "msgUrl") === false ||
                validationInputs(siteNameInput , "msgName") === false   ){
                    dialog.classList.add("d-flex")
                    dialog.classList.remove("d-none")
    }
}
function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}
function displayData(){
    var data = "";
    for(var i = 0 ; i<bookmarkList.length ; i++){
        data += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${bookmarkList[i].name}</td>
                        <td><button id=" visit1" class="visit rounded-2 " onclick="visitSite(${i} )"> <i class="fa-solid fa-eye pe-2"></i>Visit </button></td>
                        <td> <button class=" deleteItem rounded-2" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
    `
    }
    document.getElementById("webSite").innerHTML= data
}
function deleteItem(index){
    bookmarkList.splice(index , 1);
    localStorage.setItem("bookmarkContainer" , JSON.stringify(bookmarkList))
    displayData()
}
function visitSite(index){
    window.open( bookmarkList[index].site , '_blank'); 
    // bookmarkList[index].site
}
function validationInputs(element , msgID){
    var regex ={
        name:/^[A-Za-z][A-Za-z-' ]{1,49}$/,
        // name:/^[A-Z][0-9]{1,2}[^a-zA-Z0-9]{5,15}$/
        siteUrl: /^(https?|ftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/
    }
    var text = element.value;
    var msg = document.getElementById(msgID);
    if(regex[element.id].test(text)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}
var btnClose = document.getElementById("btnSub")
var dialog = document.getElementById("dialog")
btnClose.addEventListener("click" , function(){
    dialog.classList.remove("d-flex")
    dialog.classList.add("d-none")
})
// document.addEventListener("click" , function(e){
//     if(dialog.contains(e.target)){
//         dialog.classList.remove("d-flex")
//         dialog.classList.add("d-none")
//     }
// })
function searchData(){
    var term = searchInput.value;
    data = "";
    for(var i=0 ; i<bookmarkList.length ;i++){
        if(bookmarkList[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
            data+= `
                    <tr>
                        <td>${i+1}</td>
                        <td>${bookmarkList[i].name}</td>
                        <td><button id=" visit1" class="visit rounded-2 " onclick="visitSite(${i} )"> <i class="fa-solid fa-eye pe-2"></i>Visit </button></td>
                        <td> <button class=" deleteItem rounded-2" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
    `
        }
    }
    document.getElementById("webSite").innerHTML= data
    
}

