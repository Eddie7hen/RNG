require(['config'],function(){
    require(['jquery','header'],function($){
        $('#header').load('../html/header.html');
        $('#footer').load('../html/footer.html');
    })
})