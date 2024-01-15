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

    return {showBoard,editBoard}
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
    function assignEmblem(choice){
        if(choice == 'X'){
            player.setToken('X');
            computer.setToken('O');
        }
        if(choice == 'O') {
            player.setToken('O');
            computer.setToken('X');
        }
    }

    return {assignEmblem};
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


choice = 'O'
turn.assignEmblem(choice);
console.log(player.showToken());
console.log(computer.showToken());
console.log(gameBoard.showBoard());
player.makeMove(2);
computer.makeMove();
console.dir(gameBoard.showBoard());


