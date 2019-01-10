$(function(){
    // 需求1:一进入页面发送ajax请求,通过模板引擎动态渲染页面

    var currentPage=1;
    var pageSize=2;
    var picArr=[];  //存放图片对象的数组

    render ();
    function render (){
        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
               
                var htmlstr=template("productTpl",info);
                $("tbody").html(htmlstr);

                //需求2:根据后台返回的数据设置分页
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

    // 需求3:点击添加商品按钮,展示模态框
    $("#addCategory").on("click",function(){
        $("#productModal").modal("show");

        // 需求4:在点击按钮的时候动态渲染下拉菜单
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
        
                var htmlstr=template("menuTpl",info);
                $(".dropdown-menu").html(htmlstr);

            }
        })
    })

    // 需求5:点击下拉菜单的a,将值赋值给按钮,同时将保存的id,赋值给隐藏域
 
    $(".dropdown-menu").on("click","a",function(){
        var txt=$(this).text();
        $(".category_title").text(txt);

        var id=$(this).attr("data-id");
        $('[name="brandId"]').val(id);

        // 选择下拉菜单之后更改校验的状态
        $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID ");


    })

    //需求6:上传图片,发送ajax请求,后台返回路径,显示3张图片,

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
          var picObj=data.result;//获取图片对象
          picArr.unshift( picObj );
          console.log(picArr);
          
          var picSrc=picObj.picAddr;//获取图片路径
          $("#imgBox").prepend('<img src="'+picSrc+'" alt="" width="100px" >');//将图片放在前面

          if(picArr.length > 3 ){
              picArr.pop();
              $("#imgBox img:last-of-type").remove();
          }
    
          if(picArr.length===3){
           //   上传图片之后更改图片的校验状态
              // $("#form").data('bootstrapValidator').updateStatus("picStatus", "VALID ");
              $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
          }

        }
  });
//   需求7:表单校验
$('#form').bootstrapValidator({
    // 配置不校验的类型, 对 hidden 需要进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 商品库存格式, 必须是非零开头的数字
          // 需要添加正则校验
          // 正则校验
          // 1,  11,  111,  1111, .....
          /*
          *   \d 表示数字 0-9
          *   +     表示出现1次或多次
          *   ?     表示出现0次或1次
          *   *     表示出现0次或多次
          *   {n}   表示出现 n 次
          *   {n,m} 表示出现 n 到 m 次
          * */
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 要求: 必须是 xx-xx 的格式, xx为两位的数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });

// 需求8:表单校验成功之后,提交表单

 
$("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var paramsStr = $('#form').serialize();
    // 还要拼接上图片的数据
    // paramsStr += "&key=value";
    paramsStr += "&picArr=" + JSON.stringify( picArr );

  alert(1)
    $.ajax({
        url:"/product/addProduct",
        type:"post",
        data:paramsStr,
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){
              $("#productModal").modal("hide");
              currentPage=1;
              render();
            }

        }

    })
});
 
})
