import {StartPage} from "./start.po";
import {browser, by} from "protractor";

describe('play-page', () => {
    let page: StartPage;

    beforeEach(() => {
        page = new StartPage();
        page.navigateTo();
    });

    it('should have a dropdown selection and play button', () => {
        expect(page.getElementsByClass(".deck-selection")).toBeTruthy();
        expect(page.getElementsByClass('.play-button')).toBeTruthy();
    })

});
