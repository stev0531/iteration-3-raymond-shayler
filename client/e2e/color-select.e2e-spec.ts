import {ColorSelectPage} from "./color-select.po";

import {browser, by} from 'protractor';


// Note that these tests seem prone to failure if they have been run multiple times.

describe('color-select-page', () => {
    let page: ColorSelectPage;

    beforeEach(() => {
        page = new ColorSelectPage();
        page.navigateTo();
    });

    it('should have six different colored rectangles', () => {
        expect(page.getElementById("red")).toBeTruthy();
        expect(page.getElementById("orange")).toBeTruthy();
        expect(page.getElementById("yellow")).toBeTruthy();
        expect(page.getElementById("green")).toBeTruthy();
        expect(page.getElementById("blue")).toBeTruthy();
        expect(page.getElementById("purple")).toBeTruthy();
    });

    it('should click 4 colors and travel to the play page', () => {
        page.clickByCSS('red');
        page.clickElement('orange');
        page.clickElement('blue');
        page.clickElement('purple');

        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
    });

    it('should click 4 colors and cycle through which player is choosing', () => {
        expect(page.getElementsByClass('color-select-title').getText()).toContain('Player 1');
        page.clickElement('red');
        expect(page.getElementById('color-select-title').getText()).toContain('Player 2');
        page.clickElement('orange');
        expect(page.getElementById('color-select-title').getText()).toContain('Player 3');
        page.clickElement('blue');
        expect(page.getElementById('color-select-title').getText()).toContain('Player 4');
        page.clickElement('purple');

        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
    });

});
