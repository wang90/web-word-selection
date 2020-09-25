import { NodeName, KeyId } from "../config";
import { createRandomId } from "./createKey";

// 查询父节点排除一些行内标签
export function getParentDom(target) {
    const nodeName = target ? target.nodeName: null;
    if (nodeName) {
        if (NodeName.indexOf(nodeName) > -1){
            return whileParentDom(target);
        }
        return target;
    }
    return null;
}

// 检查 class 是否标记
export function isClassName( current, classNames){
    const className = current.className ?  current.className.split(" ") : [];
    const isSearch = className.filter(v => classNames.indexOf(v) === -1);
    if (isSearch.length !== className.length && className.length >0) {
        return  null;
    }
    return current;
}


export function getCurrent(selectDom,className) {
    const domTarget = getParentDom(selectDom);
    const current = isClassName( domTarget, className);
    return current;
}
export function getNodeKey(current){
    let key = current.getAttribute( KeyId )  || null;
    if (!key) {
        key = createRandomId();
        current.setAttribute( KeyId,key);
    }
    return { key , current };
}

function whileParentDom( current ) {
    const parent = current.parentNode;
    const parentNodeName = parent.nodeName;
    if (NodeName.indexOf(parentNodeName) > -1) {  
        return whileParentDom(parent);
    }
    return parent;
}