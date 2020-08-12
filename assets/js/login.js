$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 获取layui 对象
    var form = layui.form;
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repassword: function (value) {
            var password = $(".reg-box .password").val();
            if (password !== value) {
                return '两次密码不一致！'
            }
        }
    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg .username").val(),
            password: $("#form_reg .password").val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
                // return alert(res.message)
            }
            layer.msg('注册成功，请登录！')
        })
    })
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})