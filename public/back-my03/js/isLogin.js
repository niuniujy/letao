// 需求:在除了登录页和注册页的其他页面，都要做登录拦截
// 一进入页面发送ajax,根据后台返回的数据判断用户是否是登录状态,如果不是,返回到登录页
$.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    dataType:"json",
    success:function(info){
        // console.log(info);
        if(info.error===400){
            location.href="login.html";
        }else{
            console.log("该用户已登录");
        }

    }
})