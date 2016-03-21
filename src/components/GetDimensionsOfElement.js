var $ = require('jquery');

function getDimensionsOfElement(element,relative=false){
  let el = $(element);
  let offset = el.offset();
  if(relative){
    var position = el.position();
    var offsetparent = el.offsetParent();
  }
  let width = el.outerWidth(true);
  let height = el.outerHeight(true);
  return {x:offset && offset.left,y:offset && offset.top,w:width,h:height,rx:position && position.left,ry:position && position.top, rparent:offsetparent};
}

export default getDimensionsOfElement;
