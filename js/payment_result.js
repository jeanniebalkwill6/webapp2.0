"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,i,s,r,t){function n(){t.dao.upcfAddrStatus({orderId:o,status:"1"},function(i){window.location.href="my_account.html",e("#confirm_address_mask").addClass("hide")})}var a=null,o=null;console.log("payment_result.js"),t.initLoginStatus(function(e){e||(window.location.href="../../../login.html")}),e("#currency_group").hide();var d=t.util.getQueryString("result"),l=t.util.getQueryString("failCode");if(!d){d=1==t.util.getQueryString("code")?0:1}if(1==d)e("#third_strp").addClass("active"),e("#step_progress").css("width","600px"),e("#success_wrap").show(),e("#fail_wrap").hide(),o=t.util.getQueryString("odi"),o||(o=t.util.getQueryString("orderId")),e("#success_order_id").html(o),function(i){t.dao.getOrderDetail({orderId:i},function(i){if("0"==i.cfaddrStatus)if(e("#success_confirm_address_wrap").removeClass("hide"),a=i.shippingAddr){var s=a.recFirstname+a.recLastname,r=a.telephone,t=a.streetAddr+" "+a.extendAddr+" "+a.city+", "+a.province+" "+a.postCode+", "+a.fullCountry;e("#order_detail_name").html(s),e("#order_mobile_name").html(r),e("#order_address_name").html(t)}else e("#success_confirm_address_wrap").addClass("hide");else e("#success_confirm_address_wrap").addClass("hide")})}(o),function(){e("#to_confirm_btn").click(function(){e("#confirm_address_mask").removeClass("hide")}),e("#confirm_btn").click(function(){n()}),e("#customservice_btn").click(function(){e("#confirm_address_mask").addClass("hide"),t.util.getUserId()?window.location.href="../../../my_message.html?index=2":window.location.href="../../../login.html"}),e("#confirm_address_close_btn").click(function(){e("#confirm_address_mask").addClass("hide")})}();else if("EC1004"==l){e("#success_wrap").hide(),e("#fail_wrap").show(),e(".fail-reason").hide();var c=t.util.getQueryString("failMsg");"MOFF_ENABLED"==c?e("#fail_msg").html(e.i18n.map.FailReason4):"MOFF_DISALBED"==c&&e("#fail_msg").html(e.i18n.map.FailReason5),e("#fail_msg_wrap").show(),e(".fail-message").css("text-align","left"),e("#payment_btn").click(function(){window.history.go(-1)})}else if("EC1005"==l||"EC1006"==l){e("#success_wrap").hide(),e("#fail_wrap").show(),e(".fail-reason").hide();var u=decodeURI(t.util.getQueryString("failMsg"));e("#fail_msg").html(u),e("#fail_msg_wrap").show(),e("#payment_btn").click(function(){window.history.go(-1)})}else e("#success_wrap").hide(),e("#fail_wrap").show(),o=t.util.getQueryString("odi"),e("#payment_btn").click(function(){window.location.href="checkout_payment.html?orderId="+o})});