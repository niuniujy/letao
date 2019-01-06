$(function(){
    // 需求1:一进入页面发送ajax请求,通过模板引擎进行页面渲染
   var currentPage=1;
   var pageSize=5;
   render();
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
             console.log(info);
             var htmlstr=template("secondTpl",info);
             $("tbody").html(htmlstr);

            //  根据ajax请求返回来的数据,进行分页
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
//    需求2:点击添加分类按钮,展示模态框
//    需求3:在点击添加分类按钮的时候,发送ajax请求,通过模板引擎渲染下拉菜单,获取一级分类的数据
   $("#addCategory").on("click",function(){
       $("#secondModal").modal("show");

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

//    需求4:点击获取下拉菜单的文本赋值给按钮
    $(".dropdown-menu").on("click","a",function(){
        var txt=$(this).text();

        $(".dropdown_title").text(txt);
    })

    //需求5:点击上传图片,发送ajax请求,获取后台返回的路径,设置给图片的src
    
        $("#fileupload").fileupload({
            dataType:"json",
            //e：事件对象
            //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
            done:function (e, data) {
               var src=data.result.picAddr;
               $(".fileImg").attr("src",src);
            }
      });
   



})
