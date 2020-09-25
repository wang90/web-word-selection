
import { DefineClass,EventType} from "./config";
import { bindAddEventListener } from "./libs/bindEvent";
import { getCurrent } from "./libs/nodeInfo";
import { markHTML } from "./libs/markHtml";

class HightLignt {

    constructor (root, classNames = [] ) {
        this.$root = root || document.getElementsByTagName('body')[0];
        this.notClassName = [ DefineClass, ...classNames];
        this.marks = [];
        this.callback = null;
        this.id = "";
        this.word = {};
        this.current = "";
        this.isLoading = false;
        this.markNumber = 0;
    }

    run() {
        console.log('run');
        this.bindEventListener( this.$root ,(data) => {
            this.isSetLoading(true);
            const  { event , type } = data;
            const current = getCurrent(event.target || null, this.notClassName);
            const firstMark = this.marks.shift() || null;
            if ( current ) {
                switch(type) {
                    case EventType.click:
                        markHTML( current, firstMark ).then(mark => {
                            this.emitHook(mark);
                        }).catch((err) => {
                            this.isSetLoading(false);
                        });
                        break;
                    default:
                        break;
                }
            }
        } );
    }
    emitHook(mark) {
        this.isSetLoading();
        this.marks.push(mark);
        if (this.callback) {
            this.callback({
                content: mark.oldValue,
                text: mark.text,
                word: mark.word,
                offset: mark.offset,
            });
    } 
    }
    isSetLoading(type = false) {
        this.isLoading = type;
    }
    bindEventListener(root,fn) {
        const type = EventType.click;
        bindAddEventListener( root, type, ( e ) => {
            if (this.isLoading){
                return ;
            }
            fn({ "event": e, "type" : type });
        });   
    }
    getWord(fn) {
        if ( typeof(fn) === 'function') {
            this.callback  = fn;
        }
    }
    clearAllMarks(){
         // 清除标记点
        const len = this.marks.length;
        if (len > 0 ) {
            while(this.marks.length > 0) {
                const mark = this.marks.shift();
                if (mark) {
                    mark.target.innerHTML =  mark.oldValue;
                }
            }
        }
    }
}

window.HightLignt = HightLignt;