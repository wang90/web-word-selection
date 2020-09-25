
import { getNodeKey } from "./nodeInfo";
import { ReWord , ReSearch , TranslateRe , DefineSpan } from "../config";


export function markHTML( select, mark) {
    return new Promise((reslove, reject ) => {
        setMark(select, mark).then(( {current,html ,text , key} ) => {
            getSelectDom().then(( node ) => {
                let newValue = node.newValue;
                let oldValue = node.oldValue;
                const newMark = {
                    target: current,
                    newValue: newValue,
                    oldValue: ( html || oldValue).replace(TranslateRe,"")  ,
                    id: key,
                    word: node.word,
                    offset: node.offset,
                    text: text,
                };
                if (!mark || (mark.offset !== node.offset)) { 

                    const markIndex = newMark.oldValue.indexOf(oldValue);

                    if (markIndex > -1) {
                        newMark["offset"] = [
                            node.offset[0] + markIndex,
                            node.offset[1] + markIndex,
                        ];
                        newMark.target.innerHTML =  newMark.oldValue.replace(oldValue, newValue);
              
                    } else {
        
                        let markHtml = newMark.oldValue.split("&nbsp;");
                        markHtml = markHtml.join(" ");
                        const words = bindWord(markHtml, newMark.offset);
                        if (words) {
                            current.innerHTML =  words.value;
                        }
                    }
                }
                reslove(newMark);
            }).catch( err => {
                reject(err);
            });
        }).catch( err => {
            reject(err);
        });
    });
}
export function setMark(select,mark) {
    return new Promise((reslove, reject ) => {
        const { key, current } = getNodeKey(select);
        let html = current.innerHTML || '';
        let text = current.innerText || '';
        if ( mark ) {
            if (mark.id === key) {
                html =  mark.oldValue;
                text = mark.text;  
            }else {
                reductionFirstMark(mark);
            }
        }
        reslove({ current, html, text, key });
    });
}

function getSelectDom() {
    return new Promise((resolve, rejected ) => {
        const select = window.getSelection();
        if (select.type === 'Range') {
            rejected();
        } else if (select.type === 'Caret') {
            const node = searchWord( select.focusNode.data, select.focusOffset);
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


export function reductionFirstMark(mark){
    if (mark){
        mark.target.innerHTML = mark.oldValue;
    }
}


function bindWord(text,offset) {
    if (offset.length !==2 || !text) return null;
    const word = text.substring(offset[0],offset[1]);
    const first = text.substr( 0, offset[0]);
    const end = text.substr( offset[1] );
    return {
        word: word,
        value: `${first}${DefineSpan(word)}${end}`
    };
}


function searchWord( select, index , type) {
    if (select === "undefined" || !select || ! ReWord.test(select[index])){
        if (type === ReSearch ||  ( index - 1 ) === 0) {
            return {
                word: "",
                oldValue: select,
                newValue: select,
                offset:[]
            };
        }
        return searchWord( select, index - 1 ,type = ReSearch);
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
            html = `${first}${DefineSpan(newWord)}${end}`;
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
    if ( !ReWord.test( word ) || !word) { return { word: '',index: "" };}
    if ( type === 'left' ) {
        index -= 1;
    } else {
        index += 1;
    }
    const t = select[index];
    if ( ReWord.test(t) && t ) {
        if (type == 'left') {
            word = t + word;
        } else {
            word =  word + t;
        }
        return callbackSearchWord( word, select, index, type );
    } else {
        if (type === 'left') {
            index = word.length + index;
            if ( ReWord.test(select[index])) {
                return callbackSearchWord( word , select , index , 'right');
            }
        }
        return { word: word , index : ( index - word.length) };
    }   
}