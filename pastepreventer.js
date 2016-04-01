/*
Author: Jafar Akhondali
Release year: 2016
Title:	Prevent copy & pasting in all browsers (including mobile browsers)
Thanks to Stackoverflow users
*/


(function($) {

    $.fn.blockCopy = function(options) {

        var settings = $.extend({
            blockPasteClass    : null,
			message    : "You can't cheat !"
        }, options);

        if(settings.blockPasteClass){
            $("." + settings.blockPasteClass ).bind('copy paste cut drag drop', function (e) {
                e.preventDefault();
                return false;
            });
        }

        function style_appender(rule){
            $('html > head').append($('<style>'+rule+'</style>'));
        }

        function html_appender(html){
            $("body").append(html);
        }

        function clearClipboard() {
            var $temp = $("#bypasser");
            $temp.val(message).select();
            document.execCommand("copy");
        }

        function add_absolute_div(id) {
            html_appender("<div id='noClick"+id+"' onclick='return false;' oncontextmenu='return false;'>&nbsp;</div>");
        }

        function absorbEvent_(event) {
            var e = event || window.event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        }

        function preventLongPressMenu(node) {
            node.ontouchstart = absorbEvent_;
            node.ontouchmove = absorbEvent_;
            node.ontouchend = absorbEvent_;
            node.ontouchcancel = absorbEvent_;
        }

        function set_absolute_div(element,id){
            var position = element.position();
            var noclick = "#noClick" + id;

            $(noclick).css({
                height: (element.height()),
                width:    (element.width()),
                position: 'absolute',
                top: position.top,
                left: position.left,
                'z-index': 100
            })
        }


        $("body").bind("contextmenu", function(e) {
            e.preventDefault();
        });

        //Append needed rules to CSS
        style_appender(
            "* {-moz-user-select: none !important; -khtml-user-select: none !important;   -webkit-user-select: none !important; -ms-user-select: none !important;   user-select: none !important; }"+
            ".content {position: relative !important; }" +
            ".content .mask {position: absolute !important ; z-index: 1 !important; width: 100% !important; height: 100%!important;}" +
            ".content a {position: relative !important; z-index: 3 !important;}"+
            ".content, .content .mask{ pointer-events: none;}"
        );


        //Append an input to clear the clipboard
        html_appender("<input id='bypasser' value='nothing' type='hidden'>");

        //Clearing clipboard Intervali
        setInterval(clearClipboard,1000);

        var id = 1;

        return this.each( function() {

            //Preventing using touch events
            preventLongPressMenu($(this));

            //Add CSS preventer rules to selected DOM & append mask to class
            $(this).addClass("content").append("<div class='mask'></div>");

            //Append an absolute div to body
            add_absolute_div(id);

            //Set position of the div to selected DOM
            set_absolute_div($(this),id);

            id++;
        });
    }
}(jQuery));