

$(function(){
// 需求1:一进入页面发送ajax请求,通过模板引擎渲染页面
   
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
     
             //  2.在请求拿到数据之后,初始化分页插件
             $("#paginator").bootstrapPaginator({
                 bootstrapMajorVersion:3,
                 currentPage:info.page,//当前页
                 totalPages:Math.ceil(info.total/info.size),//总页数
                  
                 onPageClicked:function(a, b, c,page){
                   //为按钮绑定点击事件 page:当前点击的按钮值

                      currentPage=page; //当前页为点击的那一页
                      render();//重新渲染页面
                 }
               
             })
     
            }
        })
    }

    // 需求3:点击按钮,弹出模态框,点击模态框里的确定按钮,根据按钮的类名更改状态
    var userId;
    var isDelete;
    $("tbody").on("click","button",function(){
        $("#userModal").modal("show");
        userId=$(this).parent().data("id");
        isDelete=$(this).hasClass("btn-danger") ? 0 : 1;
  
    })

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
             
               if(info.success){
                   //1.关闭模态框
                   $("#userModal").modal("hide");


                   //2.重新渲染当前页
                   render();
               }
            }

        })
    })
})