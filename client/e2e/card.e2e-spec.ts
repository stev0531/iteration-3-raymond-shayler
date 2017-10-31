import {CardPage} from "./card.po";
import {by} from "protractor";

describe('play-page', () => {
    let page: CardPage;

    beforeEach(() => {
        page = new CardPage();
        page.navigateTo();
    });

    it('should have none of the hints displayed',() => {
        expect(page.getActivePage().element(by.className("synonym-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("antonym-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("general-sense-cont")).getText()).toEqual('');
        expect(page.getActivePage().element(by.className("example-usage-cont")).getText()).toEqual('');
    });

    it('should display all 4 hints after the hint button has been clicked 4 times', () => {
        let hintButton = page.getActivePage().element(by.className("hint-button"));
        hintButton.click();
        hintButton.click();
        hintButton.click();
        hintButton.click();
        expect(page.getActivePage().element(by.className("synonym-cont")).getText()).toContain('artistic');
        expect(page.getActivePage().element(by.className("antonym-cont")).getText()).toContain('Efferant');
        expect(page.getActivePage().element(by.className("general-sense-cont")).getText()).toContain('reading for pleasure');
        expect(page.getActivePage().element(by.className("example-usage-cont")).getText()).toContain('Rosenblatt');
    });


});
