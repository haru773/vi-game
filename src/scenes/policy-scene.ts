import { CONST } from "../const/const";
import { Player, Policy } from "../objects/Player";
import { createTextAuto } from "../utils/createMenu";
import { Reader, speak } from "../utils/reader";

export class PolicyScene extends Reader {
  private startKey: Phaser.Input.Keyboard.Key;
  private player: Player;
  constructor(player: Player) {
    super(
      [
        Policy.Balance,
        Policy.MoreFood,
        Policy.MoreEther,
        Policy.AllFood,
        Policy.AllEther,
      ],
      "PolicyScene"
    );
  }

  init(data: any): void {
    super.init(data);
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.player = data.player;
  }

  preload(): void {
    this.load.bitmapFont(
      "sysFont",
      "./assets/font/snakeFont.png",
      "./assets/font/snakeFont.fnt"
    );
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 60,
        "sysFont",
        "Policy",
        16
      )
    );
    createTextAuto(this);
  }

  update(): void {
    super.update();
    if (Phaser.Input.Keyboard.JustDown(this.confirmKey)) {
      console.log(this.currentChoice);
      var c = this.choices[this.currentChoice];
      this.player.changePolicy(c);
      speak("change policy to " + c);
      this.scene.start("HouseScene", { player: this.player });
      console.log("start");
    }
  }
}
