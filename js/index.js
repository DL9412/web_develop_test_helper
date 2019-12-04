
$(function(){
    layui.use(['layer', 'form','slider'], function(){
        var slider = layui.slider;
        var pwlen = 8
        slider.render({
            elem: '#pwdslider',
            // range: true,
            input: true,
            value: pwlen,
            max: 30,
            showstep: true,
            change: function(v){
                pwlen = v;
            }
        });
        if(!localStorage.account) localStorage.account = '[]';
        if(!localStorage.pwd) localStorage.pwd = '{}';
        if(!localStorage.note) localStorage.note = '{}';
        $('#createpwbtn').click(function(){
            var upper  = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
                lower  = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'],
                number = [1,2,3,4,5,6,7,8,9,0],
                symbol = ['~','!','@','#','$','%','^','&','*','(',')','-','_','+','='],
                mainarr = [];
            if($('#upper')[0].checked) mainarr = [...mainarr,...upper];
            if($('#lower')[0].checked) mainarr = [...mainarr,...lower];
            if($('#number')[0].checked) mainarr = [...mainarr,...number];
            if($('#symbol')[0].checked) mainarr = [...mainarr,...symbol];
            var str = ''
            for(var i=0;i<pwlen;i++){
                var rd = Math.floor(Math.random()*mainarr.length)
                str += mainarr[rd];
            }
            $('#pwd').val(str)
        })
        $('#addacc').click(function(){
            var arr = JSON.parse(localStorage.account);
            arr.push($('#inputacc').val());
            localStorage.account = JSON.stringify(arr);
            $('#inputacc').val('')
            getacc();
        })
        $(document).on('click','.cpybtn',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            copyToClipboard(txt);
        })
        $(document).on('click','.delbtn',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            var arr = JSON.parse(localStorage.account)
            var s = new Set(arr);
            s.delete(txt);
            arr = [...s];
            localStorage.account = JSON.stringify(arr);
            var p = JSON.parse(localStorage.pwd);
            if(p.hasOwnProperty(txt)){
                delete p[txt];
                localStorage.pwd = JSON.stringify(p);
            }
            var n = JSON.parse(localStorage.note);
            if(n.hasOwnProperty(txt)){
                delete n[txt];
                localStorage.pwd = JSON.stringify(n);
            }
            getacc();
        })
        $(document).on('click','.pwbtn',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            var o = JSON.parse(localStorage.pwd);
            if(!o[txt]) o[txt]='';
            var v = o[txt];
            $(this).parents('.line').find('.pwdinput').val(v);
            $(this).parents('.line').find('.pwdline').toggleClass('show');
        })
        $(document).on('input','.pwdinput',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            var o = JSON.parse(localStorage.pwd);
            o[txt] = $(this).val();
            localStorage.pwd = JSON.stringify(o);
        })
        $(document).on('click','.notebtn',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            var o = JSON.parse(localStorage.note);
            if(!o[txt]) o[txt]='';
            var v = o[txt];
            $(this).parents('.line').find('.noteinput').val(v);
            $(this).parents('.line').find('.noteline').toggleClass('show');
        })
        $(document).on('input','.noteinput',function(){
            var txt = $(this).parents('.line').find('.accinput').val();
            var o = JSON.parse(localStorage.note);
            o[txt] = $(this).val();
            localStorage.note = JSON.stringify(o);
        })
        $(document).on('click','.cpyprev',function(){
            var txt = $(this).prev().val();
            copyToClipboard(txt);
        })
        getacc()
    });
})

function getacc(){
    var acc = JSON.parse(localStorage.account)
    $('.accbox').html('');
    acc.forEach(i => {
        var str = `<div class="line accsaverline">
            <div class="accline">
                <input type="text" class="layui-input accinput" disabled value=`+i+`>
                <div class="btnbox">  
                    <button type="button" class="layui-btn cpybtn" title="copy">C</button>
                    <button type="button" class="layui-btn pwbtn" title="password">P</button>
                    <button type="button" class="layui-btn notebtn" title="note">N</button>
                    <button type="button" class="layui-btn delbtn" title="delete">D</button>
                </div>
            </div>
            <div class="pwdline">
                <input type="text" class="layui-input pwdinput btnnext">
                <button type="button" class="layui-btn cpyprev" title="copy">copy</button>
            </div>
            <div class="noteline">
                <input type="text" class="layui-input noteinput btnnext">
                <button type="button" class="layui-btn cpyprev" title="copy">copy</button>
            </div>
        </div>`
        $('.accbox').append(str);
    })
}

function copyToClipboard(s){
    if(window.clipboardData){
        window.clipboardData.setData('text',s);
    }else{
        (function(s){
            document.oncopy=function(e){
                e.clipboardData.setData('text',s);
                e.preventDefault();
                document.oncopy=null;
            }
        })(s);
        document.execCommand('Copy');
    }
}