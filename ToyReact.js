 // 元素节点
 class ElementWrapper {
   constructor(type) {
     this.root = document.createElement(type);
   }
   setAttribute(name, value) {
     this.root.setAttribute(name, value)
   }
   appendChild(vchild) {
     vchild.mountTo(this.root);
   }
   mountTo(parent) {
     parent.appendChild(this.root);
   }
 }

// 文本节点
 class TextWrapper {
   constructor(content) {
     this.root = document.createTextNode(content);
   }
   mountTo(parent) {
    parent.appendChild(this.root);
  }
 }

 // 这个 组件里面的是 vdom
 export class Component {
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent)
  }
  appendChild (vchild) {
    this.children.push(vchild)
  }
 }
 
 export const ToyReact = {
  createElement(type, attributes, ...children) {
    let element 
    debugger;
    console.log(type)
    if (typeof type === 'string') {
      element =  new ElementWrapper(type);
    } else {
      element = new type;
    }
    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof children === 'object' && child instanceof Array) {
          insertChildren(child);
        }else {
          if (!(child instanceof  Component) && !(child instanceof ElementWrapper) &&  !(child instanceof TextWrapper)) {
            child = String(child);
          }
          if (typeof child === 'string') {
            console.log(child);
            child = new TextWrapper(child);
          }
        }
        element.appendChild(child);
      }
    }
    insertChildren(children);
    return element;
  },
  render (vdom, element) {
    vdom.mountTo(element);
  }
}