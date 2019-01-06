
$(function(){

// 需求1:一进入页面发送ajax,通过模板引擎动态渲染页面

var currentPage=1;
var pageSize=5;
render();
function render(){
    
    $.ajax({
        url:"/user/queryUser",
        type:"get",
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        dataType:"json",
        success:function(info){
         
          var htmlstr=template("userTpl",info);
          $("tbody").html(htmlstr);
        //   需求2:根据请求返回的数据添加分页
           $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion:3,
              currentPage:info.page,//当前页
              totalPages:Math.ceil(info.total/info.size),//总页数
              onPageClicked:function(a, b, c,page){
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage=page;
                render();
    
              }
            
            
           })
        }
    })
}
var userId;
var isDelete;
// 需求3:点击启用禁用按钮,弹出模态框
$("tbody").on("click","button",function(){
    $("#userModal").modal("show");
    userId=$(this).parent().attr("data-id");
    isDelete=$(this).hasClass("btn-danger") ? 0 :1 ;

})
 // 需求4:点击sureBtn,发送ajax请求,更改状态
   $("#sureBtn").on("click",function(){
       $.ajax({
           url:"/user/updateUser",
           type:"post",
           data:{
               id:userId,
               isDelete:isDelete,
           },
           dataType:"json",
           success:function(info){
           
            //关闭模态框
            $("#userModal").modal("hide");
            //重新渲染页面
            render();



           }
       })
   })


})
