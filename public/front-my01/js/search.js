$(function(){


    // 历史记录存储的假数据是:
    // var arr=["耐克","阿迪","老北京","匡威","特步","神马","彪马"];
    // var jsonStr=JSON.stringify(arr);
    // localStorage.setItem("history_list",jsonStr);
    // 需求1:历史记录渲染  (查询) 
    //1.获取历史记录存储
    function getHistory(){

        var jsonStr=localStorage.getItem("history_list")||'[]';
        var arr=JSON.parse(jsonStr);
        return arr;  
    }     
  
    //2.根据获取的数组,通过模板引擎渲染历史记录
    function render(){

        var arr=getHistory();
        var htmlstr=template("historyTpl",{arr:arr});
        $(".lt_history").html(htmlstr);
    }
    render();

 
    
    // 需求2:清空历史记录 removeItem
    $(".lt_history").on("click",".clearHistory",function(){
        mui.confirm("您确定要清空历史记录吗","温馨提示",["取消","确认"],function(e){
            if(e.index==1){

                localStorage.removeItem( "history_list" );
                
                render();
            }
        })
         

    })
    // 需求3: 删除单个
    //1.给删除按钮,注册点击事件
    $(".lt_history").on("click",".btn_delete",function(){
     
        //2.获取删除那一项的下标
        var index=$(this).attr("data-index");
        //3.获取历史存储,删除数组中的某一项
        var arr=getHistory();

        arr.splice(index,1);

        //4.将数组转成json字符串,存储到本地
        var jsonStr=JSON.stringify(arr);

        localStorage.setItem("history_list",jsonStr);
        //5.重新渲染
        render();
        


    })

    // 需求4:添加单个历史记录功能
    //1.给搜索按钮,注册点击事件
    $("#search").on("click",function(){
        var val=$(".search_input").val().trim();
        if(val==""){
            mui.toast("请输入搜索内容");
            return;
        }
       //2.获取本地存储

        var arr=getHistory();

        //3.如果有重复项,先把重复项删掉
        // 数组的下标
  
        var index = arr.indexOf(val);
        if(index != -1 ) {
            arr.splice(index,1);
        }

        //4. 当内容达到10条,删除最后一个
        if(arr.length>=10){
            arr.pop();
        }
        //5.将搜索的内容添加到数组的最前面
        arr.unshift(val);
        //6.将数组转成json字符串,储存到本地
        localStorage.setItem("history_list",JSON.stringify(arr));
      
         //7.重新渲染
         render();

         //8.清空input
         $(".search_input").val("");
        
    })

    


  
})