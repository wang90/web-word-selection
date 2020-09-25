// config info

const KeyId = 'data-hightlight-id';
const TranslateRe = /&(nbsp);/g;
const ReWord = /^[a-zA-Z]*$/;
const DefineClass= "hight-lignt-input";
const DefineStyle = "background:rgba(0, 185, 119,0.2) !important;white-space: break-spaces;";
const NodeName = ['B','I','SPAN','EM']; // 需要查询父级别的元素
const RegMobile = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;
const EventType = {click:"click"};
const ReSearch = "reSearch";
const DefineSpan = function(word) {
    return `<span style ="${DefineStyle}" >${word}</span>`;
};


module.exports = {
    KeyId,
    TranslateRe,
    ReWord,
    DefineClass,
    NodeName,
    RegMobile,
    EventType,
    ReSearch,
    DefineStyle,
    DefineSpan,
};