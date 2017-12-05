import {CardListPage} from "./card-list.po";
import {DeckPage} from "./deck.po";
import {browser, by} from 'protractor';
import {isNullOrUndefined, isUndefined} from "util";


// Note that these tests seem prone to failure if they have been run multiple times.

describe('card-list-page', () => {
   let page: CardListPage;
   let deckPage: DeckPage;

   beforeEach(() => {
       page = new CardListPage();
       page.navigateTo();
   });

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

    //This test checks that adding the word Obstinate to a deck that already contains this word will not change its size.
    it("should not add a selected card to a deck when the card is already present in the deck", () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Obstinate");
        page.clickElement("Add-Cards");

        deckPage = new DeckPage();
        deckPage.navigateTo("b2956f25be16349683be4461");
        expect(deckPage.getAllCards().count()).toEqual(4);
    });

    // Note that this test seems to randomly fail about 25% of the time or so
    it("should add selected cards when cards are selected and the add button is pressed", () =>{

        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Add-Cards");
        deckPage = new DeckPage();

        deckPage.navigateTo("b2956f25be16349683be4461");
        browser.waitForAngular();

        expect(deckPage.getAllCards().count()).toEqual(6);
    });

    //This test deletes the cards we just added in the previous test
    it("Should delete selected cards then cards are selected and the delete button is pressed", () => {

        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Delete-Cards");

        deckPage.navigateTo("b2956f25be16349683be4461");
        expect(deckPage.getAllCards().count()).toEqual(4);
    });

    it("Should show a dialog when cards are added to a deck", () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Add-Cards");
        expect(page.getElementById("pop-in-card")).toBeTruthy();

    });

    it("Should show a dialog when cards are deleted from a deck", () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Delete-Cards");
        expect(page.getElementById("pop-in-card")).toBeTruthy();

    });

    it("Should show the selected cards in the changes dialog", () => {
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Add-Cards");
        page.getElementsByClass("card-names").getText().then(function(inpString: string) {
            (expect (inpString.includes("Cloze")).toBe(true));
            (expect (inpString.includes("Automaticity")).toBe(true));
        });
    });

    it("Should allow users to navigate to a deck page when 'Show Changes' is pressed on the dialog", () =>{
        deckPage = new DeckPage();
        page.clickElement("deck-dropdown");
        page.clickElement("testdeck3");
        page.clickElement("Select-Button");
        page.clickElement("Cloze");
        page.clickElement("Automaticity");
        page.clickElement("Add-Cards");

        page.clickElement('deck-page-button')

        expect(deckPage.getAllCards().count()).toEqual(6);
    });

    it("Should click on a card, press the trash icon, and press cancel, leaving the page unchanged", () => {

        page.clickElement('Cloze');
        browser.sleep(500);
        page.clickElement('trash-button')
        browser.sleep(500);
        page.clickElement('cancel-delete-button');

        expect(page.getElementById('Abominable').count()).toBe(1)
    });

    it("Should click on a card, press the trash icon, press delete, and the card will not appear on the page", () => {
        page.clickElement('Abominable');
        browser.sleep(500);
        page.clickElement('trash-button');
        browser.sleep(500);
        page.clickElement('delete-card-button');
        browser.sleep(3000);
        expect(page.getElementById('Abominable').count()).toBe(0);
    });

});
