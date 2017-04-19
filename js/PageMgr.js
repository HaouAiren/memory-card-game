class PageMgr {

    constructor(className) {
        this.$navBtn = $(`.${className}-nav`);
        this.$pageElem = $(`.${className}-panel`);
    }

    activate() {
        this.$pageElem.show();
        this.$navBtn.addClass('active');
    }

    deactivate() {
        this.$pageElem.hide();
        this.$navBtn.removeClass('active');
    }
}