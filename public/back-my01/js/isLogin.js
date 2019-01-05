// 需求:做登录拦截,发送ajax请求,根据后台返回的数据判断是否是登录状态,如果不是返回到登录页面
// 这个需求在除了登录和注册的页面,其他的页面都需要
$.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    dataType:"json",
    success:function(info){
        console.log(info);
      if(info.error=="400"){
          location.href="login.html";
      }else if(info.success){
          console.log("该用户已登录");
      }
    }
})