import {CardListPage} from "./card-list.po";
import {browser, by} from 'protractor';


describe('card-list-page', () => {
   let page: CardListPage;

   beforeEach(() => {
       page = new CardListPage();
       page.navigateTo();
   });

    //No longer relevant
   // it('should highlight title header', () => {
   //     expect(page.getPageTitle()).toContain('Card');
   // });


    it('should have four buttons', () => {
        expect(page.getElementById("Select-Button")).toBeTruthy();
        expect(page.getElementById("Delete-Button")).toBeTruthy();
        expect(page.getElementById("Add-Cards")).toBeTruthy();
        expect(page.getElementById("Delete-Cards")).toBeTruthy();
    });

    it("should display card info when clicked in view mode", () =>{
            page.clickByCSS('.simple-card');
            browser.sleep(100);
            expect(page.getElementsByClass("pop-in-card-entire")).toBeTruthy();
            expect(page.getElementsByClass("pop-in-card-desc").isPresent).toBeTruthy();
            page.getElementsByClass("pop-in-card-desc").getText().then(function(inpString: string){
                        (expect(inpString.length)).toBeGreaterThan(1);},
                function (inpString: string){
                //if we reach here, the promise failed.
                expect(0).toEqual(1);});
        page.getElementsByClass("pop-in-card-content").getText().then(function(inpString: string){
                (expect(inpString.length)).toBeGreaterThan(1);},
            function (inpString: string){
                //if we reach here, the promise failed.
                expect(0).toEqual(1);});
        });

    it("should select cards when in select mode", () =>{


    });
});
