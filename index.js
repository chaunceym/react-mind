// 第一版: 简单的 DOM 变化操作
// const btn = document.querySelector(".like-button");
// const text = btn.querySelector(".like-text");
// let isLiked = false;
// btn.addEventListener("click", () => {
//   isLiked = !isLiked;
//   if (isLiked) {
//     text.innerHTML = "取消";
//   } else {
//     text.innerHTML = "点赞";
//   }
// });

// 第二版: 实现复用;
// class LikeButton {
//   render() {
//     return `
//       <button class="like-button">
//         <span class="like-text">点赞</span>
//         <span>👍</span>
//       </button>
//     `;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// wrapper.innerHTML = new LikeButton().render();
// wrapper.innerHTML += new LikeButton().render();

// 第三版: 实现加入事件
// const createDOMFromString = (domStr) => {
//   const div = document.createElement("div");
//   div.innerHTML = domStr;
//   return div;
// };
// class LikeButton {
//   render() {
//     this.el = createDOMFromString(
//       ` <button class="like-button">
//          <span class="like-text">点赞</span>
//          <span>👍</span>
//        </button> `
//     );
//     this.el.addEventListener("click", () => console.log("click"));
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// wrapper.appendChild(new LikeButton().render());
// wrapper.appendChild(new LikeButton().render());

// 第四版: 实现实时改变按钮文字
// const createDOMFromString = (domStr) => {
//   const div = document.createElement("div");
//   div.innerHTML = domStr;
//   return div;
// };
// class LikeButton {
//   constructor() {
//     this.state = { isLiked: false };
//   }
//   changeText() {
//     const text = this.el.querySelector(".like-text");
//     this.state.isLiked = !this.state.isLiked;
//     text.innerHTML = this.state.isLiked ? "取消" : "点赞";
//   }
//   render() {
//     this.el = createDOMFromString(
//       ` <button class="like-button">
//          <span class="like-text">点赞</span>
//          <span>👍</span>
//        </button> `
//     );
//     this.el.addEventListener("click", this.changeText.bind(this));
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// wrapper.appendChild(new LikeButton().render());
// wrapper.appendChild(new LikeButton().render());

// 第五版: 不操作 DOM
// const createDOMFromString = (domStr) => {
//   const div = document.createElement("div");
//   div.innerHTML = domStr;
//   return div;
// };
// class LikeButton {
//   constructor() {
//     this.state = { isLiked: false };
//   }
//   setState(state) {
//     this.state = state;
//     this.el = this.render();
//   }
//   changeText() {
//     this.setState({
//       isLiked: !this.state.isLiked,
//     });
//   }
//   render() {
//     this.el = createDOMFromString(
//       ` <button class="like-button">
//           <span class="like-text">${this.state.isLiked ? "取消" : "点赞"}</span>
//           <span>👍</span>
//         </button> `
//     );

//     this.el.addEventListener("click", this.changeText.bind(this));
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// wrapper.appendChild(new LikeButton().render());
// wrapper.appendChild(new LikeButton().render());

// 第六版: 通知内部更新 DOM
// const createDOMFromString = (domStr) => {
//   const div = document.createElement("div");
//   div.innerHTML = domStr;
//   return div;
// };
// class LikeButton {
//   constructor() {
//     this.state = { isLiked: false };
//   }
//   setState(state) {
//     const oldEl = this.el;
//     this.state = state;
//     this.el = this.render();
//     if (this.onStateChange) this.onStateChange(oldEl, this.el); // 从外面传入函数
//   }
//   changeText() {
//     this.setState({
//       isLiked: !this.state.isLiked,
//     });
//   }
//   render() {
//     this.el = createDOMFromString(
//       ` <button class="like-button">
//           <span class="like-text">${this.state.isLiked ? "取消" : "点赞"}</span>
//           <span>👍</span>
//         </button> `
//     );

//     this.el.addEventListener("click", this.changeText.bind(this));
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// const likeButton1 = new LikeButton();
// const likeButton2 = new LikeButton();
// wrapper.appendChild(likeButton1.render());
// wrapper.appendChild(likeButton2.render());
// likeButton1.onStateChange = (oldEl, newEl) => {
//   wrapper.insertBefore(newEl, oldEl); // 加入新元素
//   wrapper.removeChild(oldEl); // 删除旧元素, 这里的操作十分耗费性能, 需要用到虚拟DOM
// };
// likeButton2.onStateChange = (oldEl, newEl) => {
//   wrapper.insertBefore(newEl, oldEl); // 加入新元素
//   wrapper.removeChild(oldEl); // 删除旧元素, 这里的操作十分耗费性能, 需要用到虚拟DOM
// };

// 第七八版: 定义公共类继承实现共用
const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDOM());
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl);
    wrapper.removeChild(oldEl);
  };
};
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLiked: false };
  }
  onClick() {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  }
  render() {
    return `
      <button class="like-button" style="background-color: ${
        this.props.bgColor
      };color: ${this.props.color}">
         <span class="like-text">${this.state.isLiked ? "取消" : "点赞"}</span>
         <span>👍</span>
      </button> `;
  }
}
const wrapper = document.querySelector(".wrapper");
mount(new LikeButton({ bgColor: "blue", color: "white" }), wrapper);
class ShowContent extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "hello World" };
  }
  onClick() {
    this.setState({ content: this.state.content.split("").reverse().join("") });
  }
  render() {
    return `
      <div style="background-color: ${this.props.bgColor};color:${this.props.color}">
        ${this.state.content}
      </div>
      `;
  }
}
mount(new ShowContent({ bgColor: "red", color: "white" }), wrapper);
