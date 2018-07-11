/**
 * Created by monaijie on 18/3/2.
 */
var vm = {
    //region 辅助函数
    sex: 0,
    old: '001',
    num :1,
    choose:false,
    userInfo: {
        name: '',
        gender: '',
        mobile_phone: '',
        birthday: ''
    },
    bool:true,
    //endregion 辅助函数


    //region 监听函数
    bindListeners: function () {
        var that = this;
        $(".RemarkCheck").click(function () {
            var that = vm;
             if(that.choose ==false){
               $('#choose').hide();
               $('#noChoose').show();
                 that.choose = true;
             }else if(that.choose ==true){
                 $('#choose').show();
                 $('#noChoose').hide();
                 that.choose = false;
             }
        });
        $(".sixman").click(function () {
            var that = vm;
            $(".sixman").removeClass("red");
            $(this).addClass("red");
            var a = $("input[name='gender']:checked").val();
            vm.userInfo.gender = a;
        });
        $('#t3_btn').click(function () {
            var that = vm;
            that.VerificationCheck()
                .then(function () {
                    return vm.getuserInfo();
                })
                .otherwise(function (msg) {
                    return vm.showTip(msg);
                });
        });
        //弹窗显示隐藏
        $("#receive").click(function () {
            $('#PolicyOfInsurance').show();
            //console.log('点击查看规则');
        });
        $("#openTheRule").click(function () {
            $('#modal_success').hide();
            $('#PolicyOfInsurance').show();
        });
        $(".closeTheWindow").click(function () {
            $('#PolicyOfInsurance').hide();
            // console.log('点击关闭规则');
        });
        $('#modal_tips').click(function () {
            vm.clearTip();
        });
        $('.modal_btn').click(function () {
            $('#modal_success').hide();
        });
    },
    //endregion 监听函数

    //region 校验函数
    VerificationCheck: function () {
        var deferred = Deferred();
        var that = vm;
        var moblie =$('#mobile').val();
        if (that.name_check($('#name').val()) == 1) {
            deferred.reject("请输入姓名");
        }else  if (that.name_check($('#name').val()) == 2) {
            deferred.reject("姓名只能为中文");
        } else if (moblie == "" || moblie == undefined || moblie == null) {
            deferred.reject("请输入手机号码");
        } else if (that.moblie_check($('#mobile').val()) == 2) {
            deferred.reject("请输入正确的手机号码");
        } else if ($('#start_date').val() == '') {
            deferred.reject("请选择出生日期");
        }else if (that.choose == false) {
            deferred.reject("请阅读并确认领取规则");
        }
        deferred.resolve();
        return deferred.promise;
    },
    //校验调用函数
    name_check: function (name) {
        var that = this;
        if (name == "" || name == undefined || name == null) {
            return 1;
        } else {
            //验证逻辑
            var patt1 = new RegExp("^[\u4e00-\u9fa5]{2,}$");//验证只能中文输入
            if (!patt1.test(name)) {
                return 2;
            } else {
                return 0;
            }
        }
        //console.log("CONTROLLER:name_check()验证名字只能中文输入");
    },
    moblie_check: function (moblie) {
        var deferred = Deferred();
        var that = this;
        if (moblie == "" || moblie == undefined || moblie == null) {
           return 1;
        } else {
            //验证逻辑
            var patt1 = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");//验证长度，第一位数必须是1
            if (!patt1.test(moblie)) {
                return 2;
            } else {
                return 0;
            }
        }
        //console.log("CONTROLLER:name_check()验证电话号码");
    },
    //endregion 校验函数


    //region 主要函数
    showTip: function (msg) {
        var deferred = Deferred();
        var that = this;
        $('#modal_tips').show();
        $('#modal_tips_content').text(msg);
        deferred.resolve();
        return deferred.promise;
    },
    clearTip: function () {
        var deferred = Deferred();
        var that = this;
        $('#modal_tips').hide();
        deferred.resolve();
        return deferred.promise;
    },
    getuserInfo: function () {
        var deferred = Deferred();
        var that = vm;
        var model = {
            name: $("#name").val(),
            mobile: $("#mobile").val(),
            gender: '',
            birthday: ''
        };
        //准备提交
        var remark = "";
        $('#remark').val($('#start_date').val());
        $('#birthday').val($('#start_date').val());
        $('.loading').show();
        var fil = ["name", "mobile", "birthday", "gender"];
        checkcommit(fil);
        // checkcommit(fil, function (result) {
        //     //console.log(result);
        //     $('.loading').hide();
        //     if (result == 200) {
        //         $('#modal_success').show();
        //     }
        // });
        // setTimeout("that.num = 1", 5000);
        deferred.resolve();
        return deferred.promise;
    },
    //endregion 主要函数


};

$(document).ready(function () {
    vm.bindListeners();

});

//提交
function myFunction(result){
    $('.loading').hide();
    console.log(result)
    if(result == 200){
        $('#modal_success').show();
    }
}