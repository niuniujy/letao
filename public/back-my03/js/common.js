// 公共的功能1:一进入页面就执行进度条,
// 进度条在所有ajax请求开始的时候开始,在所有ajax结束的时候结束
$(document).ajaxStart(function(){
        //开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){
        //关闭进度条
    setTimeout(function(){

        NProgress.done();
    })
},200)

// 公共的功能
// 需求2:点击左侧的分类管理按钮,切换二级分类的显示和影藏
$(".category").on("click",function(){
    $(this).next().stop().slideToggle();
})

//需求3:点击菜单按钮,左侧的往左移动180,上边的topBar向左移动180,整体的main向左移动180
$(".topbar_Menu").on("click",function(){
    $(".lt_aside").toggleClass("remove");
    $(".lt_main").toggleClass("remove");
    $(".lt_topbar").toggleClass("remove");
})

// 需求4:点击退出按钮,弹出模态框
        //  点击确定按钮,发送ajax请求退出当前登录,返回登录页
$(".loginOut").on("click",function(){
    $("#myModal").modal("show");
})

$("#logoutBtn").on("click",function(){
    $.ajax({
        url:"/employee/employeeLogout",
        type:"get",
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){
                location.href="login.html";
            }

        }
    })
})