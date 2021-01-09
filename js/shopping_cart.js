"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","bootstrapPaginator"],function(t,e,i,r,a,o){function s(){var e=t.i18n.map.FreeShippingTitle;e&&(e=e[0].replace("$price",sessionStorage.freeShippingAmount),t("#free_shipping_tab").html(e)),sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange?(t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide")):t("#recently_browser_tab").addClass("active")}function n(){a.dao.getCoupon({userId:a.util.getUserId(),currencyId:a.util.getLocalCurrency()},function(e){if(e){var i=[e];t("#coupon_list_wrap").html(t("#couponListTempl").tmpl(i)),t("#coupon_list_wrap #code_text").html(t.i18n.map.Code),sessionStorage.setItem("couponCode",e.cpId),t("#coupon_code_input").val(e.cpId)}})}function l(){J=!1;var e="";1==sessionStorage.applyCouponCode&&(e=a.util.getCouponCode());var i={};a.util.checkIsLogin()?i={currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),cart:[],applyCpNo:e}:localStorage.productList&&"[]"!==localStorage.productList?i={currencyId:a.util.getLocalCurrency(),userId:"",cart:JSON.parse(localStorage.productList),applyCpNo:e}:(i={currencyId:a.util.getLocalCurrency(),userId:"",cart:[],applyCpNo:e},t("#cart_cost_title").hide(),t("#cart_cost_wrap").hide()),a.dao.shoppingCart({inputParams:JSON.stringify(i)},function(e){t(".loading-mask").addClass("hide"),e.cart&&e.cart.length>0?(t("#cart_list").show(),e.amount&&e.amount>0?(t("#cart_cost_title").show(),t("#cart_cost_wrap").show()):(t("#cart_cost_title").hide(),t("#cart_cost_wrap").hide()),t("#empty_cart").hide(),c(e),d(e),$||($=!0,t.getJSON("/resources/json/country.json",function(t){}))):(t("#cart_cost_title").hide(),t("#cart_cost_wrap").hide(),t("#cart_list").hide(),t("#empty_cart").show(),t("#product_total_number").html(0),t("#cart_product_number").html("0"),t("#cart_product_number").show(),t("#mb_cart_product_number").html("0"),t("#mb_cart_product_number").show(),t("#markup_product_wrap").addClass("hide")),t(".main-wrap").hasClass("invisibility")&&(t(".main-wrap").removeClass("invisibility"),t(".loading-mask").addClass("hide"))},function(){t(".loading-mask").addClass("hide")})}function c(e){var i=0,r=a.util.getCurrencySymbol(a.util.getLocalCurrency()),o=a.util.getAdvSource().u;o||(o=a.util.getQueryString("u"));var s="";o&&(s="?u="+o);var n=a.util.encodeMenuType(a.util.getUvid());H=[],V=[];for(var l=0;l<e.cart.length;l++){var c=e.cart[l];if(c.displayImg=a.util.picUrl+c.displayImg,c.cost=a.util.formatProductPrice(c.cost,r),c.unitPrice=a.util.formatProductPrice(c.unitPrice,r),c.orgUnitPrice&&(c.orgUnitPrice=a.util.formatProductPrice(c.orgUnitPrice,r)),i+=Number(c.productNum),c.prdAttrFlg&&"2"==c.prdAttrFlg){var d=a.util.formatProductName(c.productName)+"-d-"+a.util.encodeMenuType(c.productId)+"-"+a.util.encodeMenuType(c.productColorId)+"-"+n+".html"+s;c.href=d,V.push(c)}else{var d=a.util.formatProductName(c.productName)+"-d-"+a.util.encodeMenuType(c.productId)+"-"+a.util.encodeMenuType(c.productColorId)+"-"+n+".html"+s;c.href=d,H.push(c)}if(c.subCarts&&c.subCarts.length>0)for(var u=0;u<c.subCarts.length;u++){var m=c.subCarts[u];m.attrDes&&m.attrDes.length>0?m.displayImg=a.util.picUrl+m.displayImg:(c.subCarts.splice(u,1),u-=1)}}t("#cart_list").html(t("#cartTempl").tmpl(H)),t("#cart_list #color_title").html(t.i18n.map.ColorTitle),t("#cart_list #remove_label").html(t.i18n.map.Remove),t("#product_total_number").html(i),i>0?(t("#cart_product_number").html(i),t("#cart_product_number").show(),t("#mb_cart_product_number").html(i),t("#mb_cart_product_number").show()):(t("#cart_product_number").html("0"),t("#cart_product_number").show(),t("#mb_cart_product_number").html("0"),t("#mb_cart_product_number").show());var _=3;sessionStorage.maxnum_allowed&&(_=Number(sessionStorage.maxnum_allowed)),i<=_&&t("#error_message").addClass("hide");for(var l=0;l<H.length;l++)H[l].productNum<=10?t("#qty_list_"+l+" option[value="+H[l].productNum+"]").attr("selected","selected"):(t("#qty_list_"+l).hide(),t("#qty_list_"+l).parent().find("input").show(),t("#qty_list_"+l).parent().find("input").val(H[l].productNum)),t("#"+l+" .remove-btn").each(function(){t(this).click(function(){console.log("del "+t(this).parent().parent().data().data+"item"),p(t(this).parent().parent().parent().parent().data().data,0,e)})});t("#cart_list .qty-content select option[value=11]").html(t.i18n.map.MoreNumber),t("#cart_list .qty-content select").change(function(){if("11"==t(this).val())t(this).hide(),t(this).parent().find("input").show();else{var i=t(this).find("option:selected").text();p(t(this).parent().parent().data().data,i,e)}}),t("#cart_list .qty-content input").blur(function(){var i=t(this).val();p(t(this).parent().parent().data().data,i,e)});for(var l=0;l<e.dis_info.length;l++){var g=e.dis_info[l];g.disAmount<0?g.disAmount="-"+a.util.formatProductPrice(-g.disAmount,r):g.disAmount="+"+a.util.formatProductPrice(g.disAmount,r),8==g.policyId&&(J=!0)}if(t("#dis_info_list").html(t("#disInfoTempl").tmpl(e.dis_info)),t("#shipping_cost_list").html(t("#shippingCostTempl").tmpl(e.dis_info)),sessionStorage.logistics_info?(t("#logistics_info").removeClass("hide"),t("#logistics_info").html(sessionStorage.logistics_info)):t("#logistics_info").addClass("hide"),J?(t("#apply_btn").text(t.i18n.map.Cancel),t("#apply_btn").css("background","#333")):(t("#apply_btn").text(t.i18n.map.Apply),t("#apply_btn").css("background","#00aa00")),e.reachFreeShipping&&1==e.reachFreeShipping)t("#free_tip").css("color","#fff"),t("#free_tip").html(e.freeShippingInfo);else{t("#free_tip").css("color","#fff");var h=t.i18n.map.FreeShippingTip;if(h&&(h=h.replace("$price","<span style='color: #ea5455;'>"+e.freeShippingInfo+"</span>"),h=h+"<span id='free_tip_add_more' class='free-tip-add-more'>"+t.i18n.map.AddFreeShipping+"</span>"),t("#free_tip").html(h),t("#free_tip_add_more").click(function(){t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide"),window.scrollTo(0,t("#free_shipping_tab").offset().top-150)}),sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange){var f=JSON.parse(sessionStorage.priceRange);f&&f.length>0&&t("#free_tip_add_more").css("display","inline-block")}else t("#free_tip_add_more").css("display","none")}t("#sub_total").html(a.util.formatProductPrice(e.amount,r)),t("#total").html(a.util.formatProductPrice(e.amountNoShipping,r)),t("#grand_total").html(a.util.formatProductPrice(e.realAmount,r)),e.cpPromptInfo&&t("#coupon_use_info").html(e.cpPromptInfo),z=e.realAmount,q=e.amountAllowed}function d(e){if(V&&V.length>0){t("#markup_product_wrap").removeClass("hide"),e.jgtitle&&("1"==e.reachjg?(t("#un_markup_tip").html(e.jgtitle),t("#un_markup_tip").removeClass("red"),t("#un_markup_tip").addClass("green")):(t("#un_markup_tip").html(e.jgtitle),t("#un_markup_tip").addClass("red"),t("#un_markup_tip").removeClass("green"))),t("#markup_product_list").html(t("#markupProductTempl").tmpl(V));for(var i=0;i<V.length;i++)V[i].productNum<=10?t("#markup_qty_list_"+i+" option[value="+V[i].productNum+"]").attr("selected","selected"):(t("#markup_qty_list_"+i).hide(),t("#markup_qty_list_"+i).parent().find("input").show(),t("#markup_qty_list_"+i).parent().find("input").val(V[i].productNum)),V[i].productNum>0?(t("#markup_product_list #markup_qty_list_"+i).prop("disabled",!1),t("#markup_product_list #"+i+" #add_btn i").addClass("selected")):(t("#markup_product_list #markup_qty_list_"+i).prop("disabled",!0),t("#markup_product_list #"+i+" #add_btn i").removeClass("selected")),"1"==V[i].supportVideo?t("#play_btn_"+i).removeClass("hide"):t("#play_btn_"+i).addClass("hide"),t("#markup_product_list #"+i+" #add_btn i").each(function(){t(this).click(function(){var r=t(this).parent().parent().parent().data().data;t(this).hasClass("selected")?(t(this).removeClass("selected"),t("#markup_product_list #markup_qty_list_"+i).prop("disabled",!0),p(r+H.length,0,e)):(t(this).addClass("selected"),t("#markup_product_list #markup_qty_list_"+i).prop("disabled",!1),E.productName=V[r].productName,E.productImage=V[r].displayImg,E.productId=V[r].productId,E.productColorId=V[r].productColorId,E.prdAttrFlg="2",k())})}),t("#markup_product_list .qty-content select option[value=11]").html(t.i18n.map.MoreNumber),t("#markup_product_list .qty-content select").change(function(){if("11"==t(this).val())t(this).hide(),t(this).parent().find("input").show();else{var i=t(this).find("option:selected").text();p(t(this).parent().parent().data().data+H.length,i,e)}}),t("#markup_product_list .qty-content input").blur(function(){var i=t(this).val();p(t(this).parent().parent().data().data+H.length,i,e)})}}function p(e,i,r){if(a.util.checkIsLogin()){var o=r.cart[e];o.productNum=Number(i),o.userId=a.util.getUserId(),t(".loading-mask").removeClass("hide"),a.dao.shoppingCartMt({inputParams:JSON.stringify([o])},function(t){l()})}else if(localStorage.productList){t(".loading-mask").removeClass("hide");var s=JSON.parse(localStorage.productList);if(0==Number(i))s.splice(e,1);else{var o=s[e];o.productNum=Number(i)}localStorage.setItem("productList",JSON.stringify(s)),l()}}function u(){var e=[];localStorage.currentBrowseList&&(e=JSON.parse(localStorage.currentBrowseList));var i={currencyId:a.util.getLocalCurrency(),products:e};a.dao.productsViewed({inputParams:JSON.stringify(i)},function(e){if(e&&e.length>0){e.length>10&&(e=e.slice(0,10));var i=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=a.util.getAdvSource().u;r||(r=a.util.getQueryString("u"));var o="";r&&(o="?u="+r);for(var s=a.util.encodeMenuType(a.util.getUvid()),n=0;n<e.length;n++){var l=e[n];if(l.orgPrice=a.util.formatProductPrice(l.orgPrice,i),l.curPrice=a.util.formatProductPrice(l.curPrice,i),l.imgDisplay=a.util.picUrl+l.imgDisplay,a.util.isMobile()){var c=460,d=a.util.getImageHeight(),p=(document.body.clientWidth-40)/5-10;l.height=parseInt(d*p/c)}else{var c=231,d=a.util.getImageHeight(),p=230;l.height=parseInt(d*p/c)}var u=a.util.formatProductName(l.productName)+"-d-"+a.util.encodeMenuType(l.productId)+"-"+a.util.encodeMenuType(l.productColorId)+"-"+s+".html"+o;l.href=u}t("#product_viewed_list_wrap").html(t("#productViewedListTempl").tmpl(e)),t("#recently_browse_wrap").find(".free-shpping-empty-data").addClass("hide")}else t("#recently_browse_wrap").find(".free-shpping-empty-data").removeClass("hide")})}function m(){if(sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange){var e=JSON.parse(sessionStorage.priceRange);e&&e.length>0&&(t("#price_zone_list").html(t("#priceZoneTempl").tmpl(e)),t(t("#price_zone_list").find("li")[Q]).addClass("current"),t("#price_zone_list li").each(function(){t(this).click(function(){Q=t(this)[0].id,t("#price_zone_list").find("li").removeClass("current"),t(this).addClass("current"),W.curPage=1,_(e[Q].from,e[Q].to)})}),t("#price_zone_list").find("li").removeClass("current"),t(t("#price_zone_list").find("li")[Q]).addClass("current"),_(e[Q].from,e[Q].to))}else t("#free_shipping_tab").addClass("hide"),t("#shipping_list_wrap").addClass("hide"),t("#recently_browse_wrap").removeClass("hide")}function _(e,i){t("#shipping_list_wrap .shipping-list-loading-data").removeClass("hide"),a.dao.productsByPriceRange({currencyId:a.util.getLocalCurrency(),currentPage:W.curPage,from:e,to:i},function(e){e.page&&(W.amount=e.page.amount,W.pageSize=e.page.pageSize);var i=e.products;if(i&&i.length>0){for(var r=a.util.getCurrencySymbol(a.util.getLocalCurrency()),o=0;o<i.length;o++){var s=i[o];if(s.original_price=a.util.formatProductPrice(s.original_price,r),s.current_price=a.util.formatProductPrice(s.current_price,r),s.img_display=a.util.picUrl+s.img_display,a.util.isMobile()){var n=460,l=a.util.getImageHeight(),c=(document.body.clientWidth-40)/5-10;s.height=parseInt(l*c/n)}else{var n=230,l=a.util.getImageHeight(),c=230;s.height=parseInt(l*c/n)}}t("#shipping_list").html(t("#shippingListTempl").tmpl(i)),t(".free-shipping-item").each(function(){t(this).click(function(){h(t(this)[0].id)})}),1==W.curPage&&g(),t("#shipping_list_wrap").find(".free-shpping-empty-data").addClass("hide"),t("#shipping_list_wrap").find("#page_wrap").removeClass("hide"),t("#shipping_list_wrap").find("#shipping_list").removeClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")}else t("#shipping_list_wrap").find(".free-shpping-empty-data").removeClass("hide"),t("#shipping_list_wrap").find("#page_wrap").addClass("hide"),t("#shipping_list_wrap").find("#shipping_list").addClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")},function(){t("#shipping_list_wrap").find(".free-shpping-empty-data").removeClass("hide"),t("#shipping_list_wrap").find("#page_wrap").addClass("hide"),t("#shipping_list_wrap").find("#shipping_list").addClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")})}function g(){var e=0;e=W.amount%W.pageSize==0?W.amount/W.pageSize:W.amount/W.pageSize+1,t(function(){var i={bootstrapMajorVersion:1,currentPage:W.curPage,numberOfPages:5,totalPages:e,shouldShowPage:!0,onPageClicked:function(e,r,a,o){W.curPage=o;var s=JSON.parse(sessionStorage.priceRange);_(s[Q].from,s[Q].to),i.currentPage=o,t("#page").bootstrapPaginator(i)}};t("#page").bootstrapPaginator(i)})}function h(e){a.dao.productDetail({productId:e,currencyId:a.util.getLocalCurrency()},function(e){if(e.product_id){E.productName=e.product_name,E.productId=e.product_id,E.prdAttrFlg="";for(var i=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=0;r<e.color_data.length;r++){var o=e.color_data[r];o.original_price=a.util.formatProductPrice(o.original_price,i),o.current_price=a.util.formatProductPrice(o.current_price,i),o.img_display=a.util.picUrl+o.img_display,o.color_img=a.util.picUrl+o.color_img,o.width=200,o.height=200;for(var s=0;s<o.img_groups.length;s++){var n=o.img_groups[s];n.small_img=a.util.picUrl+n.small_img,n.big_img=a.util.picUrl+n.big_img}}e.product_des?t(".description").html(e.product_des):t(".description").parent().parent().hide(),t("#name").html(e.color_data[U].pcName),t("#product_ext_name").html(e.color_data[U].pcNameExt),t("#current_price").html(e.color_data[U].current_price),t("#original_price").html(e.color_data[U].original_price),f(e.color_data),v(e.color_data[U].dyn_attrs),A(),T(e.color_data[U].img_groups),t("#product_detail_mask").removeClass("hide"),t("#product_detail_mask #close_btn").click(function(){t("#product_detail_mask").addClass("hide")})}})}function f(e){1==e.length?E.productColorId=e[0].color_id:(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(e)),t(t("#color_list li")[U]).find("span").css("display","block"),t(t("#color_list li")[U]).find("img").addClass("selected-image-border"),t("#color_desc").html(e[U].color_des),E.productColorId=e[U].color_id,t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var i=t(this).data().data;t("#color_desc").html(e[i].color_des),t("#name").html(e[i].pcName),t("#product_ext_name").html(e[i].pcNameExt),t("#current_price").html(e[i].current_price),t("#original_price").html(e[i].original_price),E.productColorId=e[i].color_id,T(e[i].img_groups)}}))}function v(e){B=!1,j=[],D=[],t("#customBtn").addClass("hide"),t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(e)),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint),t("#dyn_attrs_list option[value=11]").html(t.i18n.map.MoreNumber);for(var i=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=0;r<e.length;r++){var o=e[r];if(o.domain_list&&o.domain_list.length>0&&(t("#"+o.attr_name+"_content").html(o.domain_list[0]),o.selectedAttr=o.domain_list[0].optId,"Size"==o.attr_name)){t("#size_guide").html(t.i18n.map.SizeGuide);for(var s=0;s<o.domain_list.length;s++){var n=o.domain_list[s];n.attrType=o.attrID,D.push(n)}}o.input_cmp&&(j.push(o),B=!0,t("#customBtn").removeClass("hide")),"3"==o.attrID&&t("#print_number_price").html("+"+a.util.formatProductPrice(o.input_cmp.price,i)),"4"==o.attrID&&t("#print_name_price").html("+"+a.util.formatProductPrice(o.input_cmp.price,i))}b(),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):(t("#custom_"+t(this)[0].id+" option[value="+t(this).val()+"]").prop("selected","selected"),C())}),t("#dyn_attrs_list input").blur(function(){var e=t(this).val();if(e<=10){var i=t(this).parent().find("select")[0].id;t("#custom_"+i+" option[value="+e+"]").prop("selected","selected")}else{var i=t(this).parent().find("select")[0].id,r="#"+i;t(r).hide(),t(r).parent().find("input").show(),t(r).parent().find("input").val(e)}C()}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_btn").click(function(){t("#size_guide_mask").addClass("hide"),t("body").css("overflow","auto")})}function C(){R=I(),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl(R))}function b(){D&&D.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(D)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),C(),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),t("#"+t(this)[0].id.substring(t(this)[0].id.indexOf("_")+1)+" option[value="+t(this).val()+"]").prop("selected","selected"),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):C()}),t("#size_list input").blur(function(){var e=t(this).val();if(e<=10){var i=t(this).parent().find("select")[0].id;t("#"+i.substring(i.indexOf("_")+1)+" option[value="+e+"]").prop("selected","selected")}else{var i=t(this).parent().find("select")[0].id,r="#"+i.substring(i.indexOf("_")+1);t(r).hide(),t(r).parent().find("input").show(),t(r).parent().find("input").val(e)}C()})),x()}function y(){b(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function I(){for(var e=[],i=0;i<D.length;i++){var r=D[i],a=t("#"+r.optId+"_number_list").val();if("11"==a&&((a=t("#"+r.optId+"_number_list").parent().find("input").val())||(a=0)),r.number=a,Number(a)<=10?t("#custom_"+r.optId+"_number_list option[value="+a+"]").prop("selected","selected"):(t("#custom_"+r.optId+"_number_list").hide(),t("#custom_"+r.optId+"_number_list").parent().find("input").show(),t("#custom_"+r.optId+"_number_list").parent().find("input").val(a)),r.customs=[],a>0){for(var o=0;o<a;o++){for(var s=0;s<j.length;s++){j[s].position=o;var n=t("#print_input_"+r.optId+"_"+j[s].attrID+"_"+j[s].position).val();j[s].custominfo=n}r.customs.push(JSON.parse(JSON.stringify({attrs:j})))}e.push(r)}}return e}function w(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function k(){var t=null;null!=(t=B?O():L())&&0!=t.length&&(a.util.checkIsLogin()?S(t):N(t))}function S(e){t(".loading-mask").removeClass("hide"),a.dao.merge2cart({inputParams:JSON.stringify(e)},function(){l()},function(t){alert(t.msg)},function(e){t(".loading-mask").addClass("hide"),t("#product_detail_mask").addClass("hide")})}function N(e){t(".loading-mask").removeClass("hide");var i=localStorage.productList;if(i=i?JSON.parse(i):[],0==i.length)i=e;else for(var r=0;r<e.length;r++){for(var a=e[r],o=!1,s=JSON.stringify(a.attrOpts),n=0;n<i.length;n++){var c=i[n];c.productId==a.productId&&c.productColorId==a.productColorId&&s==JSON.stringify(c.attrOpts)&&(c.productNum=c.productNum+a.productNum,o=!0)}if(!o){i.push(a);for(var n=0;n<i.length;n++)"2"==i[n].prdAttrFlg&&(i.push(i[n]),i.splice(n,1))}}localStorage.productList=JSON.stringify(i);for(var d=0,n=0;n<i.length;n++)d=parseInt(d)+parseInt(i[n].productNum);t("#cart_product_number").html(d),t("#cart_product_number").show(),t("#mb_cart_product_number").html(d),t("#mb_cart_product_number").show(),t(".loading-mask").addClass("hide"),t("#product_detail_mask").addClass("hide"),l()}function P(t){for(var e=0;e<t.length;e++)for(var i=t[e],r=JSON.stringify(i.attrOpts),a=e+1;a<t.length;a++){var o=t[a];r==JSON.stringify(o.attrOpts)&&(i.productNum=i.productNum+o.productNum,t.splice(a,1),a-=1)}return t}function O(){var e=[],i={userId:a.util.getUserId(),productName:E.productName,productId:E.productId,productColorId:E.productColorId,productNum:1,prdAttrFlg:E.prdAttrFlg,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if(R&&R.length>0)for(var r=0;r<R.length;r++)for(var o=R[r],s=0;s<o.customs.length;s++){for(var n=[{attrType:o.attrType,attrOptId:o.optId}],l=o.customs[s].attrs,c=0;c<l.length;c++){var d=l[c],p=t("#print_input_"+o.optId+"_"+d.attrID+"_"+d.position).val();n.push({attrType:d.attrID,attrOptId:d.input_cmp.optId,custominfo:p})}i.attrOpts=n,e.push(JSON.parse(JSON.stringify(i)))}return console.log(e),P(e)}function L(){var t=[],e={userId:a.util.getUserId(),productName:E.productName,productImage:E.productImage,productId:E.productId,productColorId:E.productColorId,prdAttrFlg:E.prdAttrFlg,productNum:1,attrOpts:[],attrString:""};return e.attrString="",t.push(JSON.parse(JSON.stringify(e))),t}function x(){t("#custom_confirm_btn").unbind("click").click(function(){k()}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){w()})}function A(){t("#qty_list option[value='1']").prop("selected","selected");var e=t("#qty_list").find("option:selected").val();E.productNum=Number(e),t("#qty_list").on("change",function(){var e=t(this).find("option:selected").text();E.productNum=Number(e)})}function T(e){t("#small_image_list").length>0&&t("#small_image_list").html(t("#productSmallImage").tmpl(e)),t("#small_image_list li:first").attr("id","onlickImg"),t("#vertical img:first").attr("src",e[0].big_img),-1==F.indexOf(e[0].big_img)&&t("#imageLoading").removeClass("hide"),M()}function M(){var e=null;t(document).ready(function(){t("#imageMenu li img").bind("click",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==F.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t("#imageMenu li").removeAttr("id"),t(this).parent().attr("id","onlickImg"))}).bind("mouseover",function(){"onlickImg"!=t(this).attr("id")&&(window.clearTimeout(e),t("#midimg").attr("src",t(this).data().data),-1==F.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"))}).bind("mouseout",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==F.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t(this).removeAttr("style"),e=window.setTimeout(function(){t("#midimg").attr("src",t("#onlickImg img").data().data),-1==F.indexOf(t("#onlickImg img").data().data)&&t("#imageLoading").removeClass("hide")},1e3))})})}console.log("cart.js");var q="",z="",J=!1,U=0,E={productId:"",productColorId:""},F=[],D=[],R=[],j=[],B=!1,H=[],V=[],Q=0,W={amount:0,curPage:1,pageSize:8},$=!1;!function(){t("#continue_shopping_btn").click(function(){window.location.href="/"}),t("#checkout_btn, #mobile_checkout_btn").click(function(){var e=Number(t("#product_total_number").text()),i=3;if(sessionStorage.maxnum_allowed&&(i=Number(sessionStorage.maxnum_allowed)),e>i)t("#error_message").html(t.i18n.map.maxErrorMsg1+" "+i+t.i18n.map.maxErrorMsg2),t("#error_message").removeClass("hide"),setTimeout(function(){alert(t.i18n.map.maxErrorMsg1+" "+i+t.i18n.map.maxErrorMsg2)},1);else if(z>q){var r=a.util.getCurrencySymbol(a.util.getLocalCurrency());t("#error_message").html(t.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(z,r)+" "+t.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(q,r)+". "+t.i18n.map.maxAmountErrorMsg3),t("#error_message").removeClass("hide"),setTimeout(function(){alert(t.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(z,r)+" "+t.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(q,r)+". "+t.i18n.map.maxAmountErrorMsg3)},1)}else t("#error_message").addClass("hide"),a.util.checkIsLogin()?window.location.href="../../../checkout_shipping.html":window.location.href="../../../login.html"}),t("#apply_btn").click(function(){J?(sessionStorage.setItem("applyCouponCode",0),t("#coupon_use_info").html(""),l()):t("#coupon_code_input").val()&&a.util.getCouponCode()&&(a.util.getCouponCode()===t("#coupon_code_input").val()?(sessionStorage.setItem("applyCouponCode",1),t(".loading-mask").removeClass("hide")):(sessionStorage.setItem("applyCouponCode",0),t("#coupon_use_info").html(t.i18n.map.ErrorCouponCode)),l())}),t("#free_shipping_tab").click(function(){t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide")}),t("#recently_browser_tab").click(function(){t("#recently_browser_tab").addClass("active"),t("#free_shipping_tab").removeClass("active"),t("#shipping_list_wrap").addClass("hide"),t("#recently_browse_wrap").removeClass("hide")}),t("#midimg").load(function(e){console.log("big image loading"),t("#imageLoading").addClass("hide"),F.push(e.currentTarget.currentSrc)}),t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),k()}),t("#customBtn").click(function(){y()}),a.util.isMobile()&&t(window).scroll(function(){a.util.isElementInViewport(document.getElementById("checkout_btn"))?t("#mobile_checkout_btn").addClass("hide"):t("#mobile_checkout_btn").removeClass("hide")})}(),a.setLanguageCallback(function(){s(),l()}),a.setCurrencyCodeCallback(function(){s(),l(),u(),m(),n()}),a.initLoginStatus(function(e){a.util.getLocalCurrency()&&(l(),u(),m()),e?(t("#coupon_hint_wrap").addClass("hide"),t("#coupon_hint_wrap").attr("href","javascript:void(0)"),n()):(t("#coupon_hint_wrap").removeClass("hide"),t("#coupon_hint_wrap").attr("href","login.html"))})});