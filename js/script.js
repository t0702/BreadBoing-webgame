"use strict";
/* Config */


const breads = ["egg", "pretzel", "castella", "sandwich", "donut", "avocado"];
const breadSrc = ["fried-egg.png", "pretzel.png", "castella.png", "sandwich.png", "donut.png", "avocado.png"];
const breadLeft = [40, 120, 200, 280, 360, 440, 520, 600];
const breadTop = [40, 120, 200, 280, 360, 440, 520, 600];

const rows = 8;
const cols = 8;

const breadDiv = `<div class="item"></div>`;
const itemsWrap = document.querySelector(".board-items");
const gridBg = document.querySelector(".grid-bg");
const sell = `<div class="sell"></div>`;


let breadId;
let imgSrc;

/* Create Game Board & item */

// .board-items 안에 div.item
// 8 x 8 퍼즐 64개 배열 생성.
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    itemsWrap.innerHTML += breadDiv;
    gridBg.innerHTML += sell;
  }
}

let items = document.querySelectorAll(".item");
const sells = document.querySelectorAll(".sell");

items = Array.prototype.slice.call(items);

// for (let i = 0; i < items.length; i++) {
//   items[i].classList.add(`${i}`);
// }

// 아이템 개수만큼 반복문 실행
// 0부터 5(브레드 개수) 범위의 난수를 breadId에 할당.
// breadSrc 배열의 breadId 번째 src를 불러와 img element 생성.
// 0부터 64번째 까지 div.item 안에 img element 삽입.
for (let i = 0; i < items.length; i++) {
  breadId = Math.floor(Math.random() * breads.length);
  imgSrc = `<img src="./assets/${breadSrc[breadId]}"></img>`;
  items[i].classList.add(`${breads[breadId]}`);
  items[i].innerHTML = imgSrc;
}

items = Array.prototype.slice.call(items);

/* ------------------------------------------------------------ */

// 배열 나누기 함수
Array.prototype.division = function (n) {
  var arr = this;
  var len = arr.length;
  var cnt = Math.floor(len / n);
  var tmp = [];
  for (var i = 0; i <= cnt; i++) {
    tmp.push(arr.splice(0, n));
  }
  return tmp;
};

// testArray (64개 들어간) 배열을 8개로 나누기
let itemsArray = items.division(8);

itemsArray.pop();

let sellcount = 0;
for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 8; y++) {
    itemsArray[x][y].style.left = breadLeft[x] + "px";
    itemsArray[x][y].style.top = breadTop[y] + "px";

    sells[sellcount].style.left = breadLeft[x] - 5 + "px";
    sells[sellcount].style.top = breadTop[y] - 5 + "px";
    sellcount++;
  }
}

let itemEls = document.querySelectorAll(" div.item");
let isSelect = false;


let selectLeft; // 첫번째 선택한 아이템 left
let selectTop; // 첫번째 선택한 아이템 top
let toSelectLeft; // 두번째 선택한 아이템 left
let toSelectTop; // 두번째 선택한 아이템 top
let hasSelectEl; // select 클래스가 추가된 아이템
let current = null;

let currentX; // 첫번재 선택된 2차원 배열의 x 값
let currentY; // 첫번재 선택된 2차원 배열의 y 값
let tempCoor; // 첫번째 선택된 2차원 배열의 x, y 값을 담을 temp 변수
let tempArray; // 첫번째 선택된 item(64) 배열의 인덱스를 담을 temp 변수
let classN;

let score = 0;

let nullCount = 0;
let beforeNull = 0;

itemEls = Array.prototype.slice.call(itemEls);
// console.log(itemEls);
for (let i = 0; i < itemEls.length; i++) {
  itemEls[i].addEventListener("click", (e) => {
    let el = e.currentTarget,
      target = itemEls.indexOf(el);
    let x = Math.floor(target / 8);
    let y = Math.floor(target - x * 8);
    // console.log(x, y);
    // console.log("itemEls[target] : ", itemEls[target]);
    // console.log("클릭된 요소 : 좌표", x, y, itemsArray[x][y]);
    // y > 0 && console.log("클릭된 요소의 위 : 좌표", x, y - 1, itemsArray[x][y - 1]);
    // y < 7 && console.log("클릭된 요소의 아래 : 좌표", x, y + 1, itemsArray[x][y + 1]);
    // x > 0 && console.log("클릭된 요소의 왼쪽 : 좌표", x - 1, y, itemsArray[x - 1][y]);
    // x < 7 && console.log("클릭된 요소의 오른쪽 : 좌표", x + 1, y, itemsArray[x + 1][y]);

    /* Swap */
    if (isSelect === false) {
      current = target;
      classN = itemEls[current].className;
      console.log(classN);

      // 첫번째 선택된 아이템에 select 클래스추가
      itemEls[current].classList.add("select");
      hasSelectEl = document.querySelector(".select");

      // 첫번째 선택된 아이템의 left
      // 첫번째 선택된 아이템의 top
      selectLeft = hasSelectEl.style.left;
      selectTop = hasSelectEl.style.top;
      isSelect = true;

      currentX = x;
      currentY = y;

    } else if (isSelect === true) {
      hasSelectEl = document.querySelector(".select");
      if ((currentX - 1 == x && currentY == y) ||
       (currentX + 1 == x && currentY == y) || 
       (currentY + 1 == y && currentX == x) || 
       (currentY - 1 == y && currentX == x) || 
       (currentX == x && currentY == y)) {
         console.log(itemEls[current].className);
         console.log(itemEls[target].className);
        itemEls[current].classList.remove("select");

        // Left, Top 값 교환해주기.
        toSelectLeft = itemEls[target].style.left;
        toSelectTop = itemEls[target].style.top;
        hasSelectEl.style.left = toSelectLeft;
        hasSelectEl.style.top = toSelectTop;

        // 두번째 선택한 아이템의 left 를 처음 선택된 아이템의 left 로 이동.
        // 두번째 선택한 아이템의 top 를 처음 선택된 아이템의 top 로 이동.
        itemEls[target].style.left = selectLeft;
        itemEls[target].style.top = selectTop;
        isSelect = false;

        // 두 배열의 인덱스 바꾸기
        tempArray = itemEls[current];
        itemEls[current] = itemEls[target];
        itemEls[target] = tempArray;

        // 두 배열의 x, y 좌표 바꾸기
        tempCoor = itemsArray[currentX][currentY];
        itemsArray[currentX][currentY] = itemsArray[x][y];
        itemsArray[x][y] = tempCoor;

        threeMatch();
        ClickBlock();

        pangCount
        setTimeout(()=>{
          nullCheck();
            if(pangCount === 0){
              setBack(current, currentX, currentY, target, x, y);
              console.log('오오');
            }
            
        }, 410);

      } else {
        isSelect = false;
        itemEls[current].classList.remove("select");

      }
    }
  });
}
