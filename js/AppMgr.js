class AppMgr {
    constructor() {
        this.currentPageManager = null;
        this.pages = [];
        this.pages.push(new GameMgr());
        this.pages.push(new ScoreMgr());
        this.pages.push(new FeedbackMgr());
        for(let i = 0; i < this.pages.length; i++){
            $($('.nav').children()[i])
                .on('click', 'a', () => this.changePage(this.pages[i]));
        }
        this.changePage(this.pages[0]);
    }

    changePage(newPageMgr) {
        if (this.currentPageManager === newPageMgr) {
            return;
        }
        if (this.currentPageManager) {
            this.currentPageManager.deactivate();
        }

        newPageMgr.activate();
        this.currentPageManager = newPageMgr;
    }
}