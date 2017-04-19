class GameMgr extends PageMgr{

    constructor() {
        super('game');
        this.game = new MemoryCardGame();
        this.$gameElement = $('.game-panel');
        $('#start-game').on('click', (event) => this.onStart(event));
        $('#retry').on('click', () => this.onRetry());

    }

    activate() {
        if(this.game.status === MemoryCardGame.STATUS_SUSPENDED){
            this.game.status = MemoryCardGame.STATUS_NOT_STARTED;
            this.game.start();
        }
        super.activate();
    }

    deactivate() {
        if(this.game.status === MemoryCardGame.STATUS_NOT_STARTED){
            this.game.status = MemoryCardGame.STATUS_SUSPENDED;
        } else {
            this.game.finish();
            this.$gameElement.children('.game-description').show();
        }
        super.deactivate();
    }

    onStart(event) {
        let level = event.target.dataset.level;
        if (level) {
            this.$gameElement.children('.game-description').hide().parent().removeClass('background-image');
            this.$gameElement.find('.game-frame').show();
            this.game.newGame(level);
        }
    }

    onRetry() {
        this.game.finish();
        this.game.newGame();
    }

}