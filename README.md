"# Paste Preventer " 
=====================


Simple Jquery plugin to prevent copying and pasting in all browsers( focused on mobile browsers )
----------------------------------------------------------------------------------------------------

[Demo]( http://jsfiddle.net/pv6r0x1a/2/ )





Iinstallation:

```html
    <script src="pastepreventer.min.js"></script>
```



Usage:
```javascript

    $(document).ready(function(){
    
        $(".words").blockCopy({ // Block copy on elements which have 'words' class
            blockPasteClass : "noPasting",  // Optional: block pasting on inputs (or textareas) which have 'noPasting' class
            message:"Shame on you!"         // Optional: Message to show if user tried to paste
        });
        
    });

```
