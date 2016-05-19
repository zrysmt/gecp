define(function(require, exports, module) {
    var config = require('./prjConfig');
    var subHref = config.subHref();

    var navheader = {
        init: function() {
            this.layout();
            this.loginRegister();
            this.changePage();
            this.loginInOut();
            this.usrcenter();
            this.toGlobalSearchPage();
        },

        layout: function() {
            //上
            var headerHtml = require('../subpages/navheader.html');
            require('../css/navheader.css');

            // $('#header').append(headerHtml);
            $('body').prepend(headerHtml);
            $('.header-logo').attr('src', subHref + "/common/img/logo.png");
            //中
            //
            //下
            var footHtml = require('../subpages/foot.html');
            require('../css/foot.css');
            $('#footer').append(footHtml);
        },
        loginRegister: function() {
            $('#index-register a').on('click', function(event) {
                window.location.href = subHref + "/modules/login/register.html";
            });
            $('#index-login a').on('click', function(event) {
                window.location.href = subHref + "/modules/login/login.html";
            });
        },
        changePage: function() {
            var ChangePage = require('../../modules/home/js/changePage');
            var changePage = new ChangePage(); //页面跳转逻辑
        },
        loginInOut: function() {
            var LoginInOut = require('../../modules/home/js/LoginInOut');
            var loginInOut = new LoginInOut(); //右上角
        },
        usrcenter: function() {
            var UsrCenter = require('../../modules/home/js/usrCenter');
            var usrCenter = new UsrCenter(); //进入用户中心
        },
        toGlobalSearchPage: function() {
            $('.global-search').on('click', function(event) {
                var gSearchText = $('.global-search-text').val();
                if (gSearchText) {
                    var gSearchTextArray = gSearchText.split(' ');
                    var gSearchTextCombine = "";
                    for (var i = 0, len = gSearchTextArray.length - 1; i < len; i++) {
                        gSearchTextCombine += gSearchTextArray[i] + '+';
                    }
                    gSearchTextCombine = gSearchTextCombine + gSearchTextArray[len];
                    // console.log(gSearchText);
                    location.href = subHref + '/common/subpages/globalSearch.html?query=' + gSearchTextCombine;
                }else{
                    location.href = subHref + '/common/subpages/globalSearch.html';
                }
            });
        },
        class2Highlight: function(classEle) {

        }
    };

    module.exports = navheader;
});