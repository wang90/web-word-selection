 

(function(window){
    const KEY_ID = 'data-hightlight-id';
    const Translate_RE = /&(nbsp);/g;
    const RE_WORD = /^[a-zA-Z]*$/;
    const DefineClass= "hight-lignt-input";
    const Node_Name = ['B','I','SPAN','EM']; // 需要查询父级别的元素
    const RegMobile = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
    const HightLignt = function ( root, classNames) {
        this.$root = root || document.getElementsByTagName('body')[0];
        this.notClassName = [ DefineClass, ...classNames];
        this.marks = [];
        this.callback = null;
        this.id = "";
        this.word = {};
        this.current = "";
        this.isLoading = false;
        this.markNumber = 0;
       
        this.run = () => {
            // 执行
            console.log('run');
            bindAddEventListener(this.$root,(e, type) => {
                console.log("isLoading:"+this.isLoading);
                if (this.isLoading){
                    return ;
                }
               
                const currentDom = e.target ? e.target: null;
                const domTarget = getParentDom(currentDom);
                const current = isClassName( domTarget, this.notClassName);
                const firstMark = this.marks.shift() || null;
           
                if ( current ) {
                    if (type === 'click') {
                        let html = null;
                        let text = '';
                        let key = current.getAttribute( KEY_ID );  
                        if ( firstMark ) {
                            if ( key === firstMark.id) {
                                console.log('同一个');
                                html =  firstMark.oldValue;
                                text = firstMark.text;
                            } else {
                                console.log('不是同一个');
                                key = createRandomId();
                                current.setAttribute(KEY_ID, key);
                                html = current.innerHTML || '';
                                text = current.innerText || '';
                                reductionFirstMark(firstMark);
                            }
                        } else {
                            key = createRandomId();
                            current.setAttribute(KEY_ID, key);
                            html = current.innerHTML || '';
                            text = current.innerText || '';
                        }
                        try {
                            getSelectDom().then(node => {
                                var newValue = node.newValue;
                                var oldValue = node.oldValue;
                                const mark = {
                                    target: current,
                                    newValue: newValue,
                                    oldValue: (html || oldValue).replace(Translate_RE,"")  ,
                                    id: key,
                                    word: node.word,
                                    offset: node.offset,
                                    text: text,
                                };
                                if (!firstMark || (firstMark.offset !== node.offset)) { 
                                    const markIndex = mark.oldValue.indexOf(oldValue);
                          
                                    if (markIndex > -1) {
                                        mark["offset"] = [
                                            node.offset[0] + markIndex,
                                            node.offset[1] + markIndex,
                                        ]
                                        current.innerHTML =  mark.oldValue.replace(oldValue, newValue );
                                    }else {
                                        let markHtml = mark.oldValue.split("&nbsp;");
                                        markHtml = markHtml.join(" ");
                                        const words = bindWord(markHtml, mark.offset);
                                        if (words) {
                                            current.innerHTML =  words.value;
                                        }
                                    }
                                    this.emitHook(mark);  
                                }
                            }).catch((err)=>{
                                reductionFirstMark(firstMark);
                                this.isLoading = false;
                            });
                        }catch(err){
                            range = null;
                            this.isLoading = false;
                        }
                    } else {
                        reductionFirstMark(firstMark);
                    }
                } else {
                    reductionFirstMark(firstMark);
                }
                removeAllRanges();
                this.isLoading = false;
            });
            return this;
        };
        this.hooks = (res) => {
            this.callback(res);
        };
        this.hook = function(fn){
            if (typeof(fn) === 'function'){
                this.callback  = fn;
            }
        };
        // 清除标记点
        this.clear = function(){
            const len = this.marks.length;
            if (len > 0 ) {
                while(this.marks.length > 0) {
                    const mark = this.marks.shift();
                    if (mark) {
                        mark.target.innerHTML =  mark.oldValue;
                    }
                }
            }
        };
        // 划词使用
        this.getSelection = function(type) {
            let select = window.getSelection();
            const baseNode = select.focusNode;
            if (!baseNode) {
                return null;
            }

            var parentNode = baseNode.parentNode;
            parentNode = getParentDom(parentNode);
            if (!select) {
                select = document.getSelection();
            }

            const wholeHtml = parentNode.innerHTML;
            const wholeText = parentNode.innerText;
            const range = select.getRangeAt(0);
            const rangeWholeHtml = range.commonAncestorContainer.textContent;
            const firstIndex = wholeHtml.indexOf(rangeWholeHtml) > -1 ?  wholeHtml.indexOf(rangeWholeHtml): 0;
            let offset = [
                firstIndex + range.startOffset,
                firstIndex + range.endOffset
            ]
            if (type === 'sentence') {
                const node = select.anchorNode;

                const _offset = getSentence(
                    node.textContent,
                    range.startOffset,
                    range.endOffset
                );
                offset = [
                    _offset[0] - firstIndex,
                    _offset[1] - firstIndex 
                ];
                range.setStart( node , _offset[0]);
                range.setEnd( node, _offset[1]);
            } 
            const rangeString = range.toString();
            return {
                word: rangeString,
                value: wholeHtml,
                offset: offset,
                text: wholeText,
            };
        };
        // 手动标记点
        this.mark = function(data) {
            const { hash, offset } = data;
            this.markNumber += 1;
            if (hash){
                return new Promise((resolve, rejected) => {
                    try {
                        const current = document.getElementById(hash);
                        resolve({
                            current: current,
                            offset: offset.split("_"),
                        });
                    }catch(err){
                        rejected();
                    }
                }).then(data => {
                    console.log("获取dom");
                    const { current ,offset} = data;
                    const html = current.innerHTML;
                    const text = current.innerText || '';
                    const key = createRandomId();
                    const words = bindWord(html,offset);
                    if (words) {
                        const word = words.word;
                        const newValue = words.value;
                        var mark = {
                            target: current,
                            newValue: newValue,
                            oldValue: html,
                            id: key,
                            word: word,
                            offset: offset,
                            text: text,
                        };
                        this.marks.push(mark);
                        current.setAttribute(KEY_ID, key);
                        current.innerHTML = newValue;
                    }
                }).catch(err => {
                    // 检查三次
                    if (this.markNumber <= 3) {
                        this.mark(data);
                    }
                });
            }
        };
        this.emitHook = function(mark) {
            this.marks.push(mark);
            this.hooks({
                content: mark.oldValue,
                text: mark.text,
                word: mark.word,
                offset: mark.offset,
            });   
        }
    };
    function bindWord(text,offset) {
        if (offset.length !==2 || !text) return null;
        const word = text.substring(offset[0],offset[1]);
        const first = text.substr( 0, offset[0]);
        const end = text.substr( offset[1] );
        return {
            word: word,
            value:`${first}<span class="${DefineClass}">${word}</span>${end}`
        }
    }
    function getSentence( value, first, end) {
        var current = value[first]; 
        var index = first;
        var type = 'start';
        while(current) {
            index = type === 'start' ? index - 1: index + 1;
            current = value[index];
            if (current === '.' ||
                current ==='。' || 
                index === 0) {
                
                if (type === 'end') {
                    end = index + 1;
                    const endValue = value[end];
                    // 检查对话符号
                    if ( endValue === '”' || endValue === '’'){
                        end = end + 1;
                    }
                    break;
                }
                type = 'end';
                first = index +1;
                index = end;
                current = value[index];
                // 检查对话符号
                const firstValue = value[first];
                if ( firstValue=== '”' || firstValue === '’'){
                    first = first + 1;
                }
                console.log('开始结束');
            }
        }
        return [ first >= 0 ? first: 0 , end ];
    }
    function reductionFirstMark(mark){
        if (mark){
            mark.target.innerHTML = mark.oldValue;
        }
    }
    function bindAddEventListener(root, fn) {
        root.addEventListener('click', (e) =>{
            fn(e,'click');
        });
    }
    function getParentDom(target) {
        const nodeName = target ? target.nodeName: null;
        if (nodeName) {
            if (Node_Name.indexOf(nodeName) > -1){
                console.log('需要查找父亲');
                return whileParentDom(target);
            }
            return target;
        }
        return null;
    }
    function whileParentDom(current){
        const parent = current.parentNode;
        const parentNodeName = parent.nodeName;
        if (Node_Name.indexOf(parentNodeName) > -1){  
            return whileParentDom(parent);
        }
        return parent;
    }
    function getSelectDom() {
        return new Promise((resolve, rejected) => {
            const select = window.getSelection();
            if (select.type === 'Range') {
                rejected();
            } else if (select.type === 'Caret') {
                const node = searchWord(select.focusNode.data, select.focusOffset);
                if (node.word){
                    node['isWord'] = true;
                    resolve(node);
                }else{
                    rejected();
                }
            } else {
                rejected();
            }
        });
    }
    function createRandomId() {
        return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    }

    // 检查 class 是否标记
    function isClassName( current, classNames){
        var className = current.className ?  current.className.split(" ") : [];
        var isSearch = className.filter(v => classNames.indexOf(v) === -1);
        if (isSearch.length !== className.length && className.length >0) {
            return  null;
        }
        return current;
    }
    // 检查手机端
    function isMobile (userAgent){
        return RegMobile.test(userAgent);
    }
    function searchWord( select, index , type) {
        if (select === "undefined" || !select || ! RE_WORD.test(select[index])){
            if (type === 'reSearch' ||  ( index - 1 ) === 0) {
                return {
                    word: "",
                    oldValue: select,
                    newValue: select,
                    offset:[]
                };
            }
            return searchWord( select, index - 1 ,type='reSearch');
        } else {
            const word = select[index] || '';
            const re = callbackSearchWord( word, select, index, 'left');
            const firstIndex = re.index;
            const newWord = re.word;
            let html = select;
            let offset = [];
            if ( newWord ) {
                const first = select.substr( 0, firstIndex);
                const end = select.substr( firstIndex + newWord.length);
                html = `${first}<span class="cy-click-input">${newWord}</span>${end}`;
                offset = [ firstIndex, firstIndex + newWord.length ];
            }
            return {
                word: newWord || "",
                oldValue: select,
                newValue: html,
                offset: offset,
            };
        }
    }
    function callbackSearchWord( word, select, index, type) {
        if ( !RE_WORD.test( word ) || !word) { return { word: '',index: "" }}
        let t = '';
        if ( type === 'left' ) {
            index -= 1;
        } else {
            index += 1;
        }
        t = select[index];
        if (/^[a-zA-Z]*$/.test(t) && t) {
            if (type == 'left') {
                word = t + word;
            } else {
                word =  word + t;
            }
            return callbackSearchWord( word, select, index, type );
        } else {
            if (type === 'left') {
                index = word.length + index;
                if (/^[a-zA-Z]*$/.test(select[index])) {
                    return callbackSearchWord( word , select , index , 'right');
                }
            }
            return { word: word , index : ( index - word.length) };
        }   
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
    function removeAllRanges() {
        // window.getSelection().removeAllRanges();
    }
    window.HightLignt = HightLignt;
})(window);