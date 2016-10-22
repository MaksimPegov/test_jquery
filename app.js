$(document).ready(app)
function app() {

    var girls = ["lisa","virf"]
    var boys = ["max","andrey"]    

    showFriends();

    $("i.fa").on("click",addFriend);
    function addFriend(){
        var text = $("input").val();
        if(text == ""){
            $("ul").text("new")
            return false;
        }
        var element = $(this);
        if(element.hasClass('fa-female')){
            girls.push(text);
            showFriends();
            // Сохраняю девочек в Хранилище
            localStorage.setItem('girls',girls);
        }else{
            boys.push(text);
            showFriends();
            // Сохраняю мальчиков в Хранилище 
            localStorage.setItem('boys',boys);
        }
        
    }
    
    function showFriends() {
        var papa = $("div.male").find("ul") 
        var mama = $("div.female").find("ul")
        mama.empty()
        papa.empty()
        for(var i = 0; i < girls.length; i+=1){
            var tmp = $("<li>"+girls[i]+"</li>")
            mama.append(tmp)
        }
        for(var i = 0; i < boys.length; i+=1){
            var tmp = $("<li>"+boys[i]+"</li>")
            papa.append(tmp)
        }
    }
    
}