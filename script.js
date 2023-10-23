const boardButtons = document.querySelectorAll('.button-board');
const statusTxt = document.querySelector('#status');
const restartButton = document.getElementById('restartButton');
const texts=document.querySelectorAll('.btnText');
const winningMessage=document.getElementById('data-winning-message-text');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]
let circleTurn = true;
const X_Sign = 'X';
const CIRCLE_Sign = 'O';


function handleClick(e) {
  const button = e.target;
  const btnText = button.querySelector('.btnText');
  const currentClass = circleTurn ? CIRCLE_Sign : X_Sign;
  addSign(btnText, currentClass);


  if (checkWin(currentClass)) {
    statusTxt.textContent = `${currentClass} Wins!`;
  } else if (isDraw()) {
    statusTxt.textContent = 'It\'s a draw!';
  } else {
    circleTurn = !circleTurn;
    updatePlayer(currentClass);
  }
}


 function addClick(){
  boardButtons.forEach(button => {
    button.addEventListener('click', handleClick, { once: true });
  });
  
 }
addClick()

function addSign(btnText, currentClass) {
  btnText.textContent = currentClass;

}

function updatePlayer(currentClass) {
  if (currentClass === X_Sign) {
    statusTxt.textContent = `O's turn`;
  } else {
    statusTxt.textContent = `X's turn`;
  }
}

function restartGame() {
  boardButtons.forEach(button => {
    const btnText = button.querySelector('.btnText');
    btnText.textContent = "";
    btnText.value = "";
    statusTxt.textContent = `Play Now`
    addClick()
  });

}
restartButton.addEventListener('click', restartGame);


function checkWin(currentClass) {
  return winConditions.some(combination => {
    return combination.every(index => {
      return texts[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...boardButtons].every(button => {
    return button.querySelector('.btnText').textContent !== '';
  });
}