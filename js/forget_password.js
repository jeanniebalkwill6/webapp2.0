"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(s,e,a,r,i){function d(e,a){return!s(e).hasClass("has-error")&&""!==s(e).val()||(s(this).removeClass("has-success"),s(this).addClass("has-error"),s(a).show(),!1)}function o(){i.dao.mdpwd({userId:"",email:s("#email_input").val(),oldPwd:"",newPwd:s("#pwd_input").val(),checkCode:s("#vaild_code_input").val()},function(e){s("#modify_pwd_success_message").removeClass("alert-danger"),s("#modify_pwd_success_message").addClass("alert-success"),s("#modify_pwd_success_message").html(s.i18n.map.ModifyPwdSuccess),s("#modify_pwd_success_message").show()},function(e){s("#modify_pwd_success_message").removeClass("alert-success"),s("#modify_pwd_success_message").addClass("alert-danger"),s("#modify_pwd_success_message").html(e.msg),s("#modify_pwd_success_message").show()})}console.log("forget_password.js"),i.initLoginStatus();var _="0";!function(){s("#email_input").blur(function(){var e=i.util.checkEmail(s(this).val());console.log(e),0==e?(s(this).parent().removeClass("has-success"),s(this).parent().addClass("has-error"),s("#error_email").show()):-1==e?(s(this).parent().removeClass("has-success"),s(this).parent().addClass("has-error"),s("#error_email").show()):1==e&&(s(this).parent().removeClass("has-error"),s(this).parent().addClass("has-success"),s("#error_email").hide())}),s("#vaild_code_input").blur(function(){var e=i.util.checkNull(s(this).val());console.log(e),0==e?(s(this).parent().removeClass("has-success"),s(this).parent().addClass("has-error"),s("#error_vaild_code").show()):1==e&&(s(this).parent().removeClass("has-error"),s(this).parent().addClass("has-success"),s("#error_vaild_code").hide())}),s("#pwd_input, #confirm_pwd_input").blur(function(){var e=i.util.checkPassword(s(this).val());console.log(e),0==e?(s(this).parent().removeClass("has-success"),s(this).parent().addClass("has-error"),"pwd_input"==s(this)[0].id?s("#register_error_pwd").show():"confirm_pwd_input"==s(this)[0].id&&s("#register_error_confirm_pwd").show()):-1==e?(s(this).parent().removeClass("has-success"),s(this).parent().addClass("has-error"),"pwd_input"==s(this)[0].id?s("#register_error_pwd").show():"confirm_pwd_input"==s(this)[0].id&&s("#register_error_confirm_pwd").show()):1==e&&(s(this).parent().removeClass("has-error"),s(this).parent().addClass("has-success"),"pwd_input"==s(this)[0].id?s("#register_error_pwd").hide():"confirm_pwd_input"==s(this)[0].id&&s("#register_error_confirm_pwd").hide())})}(),function(){s("#send_btn").click(function(){s(".loading-mask").removeClass("hide"),s("#send_btn").addClass("disable"),"1"!=_&&(_="1",d("#email_input","#error_email")&&i.dao.sendValidCode({email:s("#email_input").val()},function(e){s("#modify_pwd_success_message").removeClass("alert-danger"),s("#modify_pwd_success_message").addClass("alert-success"),s("#modify_pwd_success_message").html(s.i18n.map.ValidCodeHasSent),s("#modify_pwd_success_message").show()},function(e){s("#modify_pwd_success_message").removeClass("alert-success"),s("#modify_pwd_success_message").addClass("alert-danger"),s("#modify_pwd_success_message").html(e.msg),s("#modify_pwd_success_message").show(),s("#send_btn").removeClass("disable"),_="0"},function(){s(".loading-mask").addClass("hide")}))}),s("#set_btn").click(function(){var e=d("#vaild_code_input","#error_vaild_code");e=e&&d("#pwd_input","#register_error_pwd"),e=e&&d("#confirm_pwd_input","#register_error_confirm_pwd"),s("#pwd_input").val()!==s("#confirm_pwd_input").val()&&(e=!1,s("#modify_pwd_success_message").removeClass("alert-success"),s("#modify_pwd_success_message").addClass("alert-danger"),s("#modify_pwd_success_message").html(s.i18n.map.PasswordNotMatch),s("#modify_pwd_success_message").show()),e&&o()})}()});