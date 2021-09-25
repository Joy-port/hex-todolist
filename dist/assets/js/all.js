"use strict";

var txt = document.querySelector('.txt');
var list = document.querySelector('.list');
var addBtn = document.querySelector('.btn_add');
var clearBtn = document.querySelector(".clearBtn");
var allTabs = document.querySelectorAll(".tab li"); //預設資料庫

var data = JSON.parse(localStorage.getItem('todos')) || []; // 預設為第一個 tab 為全部 放在前面才會一直在add的時候也會在all

var toggleTab = "all"; //初始化頁面

updateTodos();
addBtn.addEventListener('click', addTask, false);

function addTask(e) {
  e.preventDefault();

  if (txt.value.trim() == "") {
    return;
  }

  ;
  var taskObj = {
    txt: txt.value,
    id: new Date().getTime(),
    checked: ''
  };
  data.unshift(taskObj);
  txt.value = ""; //將頁籤切換回全部

  if (toggleTab !== "all") {
    allTabs.forEach(function (item) {
      item.classList.remove("active");
    });
    allTabs[0].classList.add("active");
    toggleTab = "all";
  }

  ;
  updateTodos();
  updateLocalStorage(data);
} //渲染


function renderData(data) {
  var str = '';
  data.forEach(function (item, index) {
    //不能放index 會根據刪除而有改變，要放item.id 才會有唯一性
    var content = "<li data-num = \"".concat(item.id, "\">\n          <label class=\"checkbox\" for=\"check\">\n            <input type=\"checkbox\" id=\"check\" ").concat(item.checked, "/>\n            <span>").concat(item.txt, "</span>\n          </label>\n          <a href=\"#\" class=\"delete\"></a>\n        </li>");
    str += content;
  });
  list.innerHTML = str;
}

list.addEventListener('click', deleteAndChecked, false); //刪除與勾選狀態更新到data 上方

function deleteAndChecked(e) {
  var idNum = parseInt(e.target.closest("li").dataset.num); //刪除資料

  if (e.target.classList.contains("delete")) {
    e.preventDefault(); //透過陣法方法 findIndex 比對 todoData 內的 id 是否等於點擊到的 id

    var deleteIndex = data.findIndex(function (item) {
      return item.id === idNum;
    }); //將原本用時間設定的id 數字，轉為索引值

    data.splice(deleteIndex, 1);
  } else {
    data.forEach(function (item) {
      if (idNum === item.id) {
        if (item.checked === "checked") {
          item.checked = "";
        } else {
          item.checked = "checked";
        }

        ;
      }

      ;
    });
  }

  ;
  updateTodos();
  updateLocalStorage(data);
} //9/2
//監聽切換tab 狀態


var tab = document.querySelector(".tab");
tab.addEventListener('click', changeTab, false);

function changeTab(e) {
  allTabs.forEach(function (item) {
    item.setAttribute("class", "");
  });
  e.target.setAttribute("class", "active");
  toggleTab = e.target.dataset.tab;
  updateTodos();
  updateLocalStorage(data);
} //9/2
//修改完成狀態
//點擊tab 區域，畫面渲染在list 區域
//需要監聽更大範圍的card list


var updateList = document.querySelector('.card_list');

function updateTodos() {
  var showData = [];

  if (toggleTab === "all") {
    showData = data;
  } else if (toggleTab === "undone") {
    showData = data.filter(function (item) {
      return item.checked === "";
    });
  } else if (toggleTab === "done") {
    showData = data.filter(function (item) {
      return item.checked === "checked";
    });
  }

  ; //計算總數

  var totalNum = document.querySelector('.totalNum');
  var dataLen = data.filter(function (item) {
    return item.checked === "";
  }).length;
  totalNum.textContent = dataLen; //加入清除已完成項目按鈕

  enableClearBtn(showData);
  renderData(showData);
  updateLocalStorage(showData);
}

function enableClearBtn(data) {
  //已完成項目按鈕顏色顯示
  var dataLen = data.filter(function (item) {
    return item.checked === "";
  }).length; //清空按鈕效果 

  var clearBtn = document.querySelector(".clearBtn"); //觸發已完成項目按鈕

  if (data.length - dataLen === 0) {
    clearBtn.classList.remove("active");
  } else if (data.length - dataLen > 0) {
    clearBtn.classList.add("active");
  }

  ;
} //清除已完成按鈕 刪除全部已完成事件


clearBtn.addEventListener('click', clearAllDone, false);

function clearAllDone(e) {
  e.preventDefault();

  if (e.target.classList.contains("active")) {
    data = data.filter(function (item) {
      return item.checked === "";
    });
  } else {
    return;
  }

  ;
  updateTodos();
  updateLocalStorage(data);
} //新增enter keyup


txt.addEventListener("keyup", function (e) {
  if (txt.value.trim() == "") {
    return;
  } else {
    addBtn.classList.add("add-active");

    if (e.key === "Enter") {
      addTask(e);
      addBtn.setAttribute("class", "btn_add");
    }

    ;
  }

  updateLocalStorage(data);
});

function updateLocalStorage(data) {
  localStorage.setItem('todos', JSON.stringify(data));
} //切換背景顏色


var bg = document.querySelector(".bg");
var switchBtn = document.querySelector(".switch-btn");
switchBtn.addEventListener("click", switchBgMode, false);

function switchBgMode(e) {
  e.preventDefault();

  if (!e.target.classList.contains("switch-btn")) {
    return;
  }

  ;

  if (!bg.classList.contains("night")) {
    bg.classList.add("night");
    switchBtn.textContent = "toggle_on";
  } else {
    bg.setAttribute("class", "bg");
    switchBtn.textContent = "toggle_off";
  }

  ;
}
//# sourceMappingURL=all.js.map
