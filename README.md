# Jquery-qwerty.js

A JQuery plugin which provides typing / deleting effect of words.


It provide two functions:

```javascript
    $('.ele').qwerty({
        typerString: "Hello",
        delay=100 , 
        cursor='|', 
        cursorBlink=100
    },callback)
    //'qwerty' is a function which type a string in provided element. 


    $('.ele').qwertyDel({
        delay=100 , 
        cursor='|', 
        cursorBlink=100 
    },callback)
    //'qwertyDel' is a function which delete all the text in provided element.

```

The 'callback' argument is not necessary.

| typerString | delay |  cursor  | cursorBlink |
|:--------:|:-----:|:----:|:----:|
|not default|default:100 |default:`|`|default:1000|
|String|Number|String|Number|
|The String you want to type.|The millisecond between each type.|The cursor character.|The interval between cursor's blink.|

If your Jquery object has more than one element, the typing animation will be excuted by lines, and the cursor will stay at last element's end after the animation.

After the animation, the cursor will be set a timer of blink, which can be removed by clicking.

You can see how it goes in the example folder : )
