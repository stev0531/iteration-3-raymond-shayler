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
        page.getElementById('red').click();
        page.getElementById('orange').click();
        page.getElementById('blue').click();
        page.getElementById('last-purple').click();

        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
    });

    it('should click 4 colors and cycle through which player is choosing', () => {
        expect(page.getElementById('select-color-title').getText()).toContain('Player 1 Select Your Color!');
        page.getElementById('red').click();
        expect(page.getElementById('select-color-title').getText()).toContain('Player 2 Select Your Color!');
        page.getElementById('orange').click();
        expect(page.getElementById('select-color-title').getText()).toContain('Player 3 Select Your Color!');
        page.getElementById('blue').click();
        expect(page.getElementById('select-color-title').getText()).toContain('Player 4 Select Your Color!');
        page.getElementById('last-purple').click();

        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
    });

});
