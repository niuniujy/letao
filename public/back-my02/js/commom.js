// 需求:在一进入页面的时候,在ajax请求开始的时候开始进度条
        // 在全部ajax请求结束的时候结束进度条
$(document).ajaxStart(function(){
        // 开启进度条
    

        NProgress.start();
   
})

$(document).ajaxStop(function(){
     // 结束进度条
     setTimeout(function(){

         NProgress.done();
     },200)
})


// 需求:公共功能

$(function(){
// 1.点击按钮categoryBtn控制二级分类的显示和隐藏

$("#categoryBtn").on("click",function(){
        // $(this).next().slideToggle();
        $(this).next().stop().slideToggle();
})


// 2.点击菜单按钮,侧边栏向左移动180px,topBar的padding-left减为0,lt-main的padding-left减为0;
$(".icon_menu").on("click",function(){

        $(".lt_aside").toggleClass("remove");

        $(".lt_topBar").toggleClass("remove");

        $(".lt_main").toggleClass("remove");
})

//3.点击退出按钮,弹出模态框,点击模态框里的退出,退出当前登录,发送ajax请求,根据后台返回数据,如果退出成功,返回登录页
// 只需一行 JavaScript 代码，即可通过元素的 id myModal 调用模态框：
// $('#myModal').modal(options)

$(".icon_logout").on("click",function(){

        $('#myModal').modal("show") ;

       
})

$("#logoutBtn").on("click",function(){
    
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            dataType:"json",
            success:function(info){

                if(info.success){
                    location.href="login.html";

                }

            }
        })
})




})