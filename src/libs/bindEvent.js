
export function bindAddEventListener(root, type, fn) {
    root.addEventListener( type, (e) =>{
        fn( e );
        bubbles(e);
    });
}


function bubbles(e) {
    var ev = e || window.event;
    if(ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
}