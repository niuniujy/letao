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