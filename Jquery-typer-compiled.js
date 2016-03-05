"use strict";

/**
 * Created by Lumpychen on 16/3/4.
 *
 *  I just can't find a good typewriting Jquery Plugin,
 *  so I have to build one by myself.
 *  我找不到一个好用的打字效果的JQuery插件,所以我只好自己做一个了 —— Lumpy
 *
 */

(function ($) {

    $.fn.typer = function (_ref, callback) {
        var typerString = _ref.typerString;
        var _ref$delay = _ref.delay;
        var delay = _ref$delay === undefined ? 100 : _ref$delay;
        var _ref$cursor = _ref.cursor;
        var cursor = _ref$cursor === undefined ? '|' : _ref$cursor;
        var _ref$cursorBlink = _ref.cursorBlink;
        var cursorBlink = _ref$cursorBlink === undefined ? 100 : _ref$cursorBlink;


        //set const
        var room = this;
        var $cursor = "<span typer=\"cursor\">&nbsp;" + cursor + "</span>";

        //function which describes typing by row
        function render_ele(index) {

            var typing_ele = $(room[index]);
            var initHTML = typing_ele.html();

            function render_char(ele, i) {

                //get value of index by closure
                $("span[typer='cursor']").remove();
                ele.html(initHTML + typerString.substr(0, i) + $cursor);

                if (typerString.length > i) {

                    //typewriting

                    room.timer1 = setTimeout(function () {
                        render_char(ele, i + 1);
                    }, delay);
                } else {

                    //change row
                    if (index < typing_ele.length) {
                        ++index;
                        render_ele(index);
                    } else {

                        //when it ends.
                        clearTimeout(room.timer1);

                        //set timer of cursor's blink
                        var timer2 = setInterval(function () {
                            if ($("span[typer='cursor']").css('display') != "none") {
                                $("span[typer='cursor']").hide();
                            } else {
                                $("span[typer='cursor']").show();
                            }
                        }, cursorBlink);

                        //callback
                        if (callback) {
                            callback();
                        };
                    }
                }
            }

            render_char(typing_ele, 0);
        }

        render_ele(0);
    };
})(jQuery);

//# sourceMappingURL=Jquery-typer-compiled.js.map