window.onload = function(){
  const notClassNames = [];
  const body = null;
  // 实例化
  const hightLignt =  new HightLignt( body, notClassNames);
  // 运行
  hightLignt.run();
  // 获得点击的词语
  hightLignt.hooks( (word) => {
    // console.log(word);
  });
  // window.clearMarks = function(){
  //   // 关闭所有的marks
  //   if(heightLignt) {
  //     heightLignt.clear();
  //   }
  // };

  // // 暴露给 app 用的部分
  // window.getCurrentDom = function( x, y ) {
  //   console.log("getCurrentDom");
  //   console.log( x, y);
  //   if (x && y && heightLignt) {
  //     const dom = heightLignt.getDom( x, y );
  //     return dom || null;
  //   }
  //   return null;
  // };
  // window.getCurrentSelection = function( type ) {
  //   // type = sentence
  //   const select = heightLignt.getSelection( type );
  //   select['articleId'] = id;
  //   select["orig_url"] = origUrl;
  //   console.log(select);
  //   return select;
  // };
}

