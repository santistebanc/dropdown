var Search = function(data,input){
  return input?RecursiveSearch(data,input,[]):[];
};


function RecursiveSearch(items,input,path){
  let found = [];
  items.forEach(function(item){
    if(item.items && item.items.length>0){
      let thepath = path.slice(0);
      thepath.push(item);
      let searchinside = RecursiveSearch(item.items,input,thepath);
      if(searchinside.length>0){
        found.push(...searchinside);
      }
    }else{
      let pos = getAllIndexes(item.title,input);
      if(pos.length>0){
        item.mark_pos = pos;
        item.path = [...path];
        found.push(item);
      }
    }
  });
  return found;
}


function getAllIndexes(string, sub) {
    let indexes = [];
    let start = 0;
    let length = string.length;
    let sublength = sub.length;
    do{
        var ind = string.indexOf(sub,start);
        if(ind != -1){
          indexes.push(ind);
          start = ind+sublength;
        }else{
          break;
        }
    } while(start<length);
    return indexes;
}

module.exports = Search;
