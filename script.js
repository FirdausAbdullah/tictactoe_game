
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
        if(player==''){return false;}
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
            turn.setWinner(player);
            return true;
        } else {
            return false;
        }
      }

      function availableSpace(){
        let freeSpace=board.filter((sq)=>{return sq.showContent()==''});
        if(freeSpace.length==0){
            return false;
        }
        else {return true;}
      }

    return {showBoard,editBoard,clearBoard,winning,availableSpace}
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
    let winner = '';
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
            gameBoard.winning(computer.showToken());
            if(checkWinner()){return}
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
    function checkWinner(){
        if(winner==player.showToken()){
            interface.displayWinner('Player');
            return true;
        }
        else if(winner==computer.showToken()){
            interface.displayWinner('Computer');
            return true;
        }
        else if(!gameBoard.availableSpace()){
            interface.displayWinner('Draw');
            return true;
        }
        else {return false;}
    }
    
    function setWinner(whoWins){winner=whoWins;}

    return {xChosen,oChosen,whoseTurn,setCurrentTurn,checkWinner,setWinner};
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
        if(turn.checkWinner()){return}
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
    turn.setWinner('');
    gameBoard.clearBoard();
    interface.updateScreen(gameBoard);
    interface.updateTurn();   
}

function squareClicked(e){
    if(turn.checkWinner()){return}
    if(turn.whoseTurn()=='player'){
        let success = player.makeMove(e.target.id);
        interface.updateScreen(gameBoard);
        gameBoard.winning(player.showToken());
        if(turn.checkWinner()){return}
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
    let announceWinner = document.querySelector('.announceWinner');
    let overlay = document.querySelector('.overlay');

    const xBtn = document.querySelector('#X');
    xBtn.addEventListener('click',turn.xChosen);

    const oBtn = document.querySelector('#O');
    oBtn.addEventListener('click',turn.oChosen);

    const exitBtn = document.querySelector('.exit');
    exitBtn.addEventListener('click',removeWinner);

    let winner = document.querySelector('#winner');

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

    function displayWinner(who){
        announceWinner.classList=Array.from(announceWinner.classList).shift();
        overlay.classList=Array.from(overlay.classList).shift();
        if(who=='Draw'){
            winner.innerText = who;
        }
        else{winner.innerText = who + " Wins !";}
    }

    function removeWinner(){
        winner.innerText = '';
        newGame();
        announceWinner.classList += ' hide';
        overlay.classList += ' hide';
    }

    return {updateScreen,updateTurn,displayWinner};
})();
