const X_CLASS='x'
const CIRCLE_CLASS='circle'
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const WINNING_COMBINATIONS=[
    [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],
    [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],
    [0,5,10,15],[3,6,9,12]
]
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const winningMessageElement=document.getElementById('winningMessage')
const restartButton=document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click',startGame)

function startGame(){
    circleTurn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click',handleclick,{once:true})
    })    
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleclick(e){
    const cell=e.target
    const currentClass=circleTurn ? CIRCLE_CLASS:X_CLASS
    //place_mark
    placeMark(cell,currentClass)
    //check_win
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{  
        //switch_turns
        swapTurns()
        //hover_mark(current)
        setBoardHoverClass()
    }
    //check_draw
    //switch_turns
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText=`Draw!`
    }
    else{
        winningMessageTextElement.innerText=`${circleTurn ? "O's":"X's"}Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn=!circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
