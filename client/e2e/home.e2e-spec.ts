import {HomePage} from './home.po'

describe('Home Page', () => {
    let page: HomePage;


    beforeEach(() => {
        page = new HomePage();
        page.navigateTo();
    });

    it("should have a logo at the top of the screen", () =>{
        expect(page.getElementById("logo")).toBeTruthy();
    });

    it("should have four buttons", () =>{
    expect(page.getElementById("play-button")).toBeTruthy();
    expect(page.getElementById("card-button")).toBeTruthy();
    expect(page.getElementById("deck-button")).toBeTruthy();
    expect(page.getElementById("help-button")).toBeTruthy();
});
});
