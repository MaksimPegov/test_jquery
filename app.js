$(document).ready(app);

function app() {
    
    var database = firebase.database().ref();   // Подключение к Базе Данных
    var friends = {};                           // Создание пустого массива друзей 
    var ready = false;

    init();
        
    $("i.fa").on("click",addFriend);            // Подключение функции-обработчика 
    database.on("value", function(data){
        //debugger;
        if (!ready) return true;
        friends = data.val() ? data.val().friends : {};
        checkFriends();
        showFriends();
    })
    
    function addFriend(){ 
        
        var inputText = $("input").val().trim();
        var element = $(this);
        
        // Если строка ввода пустая, просто выйти
        if(inputText == ""){
            //$("ul").text("new")
            return false;
        }
        
        if (element.hasClass('fa-female')){
            //debugger;
            friends.girls.push(inputText);
        } else {
            //debugger;
            friends.boys.push(inputText);            
        }
        
        
        // Сохраняю данные в firebase
        saveData()
        //showFriends();
    }
    
    function showFriends() {
        var papa = $("div.male").find("ul");
        var mama = $("div.female").find("ul");
        var girls = friends.girls ? friends.girls : [];
        var boys = friends.boys ? friends.boys : [];
        // Перерисовка массива подруг
        mama.empty();
        for(var i = 0; i < girls.length; i+=1){
            var tmp = $('<li> <span class="fa fa-ban hiden" aria-hidden="true"></span> <span>'+  girls[i]+ '</span>' +"</li>");
            mama.append(tmp)
        }
        // Перерисовка массива друзей
        papa.empty()
        for(var i = 0; i < boys.length; i+=1){
            var tmp = $('<li> <span class="fa fa-ban hiden" aria-hidden="true"></span> <span>'+  boys[i]+ '</span>' +"</li>");
            papa.append(tmp)
        }
        $(".fa-ban").on("click", removeFriend)
        $("li").on("mouseenter", function(){
            $(this).find(".fa").removeClass("hiden")
        })
        $("li").on("mouseleave", function(){
            $(this).find(".fa").addClass("hiden")
        })
    }    

    function saveData() {
        database.set({friends: friends});        
    }

    function removeFriend() {
        var li = $(this).parent()
        // найти индекс нажатого <li>
        var index = li.parent().find("li").index(li)
        //console.log(index)
        if(li.closest('div').hasClass("female")){
            friends.girls.splice(index,1)
        }else{
            friends.boys.splice(index,1)
        }
        saveData();
    }

    function init(){

        database.once('value').then(function(data){

            var tmp = data.val() ? data.val().friends : null;
            
            if(tmp){
                // Данные из базы данных Firebase
                friends = tmp;
                checkFriends();
            } else {
                // Тестовые данные
                friends = {
                    girls:  [],
                    boys:   []
                }        
            }
            ready = true;
            showFriends();            
        });
    }
    // Проверяет наличие свойств girls и boys и если их нет, то добавляем []
    function checkFriends(){

        friends.girls = friends.girls ? friends.girls : [];
        friends.boys = friends.boys ? friends.boys : [];
    }
}