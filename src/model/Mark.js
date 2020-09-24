class Mark {
   
    constructor ({
        key,offset,text,
        target,word,
        newValue,
        oldValue,
    }) {
        this.target = target || null;
        this.newValue = newValue || "";
        this.oldValue = oldValue || "";
        this.id = key;
        this.word = word || "";
        this.offset = offset || [];
        this.text = text || "";
    }
}
module.exports =  Mark;