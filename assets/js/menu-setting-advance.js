"use strict";
$(document).ready(function() {
    // =========================================================
    // =========    Menu Customizer [ HTML ] code   ============
    // =========================================================
    $('body').append('' +
        '<div id="styleSelector" class="menu-styler">' +
            '<div class="style-toggler">' +
                '<a href="#!"></a>' +
            '</div>' +
            '<div class="style-block">' +
                '<h6 class="mb-2">Datta Able Live Menu Customizer</h6>' +
                '<hr class="my-0">' +
                '<h6>Layouts</h6>' +
                '<div class="theme-color layout-type">' +
                    '<a href="#!" class=" active" data-value="menu-dark" data-toggle="tooltip" title="Default Layout"><span></span><span></span></a>' +
                    '<a href="#!" class="" data-value="menu-light" data-toggle="tooltip" title="Light"><span></span><span></span></a>' +
                    '<a href="#!" class="" data-value="dark" data-toggle="tooltip" title="Dark"><span></span><span></span></a>' +
                    '<a href="#!" class="" data-value="reset" data-toggle="tooltip" title="Reset">Reset to Default</a>' +
                '</div>' +
                '<div class="form-group mb-3">' +
                    '<div class="switch switch-primary d-inline m-r-10">' +
                        '<input type="checkbox" id="icon-colored">' +
                        '<label for="icon-colored" class="cr"></label>' +
                    '</div>' +
                    '<label>Icon Color</label>' +
                '</div>' +
                '<ul class="nav nav-pills mb-2" id="pills-cust-tab" role="tablist">' +
                    '<li class="nav-item">' +
                        '<a class="nav-link active" id="pills-color-tab" data-toggle="pill" href="#pills-color" role="tab" aria-controls="pills-color" aria-selected="true">Color</a>' +
                    '</li>' +
                    '<li class="nav-item">' +
                        '<a class="nav-link" id="pills-pages-tab" data-toggle="pill" href="#pills-pages" role="tab" aria-controls="pills-pages" aria-selected="false">Layout</a>' +
                    '</li>' +
                    '<li class="nav-item">' +
                        '<a class="nav-link" id="pills-extra-tab" data-toggle="pill" href="#pills-extra" role="tab" aria-controls="pills-extra" aria-selected="false">Extra</a>' +
                    '</li>' +
                '</ul>' +
                '<div class="tab-content" id="pills-cust-tabContent">' +
                    '<div class="tab-pane fade show active" id="pills-color" role="tabpanel" aria-labelledby="pills-color-tab">' +
                        '<h6>Background Color</h6>' +
                        '<div class="theme-color laybg-color small">' +
                            '<a href="#!" class="" data-value="#04a9f5" style="background:#04a9f5"></a>' +
                            '<a href="#!" class="" data-value="#ff5252" style="background:#ff5252"></a>' +
                            '<a href="#!" class="" data-value="#9575CD" style="background:#9575CD"></a>' +
                            '<a href="#!" class="active" data-value="#23b7e5" style="background:#23b7e5"></a>' +
                            '<a href="#!" class="" data-value="#424448" style="background:#424448"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #1de9b6 0%, #1dc4e9 100%)" style="background:linear-gradient(to right, #1de9b6 0%, #1dc4e9 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #899FD4 0%, #A389D4 100%)" style="background:linear-gradient(to right, #899FD4 0%, #A389D4 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" style="background:linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #667eea 0%, #764ba2 100%)" style="background:linear-gradient(to right, #667eea 0%, #764ba2 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #f77062 0%, #fe5196 100%)" style="background:linear-gradient(to right, #f77062 0%, #fe5196 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #9be15d 0%, #00e3ae 100%)" style="background:linear-gradient(to right, #9be15d 0%, #00e3ae 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #b224ef 0%, #7579ff 100%)" style="background:linear-gradient(to right, #b224ef 0%, #7579ff 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #0acffe 0%, #495aff 100%)" style="background:linear-gradient(to right, #0acffe 0%, #495aff 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #01a9ac 0%, #01dbdf 100%)" style="background:linear-gradient(to right, #01a9ac 0%, #01dbdf 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #fe5d70 0%, #fe909d 100%)" style="background:linear-gradient(to right, #fe5d70 0%, #fe909d 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #0ac282 0%, #0df3a3 100%)" style="background:linear-gradient(to right, #0ac282 0%, #0df3a3 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #fe9365 0%, #feb798 100%)" style="background:linear-gradient(to right, #fe9365 0%, #feb798 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #f075c7 0%, #9191ff 100%)" style="background:linear-gradient(to right, #f075c7 0%, #9191ff 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #b275f0 0%, #7575f0 100%)" style="background:linear-gradient(to right, #b275f0 0%, #7575f0 100%)"></a>' +
                            '<a href="#!" class="" data-value="linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)" style="background:linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)"></a>' +
                        '</div>' +
                        '<h6>Background Image</h6>' +
                        '<div class="theme-color bg-images">' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/bg1.jpg)" style="background-image:url(../assets/images/bg-images/thumb_bg1.jpg)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/bg3.jpg)" style="background-image:url(../assets/images/bg-images/thumb_bg3.jpg)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/bg4.jpg)" style="background-image:url(../assets/images/bg-images/thumb_bg4.jpg)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/bg5.jpg)" style="background-image:url(../assets/images/bg-images/thumb_bg5.jpg)"></a>' +
                        '</div>' +
                        '<h6>Background Pattern</h6>' +
                        '<div class="theme-color bg-images pattern">' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/1.png)" style="background-image:url(../assets/images/bg-images/1.png)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/2.png)" style="background-image:url(../assets/images/bg-images/2.png)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/3.png)" style="background-image:url(../assets/images/bg-images/3.png)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/4.png)" style="background-image:url(../assets/images/bg-images/4.png)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/5.png)" style="background-image:url(../assets/images/bg-images/5.png)"></a>' +
                            '<a href="#!" class="" data-value="url(../assets/images/bg-images/6.png)" style="background-image:url(../assets/images/bg-images/6.png)"></a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="tab-pane fade" id="pills-pages" role="tabpanel" aria-labelledby="pills-pages-tab">' +
                        '<div class="form-group mb-0">' +
                            '<div class="switch switch-primary d-inline m-r-10">' +
                                '<input type="checkbox" id="box-layouts">' +
                                '<label for="box-layouts" class="cr"></label>' +
                            '</div>' +
                            '<label>Box Layouts</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="tab-pane fade" id="pills-extra" role="tabpanel" aria-labelledby="pills-extra-tab">' +
                        '<h6>Menu Dropdown Icon</h6>' +
                        '<div class="theme-color">' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in-1" id="drpicon-1" checked onchange="drpicon(\'style1\')">' +
                                    '<label for="drpicon-1" class="cr"><i class="feather icon-chevron-right"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in-1" id="drpicon-2" onchange="drpicon(\'style2\')">' +
                                    '<label for="drpicon-2" class="cr"><i class="feather icon-chevrons-right"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in-1" id="drpicon-3" onchange="drpicon(\'style3\')">' +
                                    '<label for="drpicon-3" class="cr"><i class="feather icon-plus"></i></label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<h6>Menu List Icon</h6>' +
                        '<div class="theme-color">' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-1" checked onchange="menuitemicon(\'style1\')">' +
                                    '<label for="subitem-1" class="cr"><i class=" "> </i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-2" onchange="menuitemicon(\'style2\')">' +
                                    '<label for="subitem-2" class="cr"><i class="feather icon-minus"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-3" onchange="menuitemicon(\'style3\')">' +
                                    '<label for="subitem-3" class="cr"><i class="feather icon-check"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-4" onchange="menuitemicon(\'style4\')">' +
                                    '<label for="subitem-4" class="cr"><i class="icon feather icon-corner-down-right"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-5" onchange="menuitemicon(\'style5\')">' +
                                    '<label for="subitem-5" class="cr"><i class="icon feather icon-chevrons-right"></i></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-group d-inline">' +
                                '<div class="radio radio-primary d-inline">' +
                                    '<input type="radio" name="radio-in" id="subitem-6" onchange="menuitemicon(\'style6\')">' +
                                    '<label for="subitem-6" class="cr"><i class="icon feather icon-chevron-right"></i></label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<h6>Active Color</h6>' +
                        '<div class="theme-color active-color small">' +
                            '<a href="#!" class=" active" data-value="active-default"></a>' +
                            '<a href="#!" class="" data-value="active-blue"></a>' +
                            '<a href="#!" class="" data-value="active-red"></a>' +
                            '<a href="#!" class="" data-value="active-purple"></a>' +
                            '<a href="#!" class="" data-value="active-lightblue"></a>' +
                            '<a href="#!" class="" data-value="active-dark"></a>' +
                        '</div>' +
                        '<h6>Menu Title Color</h6>' +
                        '<div class="theme-color title-color small">' +
                            '<a href="#!" class=" active" data-value="title-default"></a>' +
                            '<a href="#!" class="" data-value="title-blue"></a>' +
                            '<a href="#!" class="" data-value="title-red"></a>' +
                            '<a href="#!" class="" data-value="title-purple"></a>' +
                            '<a href="#!" class="" data-value="title-lightblue"></a>' +
                            '<a href="#!" class="" data-value="title-dark"></a>' +
                        '</div>' +
                        '<div class="form-group mb-0">' +
                            '<div class="switch switch-primary d-inline m-r-10">' +
                                '<input type="checkbox" id="caption-hide">' +
                                '<label for="caption-hide" class="cr"></label>' +
                            '</div>' +
                            '<label>Menu Title Hide</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    setTimeout(function(){
        $('#pills-cust-tabContent').css({'height':'calc(100vh - 430px)','position':'relative'});
        var px = new PerfectScrollbar('#pills-cust-tabContent', {
            wheelSpeed: .5,
            swipeEasing: 0,
            suppressScrollX: !0,
            wheelPropagation: 1,
            minScrollbarLength: 40,
        });
    },400);
    // =========================================================
    // ==================    Menu Customizer Start   ===========
    // =========================================================
    // open Menu Styler
    $('#styleSelector > .style-toggler').on('click', function() {
        $('#styleSelector').toggleClass('open');
    });

    $('.layout-type > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('.layout-type > a').removeClass('active');
        $(this).addClass('active');
        $('head').append('<link rel="stylesheet" class="layout-css" href="">');
        if (temp == "menu-dark") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');
        }
        if (temp == "menu-light") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');
            $('.pcoded-navbar').addClass(temp);
        }
        if (temp == "reset") {
            location.reload();
        }
        if (temp == "dark") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').addClass('navbar-dark');
            $('.layout-css').attr("href", "../assets/css/layouts/dark.css");
        } else {
            $('.layout-css').attr("href", "");
        }
    });

    // Background images
    $('.bg-images > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('.bg-images > a').removeClass('active');
        $('body').removeAttr('style');
        $('body').css({
            'background-image': temp,
            'background-size': 'cover'
        });
    });
    // Background pattern
    $('.bg-images.pattern > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('.bg-images.pattern > a').removeClass('active');
        $('body').removeAttr('style');
        $('body').css({
            'background-image': temp,
            'background-size': 'auto'
        });
    });
    // Background Color
    $('.laybg-color > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('body').removeAttr('style');
        $('.laybg-color > a').removeClass('active');
        $(this).addClass('active');
        $('body').css('background', temp);
    });
    // Active Color
    $('.active-color > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('.active-color > a').removeClass('active');
        $(this).addClass('active');
        if (temp == "active-default") {
            $('.pcoded-navbar').removeClassPrefix('active-');
        } else {
            $('.pcoded-navbar').removeClassPrefix('active-');
            $('.pcoded-navbar').addClass(temp);
        }
    });
    // Caption Hide
    $('#caption-hide').change(function() {
        if ($(this).is(":checked")) {
            $('.pcoded-navbar').addClass('caption-hide');
        } else {
            $('.pcoded-navbar').removeClass('caption-hide');
        }
    });
    // title Color
    $('.title-color > a').on('click', function() {
        var temp = $(this).attr('data-value');
        $('.title-color > a').removeClass('active');
        $(this).addClass('active');
        if (temp == "title-default") {
            $('.pcoded-navbar').removeClassPrefix('title-');
        } else {
            $('.pcoded-navbar').removeClassPrefix('title-');
            $('.pcoded-navbar').addClass(temp);
        }
    });
    // Menu Icon Color
    $('#icon-colored').change(function() {
        if ($(this).is(":checked")) {
            $('.pcoded-navbar').addClass('icon-colored');
        } else {
            $('.pcoded-navbar').removeClass('icon-colored');
        }
    });
    // Box layouts
    $('#box-layouts').change(function() {
        if ($(this).is(":checked")) {
            $('body').addClass('container');
            $('body').addClass('box-layout');
        } else {
            $('body').removeClass('container');
            $('body').removeClass('box-layout');
        }
    });
    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, it) {
            var classes = it.className.split(" ").map(function(item) {
                return item.indexOf(prefix) === 0 ? "" : item;
            });
            it.className = classes.join(" ");
        });
        return this;
    };
    // ==================    Menu Customizer End   =============
    // =========================================================

});
// Menu Dropdown icon
function drpicon(temp) {
    if (temp == "style1") {
        $('.pcoded-navbar').removeClassPrefix('drp-icon-');
    } else {
        $('.pcoded-navbar').removeClassPrefix('drp-icon-');
        $('.pcoded-navbar').addClass('drp-icon-' + temp);
    }
}
// Menu subitem icon
function menuitemicon(temp) {
    if (temp == "style1") {
        $('.pcoded-navbar').removeClassPrefix('menu-item-icon-');
    } else {
        $('.pcoded-navbar').removeClassPrefix('menu-item-icon-');
        $('.pcoded-navbar').addClass('menu-item-icon-' + temp);
    }
}
