// 需求1:做表单校验

// * 1. 进行表单校验配置
// *    校验要求:
// *        (1) 用户名不能为空, 长度为2-6位
// *        (2) 密码不能为空, 长度为6-12位
// * */
$(function(){

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message: '用户名不能为空',
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message: '密码不能为空',
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })

    // 需求2:表单校验成功,上传表单
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            // 表单序列化
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ) {
              console.log( info );
              if ( info.error === 1000 ) {
                
                $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                return;
              }
              if ( info.error === 1001 ) {
              
                $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                return;
              }
              if ( info.success ) {
                // 跳转到首页
                setTimeout(function(){

                    location.href = "index.html";
                },500)
                
              }
            }
          })
    });

    //需求3:点击重置按钮重置表单
    $("#resetBtn").on("click",function(){

        $("#form").data('bootstrapValidator').resetForm();
    })
})