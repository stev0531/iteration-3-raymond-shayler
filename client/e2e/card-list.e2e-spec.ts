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
        expect(page.getElementsByClass(".mode-button")).toBeTruthy();
        expect(page.getElementsByClass(".mode-button-add")).toBeTruthy();
        expect(page.getElementsByClass(".mode-button-edit")).toBeTruthy();
        expect(page.getElementsByClass(".mode-button-create")).toBeTruthy();
        expect(page.getElementsByClass(".mode-button-delete")).toBeTruthy();
    });

    it("should display card info when clicked", () =>{
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
});
