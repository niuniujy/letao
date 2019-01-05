// 需求:表单校验
// 校验要求:
//    *        (1) 用户名不能为空, 长度为2-6位
//    *        (2) 密码不能为空, 长度为6-12位

$(function(){

    $("#form").bootstrapValidator({

        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空",
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message: '用户名长度必须在2到6之间',

                    },
                    callback:{
                        message:"用户名不存在",
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空",
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须在6-12之间",
                    },
                    callback:{
                        message:"密码不存在",
                    }
                }
            }
    
        }
    })


// 需求2:当表单校验成功时，会触发success.form.bv事件，此时会提交表单，
// 这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
$("#form").on("success.form.bv",function(e){
    e.preventDefault();

    // 发送ajax请求
    $.ajax({
        url:"/employee/employeeLogin",
        type:"post",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.error=="1000"){
            //   field:校验字段
            // validator:校验规则
            // updateStatus(field*, status*, validator)
            // NOT_VALIDATED, VALIDATING, INVALID or VALID
            $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
          }else if(info.error=="1001"){
            $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
          }else{
              setTimeout(function(){

                  location.href="index.html";
              },500)
          }
        }
    })
})

//   需求3:点击重置,表单的小图标和内容全部重置,因为reset已经重置了内容,所以这里只需要重置图标即可
// $(form).data('bootstrapValidator').resetForm();

    $(".resetBtn").on("click",function(){
        $("#form").data("bootstrapValidator").resetForm();
    })

})