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
            return console.log('cannot make move');
        }
        board.map((cell)=>{
            if(cell.position == position){
                cell.changeContent(token);
                return cell.showContent();
            }
            else return cell.showContent();
        });
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
    return {showBoard,editBoard,winning}
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
            turn = 'computer';
        }
    }

    function setCurrentTurn(who){
        turn = who;
    }

    function whoseTurn(){
        return turn;
    }
    return {assignEmblem,whoseTurn,setCurrentTurn};
})();


const player = (function(){
    let token = '';
    function showToken(){return token;}
    function setToken(choice){token = choice;}
    function makeMove(position){
        if (token!=''){
        gameBoard.editBoard(token,position);}
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


//event - player clicked an emblem
choice = 'O'
turn.assignEmblem(choice);
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
