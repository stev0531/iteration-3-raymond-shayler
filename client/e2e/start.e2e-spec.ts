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

    it('should select a deck, input a limit, pick how many players, and go to the select color page ', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(6);
        page.clickElement("player-num-select");
        page.clickElement("2");
        page.getActivePage('selections').element(by.className('actual-play-button')).click();
        expect(page.getElementById('select-color-title').getText()).toContain('Player 1 Select Your Color!');
    });

    it('should input a limit of one card and pop up with the results after got-it has been clicked', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(1);
        page.clickElement("player-num-select");
        page.clickElement("2");
        page.getActivePage('selections').element(by.className('actual-play-button')).click();
        expect(page.getElementById('select-color-title').getText()).toContain('Player 1 Select Your Color!');
    });

    it('should input a limit over max but not go over the max', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(8);
        page.clickElement("player-num-select");
        page.clickElement("2");
        page.getActivePage('selections').element(by.className('actual-play-button')).click();
        page.getElementById('red').click();
        page.getElementById('last-orange').click();

        let gotItButton = page.getActivePage("active-kb-page").element(by.className("got-it-button"));

        let i:number;
        for(i=0;i<6;i++){
            gotItButton.click();
        }
        expect(page.getElementsByClass('entire-card')).toBeTruthy();
        expect(page.getElementById("player1-score").getText()).toContain("15");
        expect(page.getElementById("player2-score").getText()).toContain("15");
    });

    it('should input a limit of -3 but not go to color page', () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");

        page.typeALimit(-3);
        page.clickElement("player-num-select");
        page.clickElement("2");
        expect(page.getElementsByClass('.dummy-play-button')).toBeTruthy();

        // page.arrowUp(6);
        // browser.sleep(1000);
        // page.getActivePage('selections').element(by.className('actual-play-button')).click();
        // page.getElementById('red').click();
        // page.getElementById('last-orange').click();
        //
        // let gotItButton = page.getActivePage("active-kb-page").element(by.className("got-it-button"));
        // let i:number;
        // for(i=0;i<3;i++){
        //     gotItButton.click();
        // }
        // expect(page.getElementsByClass('entire-card')).toBeTruthy();
        // expect(page.getElementById("player1-score").getText()).toContain("10");
        // expect(page.getElementById("player2-score").getText()).toContain("5");
    });

});
