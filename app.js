$(document).ready(app)
function app() {
    var txt = 'akjshjklf';
    var newTxt = '<li>kill me!!</li>'


    $("#add").on("click",function(){
        $("#box").append(newTxt);
    })

    $("#kill").on("click",function(){
        $("li").text(txt);
        
    })
}