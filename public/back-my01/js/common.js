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
