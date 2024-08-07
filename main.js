const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $p = document.querySelector('p');

let computer = generateRandomNumber();
let count = 0;

// 컴퓨터 숫자 4자리 설정
function generateRandomNumber() {
  let randomNumbers = [];

  while(randomNumbers.length < 4){
    let num = Math.floor(Math.random() * 10);

    // 중복 숫자 판별
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
    let [ strike, ...rest ] = [...guessNumber(player)]
    
    if(strike === 4){
      resetGame("Home Run");
    } else {
      outputResult(player, [strike, ...rest]);  
    }

  } else {
    alert("중복되지 않는 네 자리 숫자를 입력해주세요.");
    $input.value = "";
    $input.focus();
  }
})

// 결과 출력
function outputResult(player, [strike, ball, out]) {
  if(count <= 10){
    ++count;
    $input.value = ""
    $p.innerHTML += 
    `
    <table>
      <tr>
        <th rowspan="2">${count}</th>
        <th>Player</th>
        <th style="color:yellow">Strike</th>
        <th style="color:green">Ball</th>
        <th style="color:red">Out</th>
      </tr>
      <tr>
        <td>${player.join('')}</td>
        <td>${strike}</td>
        <td>${ball}</td>
        <td>${out}</td>
      </tr>
    </table>
    `
    if(count === 10)
      resetGame("Computer Win");
  }
}

// 입력 값 검사
function inputValidation(inputValue) {
  // new Set() 중복 제거 - split().filter() 공백 제거 - 숫자 타입 변환 map()
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

// 게임 초기화
function resetGame(message) {
  $p.innerHTML += `!! ${message} !! <br/>게임을 다시 시작합니다.`
  setTimeout(() => {
    $input.value = "";
    $input.focus();
    $p.innerHTML = "";
    computer = generateRandomNumber();
    count = 0;
  }, 1500)
}