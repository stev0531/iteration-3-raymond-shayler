import {CardPage} from "./card.po";
import {browser, by} from "protractor";

describe('card-component', () => {
    let page: CardPage;

    beforeEach(() => {
        page = new CardPage();
        page.navigateTo();
    });

    it('should display no hints in initial state',() => {
        expect(page.getActivePage().element(by.className("synonym-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("antonym-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("general-sense-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("example-usage-cont")).getText()).toEqual('');
    });

    //this test is still being written.

    // it('should display one hint after the hint button has been clicked once', () => {
    //     let hintButton = page.getActivePage().element(by.className("hint-button"));
    //     hintButton.click();
    //     expect(page.calcHints()).toEqual(1);
    // });


    it('should display all 4 hints after the hint button has been clicked 4 times', () => {
        let hintButton = page.getActivePage().element(by.className("hint-button"));
        hintButton.click();
        hintButton.click();
        hintButton.click();
        hintButton.click();
        browser.sleep(500);
        expect(page.getActivePage().element(by.className("synonym-cont")).getText()).toContain('artistic');
        expect(page.getActivePage().element(by.className("antonym-cont")).getText()).toContain('Efferant');
        expect(page.getActivePage().element(by.className("general-sense-cont")).getText()).toContain('reading for pleasure');
        expect(page.getActivePage().element(by.className("example-usage-cont")).getText()).toContain('Rosenblatt');
    });


});
