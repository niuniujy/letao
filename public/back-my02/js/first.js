$(function(){
  //需求1:一进入页面发送ajax,通过模板引擎动态渲染页面
  var currentPage=1;
  var pageSize=5;
  render ();
  function render(){

      $.ajax({
          url:"/category/queryTopCategoryPaging",
          type:"get",
          data:{
              page:currentPage,
              pageSize:pageSize,
          },
          dataType:"json",
          success:function(info){
            console.log(info);
            var htmlstr=template("firstTpl",info);

            $("tbody").html(htmlstr);

            // 需求2:通过返回的数据,做分页
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

//   需求3:点击添加分类按钮,展示模态框
   $("#addCategory").on("click",function(){
       $("#addModal").modal("show");
   })

//    需求4:做input表单校验
$('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 校验字段, 一定要先配置 input 的 name
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  $("#form").on('success.form.bv', function (e) {
     e.preventDefault();
     $.ajax({
         url:"/category/addTopCategory",
         type:"post",
         data:$("#form").serialize(),
         dataType:"json",
         success:function(info){
            if(info.success){
                $("#addModal").modal("hide");
                currentPage=1;
                render();
            }
         }

     })
    
});

})