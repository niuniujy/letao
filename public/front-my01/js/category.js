$(function(){

    // 需求1:一进入页面发送ajax通过模板引擎动态渲染左侧,一级分类渲染
    var id;
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlstr=template("firstTpl",info);
            $(".fristCategory").html(htmlstr);

            // 一级分类渲染出来后立即渲染二级分类的第一项
            id=info.rows[0].id;
            render();

        }
    })

    function render(){

        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlstr=template("secondTpl",info);
                $(".secondCategory").html(htmlstr);

            }
        })
    }

    //需求2:点击一级分类,这个分类加上current类,根据一级分类的id动态的渲染二级分类
    $(".fristCategory").on("click","a",function(){
        $(".fristCategory a").removeClass("current");
        $(this).addClass("current");
        
        id=$(this).attr("data-id");
        render();
    })

})
