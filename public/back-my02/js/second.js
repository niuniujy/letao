$(function(){
    // 需求:一进入页面发送ajax,通过模板引擎动态渲染页面
    var currentPage=1;
    var pageSize=5;
    render();
    function render (){

        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize,
    
            },
            dataType:"json",
            success:function(info){
            
              var htmlstr=template("secondTpl",info);

              $("tbody").html(htmlstr);

            // 需求2:根据返回的数据进行分页
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
    // 需求3:点击添加分类按钮,展示模态框
    $("#addCategory").on("click",function(){
        $("#secondModal").modal("show");

        // 需求4:在点击添加按钮的时候,发送ajax请求动态渲染下拉菜单
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100,

            },
            dataType:"json",
            success:function(info){
              console.log(info);
              var htmlstr=template("firstTpl",info);

              $(".dropdown-menu").html(htmlstr);

            }
        })
    })

    //需求5:点击下拉菜单中的某一项,将按钮的文本同步更改
    $(".dropdown-menu").on("click","a",function(){
         var txt=$(this).text();
         $(".dropdown_title").text(txt);

        //  获取a标签上保存的id,赋值给隐藏域的value值
        var id=$(this).attr("data-id");
        $('[name="categoryId"]').val(id);

        //选择下拉菜单之后更改校验的状态
        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID");

    })

    //需求6:点击上传图片,发送ajax请求,将后台返回的路径设置给img的src
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          var src=data.result.picAddr;
          $("#fileImg").attr("src",src);
          //将图片的地址赋值给隐藏域
            $('[name="brandLogo"]').val(src);

            // 图片显示之后更改校验的状态
            $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
        }
  });   
//   需求7:表单校验
$("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        categoryId:{
            validators:{
                notEmpty: {
                    message: '请选择一级分类'
                },
            }
        },
        brandName:{
            validators:{
                notEmpty: {
                    message: '请输入二级分类名称'
                },
            }
        },
        brandLogo:{
            validators:{
                notEmpty: {
                    message: '请上传图片'
                },
            }
        }
    }
})
// 需求8:提交表单,阻止submit的默认行为,通过ajax提交
$("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
           
            if(info.success){
                $("#secondModal").modal("hide");
                currentPage=1;
                render();

                //重置表单
                $("#form").data('bootstrapValidator').resetForm(true);
                $(".dropdown_title").text("请选择一级分类");
                $("#fileImg").attr("src","./images/none.png");
            }

        }
    })
});
    
  

    
 
})