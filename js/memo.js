/* function.js */


// 시작하자마자 0.35초 대기 후 3매치 감지 & 제거
setTimeout(() => {
  Match();
}, 350);

// 3매치 감지 및 제거
function Match() {
  setTimeout(() => {
    for (let i = 0; i < itemsArray.length; i++) {
      for (let j = 0; j < itemsArray.length; j++) {
        // 행 비교
        if (i < itemsArray.length - 2 && itemsArray[i][j].className == itemsArray[i + 1][j].className && itemsArray[i + 1][j].className == itemsArray[i + 2][j].className) {
          itemsArray[i][j].innerHTML = null;
          itemsArray[i + 1][j].innerHTML = null;
          itemsArray[i + 2][j].innerHTML = null;
        }
        // 열 비교
        else if (j < itemsArray.length - 2 && itemsArray[i][j].className == itemsArray[i][j + 1].className && itemsArray[i][j + 1].className == itemsArray[i][j + 2].className) {
          itemsArray[i][j].innerHTML = null;
          itemsArray[i][j + 1].innerHTML = null;
          itemsArray[i][j + 2].innerHTML = null;
        }
      }
    }
    DropDown();
  }, 350);
}








// 시작하자마자 0.35초 대기 후 3매치 감지 & 제거
setTimeout(() => {
    threeMatch();
    setTimeout(() => {
      MoveDown();
    }, 600);
  }, 350);
  
  function threeMatch() {
    setTimeout(() => {
      /* Row Match Check 가로 */
      for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows - 2; x++) {
          if (itemsArray[x][y].className === itemsArray[x + 1][y].className && itemsArray[x + 1][y].className === itemsArray[x + 2][y].className) {
            console.log(itemsArray[x][y].className);
  
            itemsArray[x][y].id = "pang";
            itemsArray[x + 1][y].id = "pang";
            itemsArray[x + 2][y].id = "pang";
  
            setTimeout(() => {
              itemsArray[x][y].innerHTML = "";
              itemsArray[x + 1][y].innerHTML = "";
              itemsArray[x + 2][y].innerHTML = "";
  
              itemsArray[x][y].className = `item Empty`;
              itemsArray[x + 1][y].className = `item Empty`;
              itemsArray[x + 2][y].className = `item Empty`;
  
              itemsArray[x][y].setAttribute("id", "");
              itemsArray[x + 1][y].setAttribute("id", "");
              itemsArray[x + 2][y].setAttribute("id", "");
  
              // if(itemsArray[x][y] != null) itemsArray[x][y].remove();
              // if(itemsArray[x+1][y] != null) itemsArray[x+1][y].remove();
              // if(itemsArray[x+2][y] != null) itemsArray[x+2][y].remove();
  
              // itemsArray[x][y] = null;
              // itemsArray[x+1][y] = null;
              // itemsArray[x+2][y] = null;
  
              // itemEls[(x * 8) + y] = null;
              // itemEls[((x + 1) * 8) + y] = null;
              // itemEls[((x + 2) * 8) + y] = null;
  
              NullCheck();
            }, 200);
          }
        }
      }
      /* Column Match Check 세로 */
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols - 2; y++) {
          if (itemsArray[x][y].className === itemsArray[x][y + 1].className && itemsArray[x][y + 1].className === itemsArray[x][y + 2].className) {
            itemsArray[x][y].id = "pang";
            itemsArray[x][y + 1].id = "pang";
            itemsArray[x][y + 2].id = "pang";
  
            setTimeout(() => {
              itemsArray[x][y].innerHTML = "";
              itemsArray[x][y + 1].innerHTML = "";
              itemsArray[x][y + 2].innerHTML = "";
  
              itemsArray[x][y].className = `item Empty`;
              itemsArray[x][y + 1].className = `item Empty`;
              itemsArray[x][y + 2].className = `item Empty`;
  
              itemsArray[x][y].setAttribute("id", "");
              itemsArray[x][y + 1].setAttribute("id", "");
              itemsArray[x][y + 2].setAttribute("id", "");
  
              // if(itemsArray[x][y] != null) itemsArray[x][y].remove();
              // if(itemsArray[x][y+1] != null) itemsArray[x][y+1].remove();
              // if(itemsArray[x][y+2] != null) itemsArray[x][y+2].remove();
  
              // itemsArray[x][y] = null;
              // itemsArray[x][y+1] = null;
              // itemsArray[x][y+2] = null;
  
              // itemEls[(x * 8 )+ y] = null;
              // itemEls[(x * 8 )+ y+1] = null;
              // itemEls[(x * 8 )+ y+2] = null;
  
              NullCheck();
            }, 200);
          }
        }
      }
    }, 200);
  }
  
  /* Puzzle Move Down */
  let MoveDownNull = 0;
  
  let tempArrayDown;
  let tempNullDown;
  let tempLeftDown;
  let tempTopDown;
  const firstRow = [0, 8, 16, 24, 32, 40, 48, 56];
  
  // let afterClassName;
  // let afterafterClassName;
  
  function MoveDown() {
    MoveDownNull = 0;
  
    for (let i = 0; i < itemEls.length; i++) {
      // afterClassName = itemEls[i].className;
      // if (i > 0) {
      //   afterafterClassName = itemEls[i - 1].className;
      // }
      // console.log(typeof afterClassName);
      // console.log(itemEls[i].className);
      // console.log(afterClassName);
      // console.log(afterafterClassName);
      // console.log(itemEls[i].classList.contains("Empty"));
      // console.log(afterClassName.indexOf("Empty"));
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow) continue;
      if (itemEls[i].classList.contains("Empty") && !itemEls[i - 1].classList.contains("Empty")) {
        // if (itemEls[i].innerHTML === null && itemEls[i - 1].innerHTML != null) {
        // if (afterClassName.indexOf("Empty") == -1 && afterafterClassName.indexOf("Empty") == 5) {
  
        // 전체 배열 인덱스 교환
        tempNullDown = itemEls[i];
        itemEls[i] = itemEls[i - 1];
        itemEls[i - 1] = tempNullDown;
  
        // tempNullDown = itemEls[i];
        // itemEls[i] = itemEls[i-1];
        // itemEls[i-1] = tempNullDown;
  
        // tempNullDown = itemEls[i];
        // itemEls[i] = itemEls[i-1];
        // itemEls[i-1] = null;
  
        tempLeftDown = itemEls[i].style.left;
        tempTopDown = itemEls[i].style.top;
        itemEls[i].style.left = itemEls[i-1].style.left;
        itemEls[i].style.top = itemEls[i-1].style.top;
        itemEls[i-1].style.left = tempLeftDown;
        itemEls[i-1].style.top = tempTopDown;
      }
    }
  
    for (let i = 0; i < itemsArray.length; i++) {
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow) continue;
      for (let j = itemsArray.length - 1; j > 0; j--) {
        // afterClassName = itemsArray[i][j].className;
        // if (i > 0) {
        //   afterafterClassName = itemsArray[i][j - 1].className;
        // }
        // if (afterClassName.indexOf("Empty") === -1 && afterafterClassName.indexOf("Empty") === 5) {
  
        if (itemsArray[i][j].classList.contains("Empty") && !itemsArray[i][j - 1].classList.contains("Empty")) {
          /* Two Dimensional Array Change */
          // let tempTile = itemsArray[i][j];
          // itemsArray[i][j] = itemsArray[i][j-1];
          // itemsArray[i][j-1] = tempTile;
  
          let tempTile = itemsArray[i][j];
          itemsArray[i][j] = itemsArray[i][j - 1];
          itemsArray[i][j - 1] = tempTile;
  
          /* Top, Left Pos Change */
          // itemsArray[i][j].style.top = breadTop[j-1] + "px";
  
          // j = itemsArray[i].length;
        }
      }
    }
    // FillEmpty();
  }
  
  
  let newItemDiv;
  
  /* Fill Empty Cell */
  function FillEmpty() {
    setTimeout(() => {
      let isNew = 0;
      for (let i = 0; i < itemEls.length; i++) {
        const isFirstRow = firstRow.includes(i);
        if (itemEls[i].innerHTML === null && itemEls[i - 1].innerHTML !== null) {
          if (isFirstRow) continue;
          tempNullDown = itemEls[i - 1];
          itemEls[i] = tempNullDown;
          itemEls[i - 1] = null;
  
          // breadId = Math.floor(Math.random() * breads.length);
          // itemsWrap.innerHTML += `<div class="item ${breads[breadId]}" id="new"><img src="./assets/${breadSrc[breadId]}"></img></div>`;
          // newItemDiv = document.querySelectorAll('#new');
          // console.log(newItemDiv[isNew]);
  
          // itemEls[i] = newItemDiv[isNew];
  
          // isNew++;
  
          // console.log(itemEls[i]);
        }
      }
    }, 200);
  }
  
  // 3매치 불일치 시 다시 되돌리기.
  function rePlace(current, currentX, currentY, target, x, y) {
    itemEls[current].style.left = toSelectLeft;
    itemEls[current].style.top = toSelectTop;
    itemEls[target].style.left = selectLeft;
    itemEls[target].style.top = selectTop;
    isSelect = false;
    itemEls[current].classList.remove("select");
  
    tempArray = itemEls[target];
    itemEls[target] = itemEls[current];
    itemEls[current] = tempArray;
  
    tempCoor = itemsArray[x][y];
    itemsArray[x][y] = itemsArray[currentX][currentY];
    itemsArray[currentX][currentY] = tempCoor;
  }
  
  /* Null Count Check */
  function NullCheck() {
    nullCount = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      for (let j = 1; j < itemsArray.length; j++) {
        if (itemsArray[i][j].classList.contains("Empty")) {
          nullCount += 1;
        }
      }
    }
  }
  

  /* Click protection for 0.2 seconds */
  function ClickBlock() {
    // for(let i = 0; i < itemEls.length; i++){
    //   itemEls[i].style.pointerEvents = 'none';
    // }
    // setTimeout(()=>{
    //   for(let i = 0; i < itemEls.length; i++){
    //     itemEls[i].style.pointerEvents = 'auto';
    //   }
    // }, 210);
  }
  



  itemsWrap.append(itemsArray[x][y]);
  itemsWrap.append(itemsArray[x+1][y]);
  itemsWrap.append(itemsArray[x+2][y]);

  // const firstRow = [0, 8, 16, 24, 32, 40, 48, 56];
// const isFirstRow = firstRow.includes(i);



// // * Fill Grid Row *
// function fillGridRow(x, y){
//   for(let i = y; i < y+3; i++){
//     breadId = Math.floor(Math.random() * breads.length);
//     itemsArray[x][i].className = `item ${breads[breadId]}`;
//     itemsArray[x][i].innerHTML = `<img src="./assets/${breadSrc[breadId]}"></img>`;
//     itemsWrap.append(itemsArray[x][i]);
//     console.log(itemsArray[x][i]);
//   }
// }

// // * Fill Grid Col *
// function fillGridCol(x, y){
//   for(let i = x; i < x+3; i++){
//     breadId = Math.floor(Math.random() * breads.length);
//     itemsArray[i][y].className = `item ${breads[breadId]}`;
//     itemsArray[i][y].innerHTML = `<img src="./assets/${breadSrc[breadId]}"></img>`;
//     itemsWrap.append(itemsArray[i][y]);
//     console.log(itemsArray[i][y]);
//   }
// }





        //   console.log('beforeNull : ' + beforeNull + ', currentNull : ' + nullCount);
        //   if(beforeNull === nullCount){
        //     setBack(current, currentX, currentY, target, x, y);
        //   }