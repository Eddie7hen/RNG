//这是配置文件
//paths后面不需要地址
requirejs.config({
    //baseUrl:'js',
    paths : {
        "jquery" : "../lib/jQuery/jquery-3.2.1",
        'header' : "./header",
        'carousel':'../lib/jquery-EdCarousel/jquery-EdCarousel',
        'common':'./common',
        'edzoom':'../lib/jquery-EdZoom/jquery-EdZoom'
    },
    shim:{
        'carousel':['jquery'],
        'edzoom':['jquery']

    }
})