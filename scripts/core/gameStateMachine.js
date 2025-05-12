const gameStates = {
  MENU: "MENU",
  PLAYING: "PLAYING",
};

class GameStateMachine {
  constructor() {
    this.state = gameStates.MENU;
    this.pstate = null;

    this.controller = null;
  }

  setState(state) {
    this.state = state;
  }

  update(dt) {
    if (this.state != this.pstate) {
      switch (this.state) {
        case gameStates.MENU:
          this.controller = new MenuController();
          break;
        case gameStates.PLAYING:
          this.controller = new PlayController();
          break;
        default:
          this.controller = new MenuController();
          break;
      }
      this.pstate = this.state;
    }

    this.controller.update(dt);
  }
}
