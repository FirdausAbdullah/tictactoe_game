
const gameBoard = (function(){
    let board = [];
    const boardRow = 3;
    const boardCol = 3;
    
    let squareNum = 0;
    for(let i=0;i<boardRow; i++){
        
        for(let j=0; j<boardCol; j++){
            board.push(Square(squareNum));
            squareNum++;
        }
    }

    function showBoard(){ 
        let boardArr = [];
        board.forEach((square)=>{
            boardArr.push({position:square.position,content:square.showContent()});
        });
        return boardArr;
    }

    function editBoard(token,position){
        if(checkBoard(position)) {
            alert('cannot make move!');
            return false;
        }
        board.map((cell)=>{
            if(cell.position == position){
                cell.changeContent(token);
                return cell.showContent();
            }
            else return cell.showContent();
        });
        return true;
    }

    function clearBoard(){
        board.map((cell)=>{return cell.changeContent('');});
    }

    function checkBoard(position){
        if(board[position].showContent()!=''){return true;}
        else {return false;}
    }
    
    function winning(player) {
        let cboard = board.map((square)=>{return square.showContent()});
        console.log(cboard);
        if (
          (cboard[0] == player && cboard[1] == player && cboard[2] == player) ||
          (cboard[3] == player && cboard[4] == player && cboard[5] == player) ||
          (cboard[6] == player && cboard[7] == player && cboard[8] == player) ||
          (cboard[0] == player && cboard[3] == player && cboard[6] == player) ||
          (cboard[1] == player && cboard[4] == player && cboard[7] == player) ||
          (cboard[2] == player && cboard[5] == player && cboard[8] == player) ||
          (cboard[0] == player && cboard[4] == player && cboard[8] == player) ||
          (cboard[2] == player && cboard[4] == player && cboard[6] == player)
        ) {
          return true;
        } else {
          return false;
        }
      }
    return {showBoard,editBoard,clearBoard,winning}
})();


function Square(position){
    let content = '';
    function changeContent(token){
        content = token;
    }
    function showContent(){
        return content;
    }
    return{changeContent,showContent,position}
}

const turn = (function(){

    let turn = '';

    function assignEmblem(choice){
        if(choice == 'X'){
            player.setToken('X');
            computer.setToken('O');
            turn = 'player';
        }
        if(choice == 'O') {
            player.setToken('O');
            computer.setToken('X');
            setCurrentTurn('computer');
        }
    }

    function setCurrentTurn(who){
        turn = who;
        if(turn=='computer'){
            interface.updateTurn(computer.showToken());
            computer.makeMove();
            interface.updateScreen(gameBoard);
            turn='player';
            interface.updateTurn(player.showToken());
            return;
        }
        
    }

    function whoseTurn(){
        return turn;
    }

    
    function xChosen(e){
        if(turn==''){
            assignEmblem(e.target.innerText);
            interface.updateTurn(e.target.innerText);
        }
    }
    function oChosen(e){
        if(turn==''){
            assignEmblem(e.target.innerText);
            interface.updateTurn(e.target.innerText);
        }
    }

    return {xChosen,oChosen,whoseTurn,setCurrentTurn};
})();


const player = (function(){
    let token = '';
    function showToken(){return token;}
    function setToken(choice){token = choice;}
    function makeMove(position){
        if (token!=''){
        return gameBoard.editBoard(token,position);
        }
    }
    return {showToken,setToken,makeMove};
})();

const computer = (function(){
    let token = '';
    function makeMove(){
        while(1){
            let rando = Math.floor(Math.random() * 8);
            if(gameBoard.showBoard()[rando].content == ''){
                gameBoard.editBoard(token,rando);
                return;
            }
        }
    } 
    function showToken(){return token;}
    function setToken(choice){token = choice;}
    return{showToken,makeMove,setToken}
})();

function newGame(){
    turn.setCurrentTurn('');
    player.setToken('');
    computer.setToken('');
    gameBoard.clearBoard();
    interface.updateScreen(gameBoard);
    interface.updateTurn();   
}

function squareClicked(e){
    if(turn.whoseTurn()=='player'){
        let success = player.makeMove(e.target.id);
        interface.updateScreen(gameBoard);
        if(success){
            turn.setCurrentTurn('computer');
        };
    }
    else return;
}


const interface = (function(){
    const square = document.querySelectorAll('.cell');
    square.forEach((sq)=>{sq.addEventListener('click',squareClicked);});
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click',newGame);
    
    const xBtn = document.querySelector('#X');
    xBtn.addEventListener('click',turn.xChosen);

    const oBtn = document.querySelector('#O');
    oBtn.addEventListener('click',turn.oChosen);

    function updateScreen(board){
        square.forEach((sq)=>{sq.innerText = board.showBoard()[sq.id].content});   
    }

    function updateTurn(btn){
        if(btn=='X'){
            xBtn.style.backgroundColor = 'red';
            oBtn.style.backgroundColor = 'lightslategrey';
        }
        else if(btn=='O'){
            xBtn.style.backgroundColor = 'lightslategrey';
            oBtn.style.backgroundColor = 'red';
        }
        else {
            xBtn.style.backgroundColor = 'lightslategrey';
            oBtn.style.backgroundColor = 'lightslategrey';}
    }

    return {updateScreen,updateTurn};
})();


//event - player clicked an emblem 
// set turn to who is X - turn.assignEmblem

//if turn.turnFirst == computer, 
//1.computer makemove
//2.set turn to player
//else nothing happened - wait for user event

//event-player clicked a square
//
// player.makeMove(1);
// player.makeMove(5);
// player.makeMove(7);
// console.log(gameBoard.winning(choice));
// console.log(gameBoard.showBoard());

//user make a choice x\o
//if x, user turn
//if o comp turn
//round 
//  turn1.makemove
//  checkWin
//  yes turn1 wins
//  no turn2.makemove
