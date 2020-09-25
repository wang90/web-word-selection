window.onload = function(){
  const notClassNames = [];
  const body = null;
  // 实例化
  const hightLignt =  new HightLignt( body, notClassNames);
  // 运行
  hightLignt.run();
  // 获得点击的词语
  hightLignt.getWord( (word) => {
    // console.log(word);
  });
};

