let status = "all";
let data = [];
const inputVal = document.querySelector("#inputVal");
const add = document.querySelector("#addTodoBtn");
const tab = document.querySelector("#tab");
const todoList = document.querySelector("#todoList");
const deleAllBtn = document.querySelector("#deleAllBtn");

// 监听是否点击新增按钮
add.addEventListener("click", addTodo);

function addTodo() {
  let todo = {
    txt: inputVal.value,
    id: new Date().getTime(),
    complete: 0
  };
  if (todo.txt.trim() !== "") {
    data.unshift(todo);
    inputVal.value = "";
  } else {
    alert("请输⼊代办事项");
    return;
  }
  render(data);
  let tabs = document.querySelectorAll("#tab li");
  tabs.forEach((item, i) => {
    i === 0 ? item.classList.add("active") : item.classList.remove("active");
  });
}

// 资料初始化渲染
function render(todo) {
  let str = "";
  // 透过 todoData 跑迴圈
  todo.forEach((item) => {
    str += `<li data-id="${item.id}">
      <label class="checkbox" for="">
      <input type="checkbox" ${item.complete ? "checked" : ""}>
      <span>${item.txt}</span></label>
      <a href="#" class="delete"></a>
      </li> `;
  });
  // 计算待完成项目
  const workNum = document.querySelector("#workNum");
  let dataLength = data.filter((item) => !item.complete);
  workNum.textContent = dataLength.length;
  todoList.innerHTML = str;
}

// 监听 ul todoList 的点击事件
todoList.addEventListener("click", (e) => {
  // 取出的 id 会是字符串类型
  let id = parseInt(e.target.closest("li").dataset.id);
  if (e.target.nodeName === "A") {
    e.preventDefault();
    let index = data.findIndex((item) => item.id === id);
    data.forEach((item) => {
      if (item.id === id) {
        item.complete ? (item.complete = 0) : (item.complete = 1);
      }
    });
  }
  render(data);
});

// 监听是否点击到 tab
tab.addEventListener("click", changeTab);

// tab 状态切换
function changeTab(e) {
  status = e.target.dataset.tab; // 透过 dataset 取值
  let tabs = document.querySelectorAll("#tab li");
  tabs.forEach((item) => {
    item.classList.remove("active"); // 先移除 class active 样式
  });
  e.target.classList.add("active"); // 点击到时加回样式
  updateList();
}

// 修改完状态
function updateList() {
  let newData = [];
  if (status === "all") {
    newData = data;
  } else if (status === "work") {
    newData = data.filter((item) => !item.complete);
  } else {
    newData = data.filter((item) => item.complete);
  }
  // 计算待完成项目
  const workNum = document.querySelector("#workNum");
  let dataLength = data.filter((item) => !item.complete);
  workNum.textContent = dataLength.length;
  render(newData);
}

// 监听清除已完成按钮
deleAllBtn.addEventListener("click", function (e) {
  e.preventDefault();
  data = data.filter((item)=>
    !item.complete);//重新賦予未完成的資料至data
    updateList();
  });
  
  inputVal.addEventListener("keyup",function(e){
   if(e.key==="Enter"){
      addTodo();
    }
  });