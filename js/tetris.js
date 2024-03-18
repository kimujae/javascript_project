// DOM
const playground = document.querySelector(".playground > ul");
console.log(playground)
// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//Var
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
const BLOCKS = {
    tree : [
        [[2,1],[0,1],[1,0],[1,1]],
        [[],[],[],[]],
        [[],[],[],[]],
        [[],[],[],[]],
    ]
}
const movingItem = {
    type : "tree",
    direction : 0,
    top : 0,
    left : 0,
}

init()

// functions
function init() {
    tempMovingItem = {...movingItem}; // 내부 값만 복사하는 스프레드 오퍼레이터
    for(let i = 0; i < GAME_ROWS ; i++) {
        prependNewLine()
    }
    renderBlocks()
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    
    for(let j = 0; j < GAME_COLS ; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}


function renderBlocks() {
    const {type, direction, top, left} = tempMovingItem
    // 디스트럭쳐링 사용 -> tempMovingItem의 프로퍼티들을 변수로 하나씩 바로 사용할 수 있도록 한다. 
    // tempMovingItem.type , tempMovingItem.direction , .. 과 같은 접근이다.
    
    
    // tree타입 블록의 direction에는 좌표값 네개가 들어있다.-> 블록이 채워질 좌표들임.\
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left;        
        const y = block[1] + top;
        const playground = document.querySelector(".playground > ul");
        const target = playground.childNodes[y].childNodes[0].childNodes[x]
        console.log(target)
        // 배열처럼 foreach나 sum 과 같은 배열 함수를 사용할 수 있는 배열값으로 반환된다.
        // 즉, 좌표값에 해당하는 노드들을 조작할 수 있다는 의미이다.
        target.classList.add(type);
        
    })
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount
    renderBlocks()
}


document.addEventListener("keydown", e => {
    switch(e.keyCode) {
        case 39 : 
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
    }
})