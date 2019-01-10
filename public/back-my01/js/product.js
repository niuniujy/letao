$(function(){
    var currentPage=1;
    var pageSize=2;
    render ();
    
    function render(){
    
        $.ajax({
          // 需求1:一进入页面发送ajax,通过模板引擎动态渲染页面
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
    // 需求3:点击添加商品按钮,弹出模态框
    $("#addCategory").on("click",function(){
        $("#productModal").modal("show");

        // 需求4:在点击模态框的时候,发送ajax请求动态渲染下拉菜单
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlstr=template("menuTpl",info);
                $(".dropdown-menu").html(htmlstr);
            }
        })
    })

    // 需求5:点击下拉菜单,将值赋值给按钮,获取a标签上的id
    $(".dropdown-menu").on("click","a",function(){
        var txt=$(this).text();
        $(".dropdown_title").text(txt);

        var id=$(this).attr("data-id");
        $('[name="brandId"]').val(id);

        // 获取id之后,手动更改校验的状态,因为这个input的值是直接赋值的
        $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID",)
    })

    var picArr=[];//存放所有图片对象的数组

    // 需求6:点击上传图片,将三张图片显示在上面
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var picObj=data.result;//图片对象
          picArr.unshift(picObj);
          var picSrc=picObj.picAddr;//后台返回的路径
        
          $("#imgBox").prepend('<img src="'+picSrc+'" alt="" style="width:100px"></img>');//将图片添加到#imgbox的最前端

          if(picArr.length>3){
              picArr.pop();//从数组的最前面删除一个
              $("#imgBox img:last-of-type").remove();//将图片的最后一个删除
          }

        //   上传图片之后,手动更改校验的状态,因为图片的地址是直接赋值的
        $("#form").data('bootstrapValidator').updateStatus("picStatus", "VALID");



        }
  });

  //需求7:进行表单校验
  $("#form").bootstrapValidator({
    excluded: [ ],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message:"请选择二级分类"
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:"请输入商品名称"
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:"请输入商品描述"
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message:"请输入商品库存"
                },
                regexp:{
                    regexp: /^[1-9]\d*$/,
                    message: '商品库存开头必须是非0的数字'
                }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:"请输入商品尺码"
                },
                regexp:{
                    regexp: /^\d{2}-\d{2}$/,
                    message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                }
            }
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message:"请输入商品原价"
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:"请输入商品现价"
                }
            }
        },
        picStatus:{
            validators:{
                notEmpty:{
                    message:"请上传三张图片"
                }
            }
        },

      }
  })

  //需求8:校验成功之后,上传表单
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        var paramsStr=$("#form").serialize();
        console.log(picArr);
        paramsStr+="&picArr=" +JSON.stringify(picArr);
        //使用ajax提交逻辑
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
                    //重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $(".dropdown_title").text("请选择二级分类");
                    $("#imgBox img").remove();

                }

            }
            

             
        })
        
    });
})





