start();

function start(){
  setTimeout(() => {
    threeMatch();
  }, 300);
}

let pangCount = 0;
// * Three Match *
function threeMatch(){
  setTimeout(() => {
    for(let i = 0; i < itemEls.length; i++){
      let x = Math.floor(i / 8);
      let y = Math.floor(i % 8);
      // Horizon Match
      if( x < cols - 2 &&
      itemsArray[x][y].className === itemsArray[x+1][y].className &&
      itemsArray[x][y].className === itemsArray[x+2][y].className){
        itemsArray[x][y].id = 'pang';
        itemsArray[x+1][y].id = 'pang';
        itemsArray[x+2][y].id = 'pang';
        setTimeout(() => {
          itemsArray[x][y].replaceChildren();
          itemsArray[x+1][y].replaceChildren();
          itemsArray[x+2][y].replaceChildren();
          itemsArray[x][y].id = '';
          itemsArray[x+1][y].id = '';
          itemsArray[x+2][y].id = '';
            MoveDown();
        }, 300);
      }
      // Vertical Match
      if( y < rows - 2 &&
      itemsArray[x][y].className === itemsArray[x][y+1].className &&
      itemsArray[x][y].className === itemsArray[x][y+2].className){
        itemsArray[x][y].id = 'pang';
        itemsArray[x][y+1].id = 'pang';
        itemsArray[x][y+2].id = 'pang';
        setTimeout(() => {
          itemsArray[x][y].replaceChildren();
          itemsArray[x][y+1].replaceChildren();
          itemsArray[x][y+2].replaceChildren();
          itemsArray[x][y].id = '';
          itemsArray[x][y+1].id = '';
          itemsArray[x][y+2].id = '';
            MoveDown();
        }, 300);
      }
    }
    pangCount = 0;
    for(let i = 0; i < itemEls.length; i++){
      if(itemEls[i].id === 'pang'){
        pangCount += 1;
      }
    }
    console.log('pang : ', pangCount);
    

  }, 300);

}

let whileChk = 0;


// * Move Down *
function MoveDown(){
  
  // for(let i = 0; i < itemEls.length; i++){
  for(let i = itemEls.length - 1; i > 0 ; i--){
    const firstRow = [0, 8, 16, 24, 32, 40, 48, 56];
    const isFirstRow = firstRow.includes(i);
    if(isFirstRow) continue;

    let x = Math.floor(i / 8);
    let y = Math.floor(i % 8);
    if(itemsArray[x][y].firstChild == null && 
      itemsArray[x][y-1].firstChild != null){

      itemsArray[x][y].style.top = breadTop[y-1] + 'px';
      itemsArray[x][y-1].style.top = breadTop[y] + 'px';

      let tempItemsArray = itemsArray[x][y];
      itemsArray[x][y] = itemsArray[x][y-1];
      itemsArray[x][y-1] = tempItemsArray;

      let tempItemEls = itemEls[i];
      itemEls[i] = itemEls[i-1];
      itemEls[i-1] = tempItemEls;
      
      i = itemEls.length ;
      // 빈 공간을 모두 채우기 위해.
    }

  }

  setTimeout(() => {
    fillGrid();
  }, 150);
}



// * Mismatch --> setBack *
function setBack(current, currentX, currentY, target, x, y) {
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


function fillGrid(){
  for(let k = itemEls.length - 1; k >= 0 ; k--){
    // for(let k = 0; k = itemEls.length; k++){
    let x = Math.floor(k / 8);
    let y = Math.floor(k % 8);
    if(itemsArray[x][y].firstChild === null){
      breadId = Math.floor(Math.random() * breads.length);
      itemsArray[x][y].className = `item ${breads[breadId]}`;
      itemsArray[x][y].innerHTML = `<img src="./assets/${breadSrc[breadId]}"></img>`;
      itemsWrap.append(itemsArray[x][y]);
      itemsArray[x][y].id = 'new';
    }
  }
  ClickBlock();
  setTimeout(()=>{
    threeMatch();
  },200)
}


// * Click protection for 0.51 seconds *
function ClickBlock() {
  for(let i = 0; i < itemEls.length; i++){
    itemEls[i].style.pointerEvents = 'none';
  }
  setTimeout(()=>{
    for(let i = 0; i < itemEls.length; i++){
      itemEls[i].style.pointerEvents = 'auto';
    }
  }, 510);
}


// * Null Count Check *
function nullCheck() {
  nullCount = 0;
  for(let i = 0; i < itemEls.length; i++){
    let x = Math.floor(i / 8);
    let y = Math.floor(i % 8);
    if (itemsArray[x][y].firstChild === null ) {
      nullCount += 1;
    }
    console.log(nullCount);
  }
}