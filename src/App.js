import { MissionUtils, Console } from "@woowacourse/mission-utils";

class App {
  async play() {
    Console.print("숫자 야구 게임을 시작합니다.");
    let computer = this.initializeGame();
    while (true) {
      const input = await this.getInput();

      const isWon = this.playGame(computer, input);

      if (isWon) {
        Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");

        if (await this.askForRestart()) {
          computer = this.initializeGame();
        } else {
          Console.print("게임 종료");
          break;
        }
      }
    }
  }

  async getInput() {
    const input = await Console.readLineAsync("숫자를 입력해주세요 : ");
    if (input.length !== 3) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }

    return input;
  }

  async askForRestart() {
    Console.print("게임을 재시작하려면 1, 종료하려면 2를 입력하세요.");
    const endInput = await Console.readLineAsync();
    if (endInput !== "1" && endInput !== "2") {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }

    return endInput === "1";
  }

  initializeGame() {
    const computer = [];
    while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    return computer;
  }


  playGame(computer, input) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < computer.length; i++) {
      if (computer[i].toString() === input[i]) {
        strike++;
      } else if (computer.includes(parseInt(input[i]))) {
        ball++;
      }
    }

    if (strike === 0 && ball === 0) {
      Console.print("낫싱");
    } else if (strike === 3) {
      Console.print("3스트라이크");
      return true;
    } else if (ball !== 0 && strike !== 0) {
      Console.print(`${ball}볼 ${strike}스트라이크`);
    } else if (ball > 0) {
      Console.print(`${ball}볼`);
    } else if (strike > 0) {
      Console.print(`${strike}스트라이크`);
    }

    return false;
  }
}

export default App;
