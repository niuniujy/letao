// 需求:在除了登录和注册页面,其他页面都要做登录拦截,进入页面直接发送ajax,根据后台返回的数据,
     //如果用户不是登录状态,返回到登录页面

     $.ajax({
         url:"/employee/checkRootLogin",
         type:"get",
         dataType:"json",
         success:function(info){
            // console.log(info);
            if(info.error=="400"){
                location.href="login.html";
            }else{
                console.log("该用户已登录");
            }
         }
     })
