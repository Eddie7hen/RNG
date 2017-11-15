require(['config'],function(){
    require(['jquery'],function($){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            var menu = document.querySelector('.menu');
            if(xhr.status === 200 || xhr.status === 304){
                var res = eval('('+xhr.responseText+')').sorts; 

                //二级菜单
                var menuSec = document.createElement('dl');
                menuSec.classList.add('menu-sec');
                console.log(res);
                menuSec.innerHTML = res.map(function(item){
                    return `<dt class="sec-item">
                                <a href="#" class="sec-a" id="${item.id}">${item.name}</a>
                    </dt>`
                }).join('');
                menu.appendChild(menuSec);

                var id = 0;

                var idx =0;
                
                //一级绑定事件
                menu.onmousemove = function(){
                    menuSec.style.display = 'block';
                }
                menu.onmouseout = function(){
                    menuSec.style.display = 'none';
                }   

                //移入二级标签时生成对应的三级标签
                var menuTrd = document.createElement('div');
                menuTrd.classList.add('menu-trd');
                
                console.log(menuSec.children.length);
                //二级菜单移入绑定事件
                menuSec.onmousemove = function(e){
                    console.log(555);
                    var className = ['menu-trd','trd-item','trd-l','trd-r','trd-r-a',''];
                    console.log(e.target.className.toLowerCase());
                    if(className.indexOf(e.target.className.toLowerCase()) >= 0 ){
                        return ;
                    }
                    
                    for(var i=0;i<menuSec.children.length;i++){
                        menuSec.children[i].children[0].classList.remove('sec-active');
                    }
                    id = +e.target.id;//获取id

                    idx = id ;

                    e.target.classList.add('sec-active');

                    //三级数据
                    var menutrd = getData(res,id);
                    var html = getHTML(menutrd);
                    menuTrd.innerHTML =html;
                    e.target.parentNode.appendChild(menuTrd);
                }
                //二级菜单移出事件
                var timer = setTimeout(function(){
                    menuSec.onmouseout = function(e){
                        e.target.parentNode.removeChild(menuTrd);
                        id = idx = 0;
                        for(var i=0;i<menuSec.children.length;i++){
                            menuSec.children[i].children[0].classList.remove('sec-active');
                        }
                    }   
                },2000)

                /*
                    问题:移入三级时,显示二级当前不隐藏
                    思路:   延迟二级菜单的关闭
                            移入三级时,清除二级延时器
                            显示二级
                 */
                menuTrd.onmouseenter = function(){
                    clearTimeout(timer);
                    for(var i=0;i<menuSec.children.length;i++){
                        menuSec.children[i].children[0].classList.remove('sec-active');
                    }
                    console.log(666)
                    console.log(menuTrd.previousElementSibling);
                    menuTrd.previousElementSibling.classList.add('sec-active');
                }
                menuTrd.onmouseleave = function(){
                    // for(var i=0;i<menuSec.children.length;i++){
                    //     menuSec.children[i].children[0].classList.remove('sec-active');
                    // }
                    menuSec.style.display = 'none';
                }

                //传入对应id和数据返回需要的数据
                function getData(data,id){
                    if(id){
                        console.log()
                        for(var i=0;i<data.length;i++){
                            if(id == data[i].id){
                                return data[i].sorts;
                            }
                        }     
                    }
                    return data.sorts;
                }

                //生成三级结构页面结构
                function getHTML(data){
                     return data.map(function(item){
                        return `<dl class="trd-item">
                                <dt class="trd-l" id="${item.id}">
                                    <a href="#">${item.name}</a>
                                </dt>
                                <dt class="trd-r">
                                    ${item.sorts.map(it=>{ 
                                        return `<a href="#" class="trd-r-a">${it.name}</a>`
                                    }).join('')}
                                </dt>
                                </dl> `
                    }).join('');
                }
            }
        }
        xhr.open('get','../api/data/data.json',true);
        xhr.send(null);
    });
});