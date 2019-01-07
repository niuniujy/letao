$(function(){

    // 需求1:一进入页面发送ajax请求,通过模板引擎动态渲染页面

    var currentPage=1;
    var pageSize=5;
    render ();
    function render(){

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
                // 需求2:根据后台返回的数据设置分页
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

    // 需求3:点击添加分类按钮,展示模态框
    $("#addCategory").on("click",function(){
        $("#secondModal").modal("show");

        // 需求4:在展示模态框的时候发送ajax请求,动态的渲染下拉菜单
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
                 
                var htmlstr=template("firstTpl",info);
                $(".dropdown-menu").html(htmlstr);

            }
        })

    })

    // 需求5:点击下拉菜单的某一项,将文本赋值给按钮
    $(".dropdown-menu").on("click","a",function(){
        var txt=$(this).text();
        $(".dropdown_title").text(txt);
    })

    // 需求6:点击上传图片,发送ajax请求给后台,后台返回路径,将路径赋值给img的src
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
           var src=data.result.picAddr;
           $("#fileImg").attr("src",src);
        }
  });

})
