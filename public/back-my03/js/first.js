// 需求1:一进入页面发送ajax请求,通过模板引擎动态渲染页面


$(function(){
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
              
                var htmlstr=template("firstTpl",info);
                $("tbody").html(htmlstr);

                // 需求2:根据后台返回的数据,设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage=page;
                      render();
                    }
                  });
                  
    
            }
        })
    }

    // 需求3:点击添加分类按钮,弹出模态框
    $("#addCategory").on("click",function(){
        $("#firstModal").modal("show");
    })

    //需求4,给input框做表单校验
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName:{
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                      },
                }
            }
        }
    })

    //需求5:校验成功后发送ajax请求提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
               
                if(info.success){
                    $("#firstModal").modal("hide");
                    currentPage=1;
                    render();
                }

            }
        })
    });
})