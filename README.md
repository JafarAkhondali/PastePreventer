"# Paste Preventer " 
Simle github plugin to prevent copying and pasting in all browsers( focused on mobile browsers )


(jsfiddle)[http://jsfiddle.net/pv6r0x1a/2/]


Usage:

```javascript

    $(document).ready(function(){
        $(".words").blockCopy({
            blockPasteClass : "noPasting",
            message:"Shame on you!"
        });
    });

```