$(function(){
   // 需求:一进入页面就发送ajax,获取数据通过模板引擎渲染

   var currentPage=1;
   var pageSize=5;
   render();
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
              //2.根据返回的数据做分页
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

//    需求2:点击添加分类按钮,模态框显示
    $("#addCategory").on("click",function(){
        $("#firstModal").modal("show");
    })

    // 需求3:给模态框里的input进行表单校验,校验成功后发送ajax请求给后台,将一级分类添加进去
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空",
                 
                    }
                }
            }

        }
    })

    // 当表单校验成功时，会触发success.form.bv事件，此时会提交表单，
    // 这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
    $("#form").on('success.form.bv', function (e) {

        e.preventDefault();
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
              

                if(info.success){
                    // 关闭模态框
                    $("#firstModal").modal("hide");

                    //重新渲染页面
                    currentPage=1;
                    render();

                    //重置表单内容
                    $("#form").data('bootstrapValidator').resetForm(true);

                }

            }

        })
    })

})


