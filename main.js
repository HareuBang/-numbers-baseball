const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $span = document.querySelector('span');

let computer = fourDigitNumber();

// 컴퓨터 숫자 4자리 설정
function fourDigitNumber() {
  let randomNumbers = [];

  while(randomNumbers.length < 4){
    let num = Math.floor(Math.random() * 10);

    if(!randomNumbers.includes(num))
      randomNumbers.push(num);
  }

  return randomNumbers;
}

// 버튼 클릭 시
$button.addEventListener('click', () => {
  event.preventDefault();

  let player = inputValidation($input.value);

  if(player) {
    let [ strike, ball, out ] = [...guessNumber(player)]
    
    if(strike === 4){
      $span.innerHTML += "!! Home run !! <br/>게임을 다시 시작합니다."

      setTimeout(() => {
        resetGame();
      }, 1500)
    } else {
      $span.innerHTML += `inputNumber: ${player} / Strike: ${strike} Ball: ${ball} / Out: ${out} // computer ${computer}<br/>`
    }

  } else {
    alert("중복되지 않는 4자리 숫자를 입력해주세요.");
    $input.value = "";
    $input.focus();
  }
})

// 입력 값 검사
function inputValidation(inputValue) {
  let inputList = [...new Set(inputValue.split('').filter(numStr => numStr !== " "))].map(Number);
  
  return inputList.length === 4 && inputList.every(num => 0 <= num && num <= 9)
    ? inputList
    : false
}

// 숫자 판별(스트라이크, 볼, 아웃)
function guessNumber(player) {
  let result = [0, 0, 0];

  player.forEach((num, idx) => {
    let guess = computer.indexOf(num);
    
    if(guess === -1)
      result[2]++;
    else if(guess !== idx)
      result[1]++;
    else
      result[0]++;
  })

  return result;
}

function resetGame() {
  $input.value = "";
  $input.focus();
  $span.innerHTML = "";
  computer = fourDigitNumber();
}