// 需求:在一打开页面执行
//ajax请求发送之前开始进度条
//ajax请求结束之后结束进度条

$(document).ajaxStart(function(){
        //开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){

    setTimeout(function(){

        //关闭进度条
    NProgress.done();
    },200)
})




$(function(){
    // 公共的功能:
   // 需求1:点击categoryBtn按钮,二级菜单显示

   $('.lt_aside .categoryBtn').on('click',function(){
       
       $(this).next().stop().slideToggle();
   })

//    需求2:点击左侧的菜单按钮,左侧侧边栏向左侧移动,topbar向左侧移动,
   $(".icon_menu").on("click",function(){
       $(".lt_aside").toggleClass("remove");
       $(".lt_topBar").toggleClass("remove");
       $(".lt_main").toggleClass("remove");
        
   })
//    需求3:点击退出按钮,展示模态框
// $('#myModal').modal(options)

$(".icon_logout").on("click",function(){
    $("#myModal").modal("show");
     

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
