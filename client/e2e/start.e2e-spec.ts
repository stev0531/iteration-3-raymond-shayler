import {StartPage} from "./start.po";
import {browser, by} from "protractor";

describe('start-page', () => {
    let page: StartPage;

    beforeEach(() => {
        page = new StartPage();
        page.navigateTo();
    });
    it('should have a dropdown selection and play button', () => {
        expect(page.getElementsByClass(".deck-dropdown")).toBeTruthy();
        expect(page.getElementsByClass('.dummy-play-button')).toBeTruthy();
    });

    it('should select a deck, input a limit, and go to the play page', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(4);
        page.getActivePage('selections').element(by.className('actual-play-button')).click();
        expect(page.getActivePage("active-kb-page").element(by.className("card-word")).getText()).toContain('Alliteration');
    });

    it('should input a limit of one card and pop up with the results after got-it has been clicked', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(1);
        page.getActivePage('selections').element(by.className('actual-play-button')).click();
        expect(page.getElementsByClass('entire-card')).toBeTruthy();
    });

    it('should input a limit over max but not go over the max', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(8);
        page.getActivePage('selections').element(by.className('actual-play-button')).click();

        let gotItButton = page.getActivePage("active-kb-page").element(by.className("got-it-button"));

        let i:number;
        for(i=0;i<4;i++){
            gotItButton.click();
        }
        expect(page.getElementsByClass('entire-card')).toBeTruthy();
        expect(page.getElementById("player1-score").getText()).toContain("10");
        expect(page.getElementById("player2-score").getText()).toContain("10");
    });

    it('should input a limit of -3 but show 3 cards', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(-3);
        page.getActivePage('selections').element(by.className('actual-play-button')).click();

        let gotItButton = page.getActivePage("active-kb-page").element(by.className("got-it-button"));
        let i:number;
        for(i=0;i<3;i++){
            gotItButton.click();
        }
        expect(page.getElementsByClass('entire-card')).toBeTruthy();
        expect(page.getElementById("player1-score").getText()).toContain("10");
        expect(page.getElementById("player2-score").getText()).toContain("5");
    });

});
