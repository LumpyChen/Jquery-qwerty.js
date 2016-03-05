/**
 * Created by Lumpychen on 16/3/4.
 *
 *  I just can't find a good typewriting Jquery Plugin,
 *  so I have to build one by myself.
 *  我找不到一个好用的打字效果的JQuery插件,所以我只好自己做一个了 —— Lumpy
 *
 */


(function ($) {

    //const function: set the blink of cursor
    const setBlink = function(cursorBlink){
        let timer2 = setInterval(function () {
            if ($("span[typer='cursor']").css('visibility') != "hidden") {
                $("span[typer='cursor']").css('visibility','hidden');
            } else {
                $("span[typer='cursor']").css('visibility','visible');
            }
        }, cursorBlink)
        return timer2;
    }

    //const function: click to remove the cursor
    const clickRemove = function (timer,callback) {

        $("span[typer='cursor']").css('cursor','pointer');
        $("span[typer='cursor']").click(function () {
            clearInterval(timer)
            $("span[typer='cursor']").remove();
        })

        //callback
        if (callback) {
            callback()
        }
    }

    $.fn.qwerty = function ({ typerString , delay=100 , cursor='|', cursorBlink=1000 }, callback) {


        //set const
        const room = this;
        const $cursor = `<span typer="cursor">&nbsp;${cursor}</span>`;

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

                }
                else {

                    //change row
                    if (index < typing_ele.length) {
                        ++index;
                        render_ele(index);


                    } else {

                        //when it ends.
                        clearTimeout(room.timer1);

                        //set timer of cursor's blink
                        let timerBlink = setBlink(cursorBlink);
                        clickRemove(timerBlink,callback);

                    }
                }
            }

            render_char(typing_ele, 0);
        }

        render_ele(0);
    };






    $.fn.qwertyDel = function ({ delay=100 , cursor='|', cursorBlink=1000 }, callback){


        const room = this;
        const $cursor = `<span typer="cursor">&nbsp;${cursor}</span>`;

        function delete_ele(index){

            var typing_ele = $(room[index]);
            var initText = typing_ele.text();
            
            function delete_char(ele, i) {

                //get value of index by closure
                $("span[typer='cursor']").remove();

                ele.html(initText.substr(0, i) + $cursor);

                if (0 < i) {

                    //typewriting

                    room.timer2 = setTimeout(function () {
                        delete_char(ele, i - 1);
                    }, delay);

                }

                else {

                    //change row
                    if (index > 0) {
                        --index;
                        delete_ele(index);


                    } else {

                        //when it ends.
                        clearTimeout(room.timer2);

                        //set timer of cursor's blink
                        let timerBlink = setBlink(cursorBlink);
                        clickRemove(timerBlink,callback);

                    }
                }
            }

            delete_char(typing_ele,initText.length-1);

        }

        delete_ele(room.size()-1);

    }


})(jQuery);