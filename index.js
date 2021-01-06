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

// 第二版: 实现复用
// class LikeButton {
//   render() {
//     return `
//       <button class="like-button">
//         <span class="like-text">点赞</span>
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
//       ` <button class="like-button"> <span class="like-text">点赞</span> </button> `
//     );
//     this.el.addEventListener("click", () => console.log("click"), false);
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// const likeButton1 = new LikeButton();
// wrapper.appendChild(likeButton1.render());
// const likeButton2 = new LikeButton();
// wrapper.appendChild(likeButton2.render());

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
//       ` <button class="like-button"> <span class="like-text">点赞</span> </button> `
//     );
//     this.el.addEventListener("click", this.changeText.bind(this), false);
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// const likeButton1 = new LikeButton();
// wrapper.appendChild(likeButton1.render());
// const likeButton2 = new LikeButton();
// wrapper.appendChild(likeButton2.render());

// 第五版: 取消DOM操作, 只用数据
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
//       ` <button class="like-button"> <span class="like-text">${
//         this.state.isLiked ? "取消" : "点赞"
//       }</span> </button> `
//     );
//     this.el.addEventListener("click", this.changeText.bind(this), false);
//     return this.el;
//   }
// }
// const wrapper = document.querySelector(".wrapper");
// const likeButton1 = new LikeButton();
// wrapper.appendChild(likeButton1.render());
// likeButton1.onStateChange = (oldEl, newEl) => {
//   wrapper.insertBefore(newEl, oldEl); // 加入新元素
//   wrapper.removeChild(oldEl); // 删除旧元素, 这里的操作十分耗费性能, 需要用到虚拟DOM
// };

// 第六版: 定义公共类继承实现共用
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
      };color: ${this.props.color}"> <span class="like-text">${
      this.state.isLiked ? "取消" : "点赞"
    }</span> </button> `;
  }
}
const wrapper = document.querySelector(".wrapper");
mount(new LikeButton({ bgColor: "red", color: "white" }), wrapper);

class BlueButton extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "blue" };
  }
  onClick() {
    this.setState({
      color: "green",
    });
  }
  render() {
    return `
      <div class="like-button" style="background-color: ${this.state.color};color: white;"> <span class="like-text">
      点赞
    </span> </div> `;
  }
}
mount(new BlueButton(), wrapper);
