import {DeckPage} from "./deck.po";
import {browser, by, protractor} from 'protractor';
import {DeckListPage} from "./deck-list.po";

describe('deck-page', () => {
    let page: DeckPage;
    let deckListPage: DeckListPage;

    beforeEach(() => {
        page = new DeckPage();
    });

    it('should have the correct header', () => {
        page.navigateTo('59de8a1f012e92ce86a57176');
        browser.sleep(1000);
        expect(page.getDeckHeader()).toEqual("test deck 1");
    });

    it('should have three buttons', () => {
        page.navigateTo('59de8a1f012e92ce86a57176');

        expect(page.getElementById("edit")).toBeTruthy();
        expect(page.getElementById("delete")).toBeTruthy();
        expect(page.getElementById("cardDialog")).toBeTruthy();
    });

    it('should have a synonym, antonym, general usage, and example usage for each card.', () => {
        page.navigateTo('59de8a1f012e92ce86a57176');
        browser.sleep(1000);
        page.getAllCards().each( e => {
           expect(e.element(by.className("card-synonym")).getText()).toContain("Synonym");
           expect(e.element(by.className("card-antonym")).getText()).toContain("Antonym");
           expect(e.element(by.className("card-general-sense")).getText()).toContain("General sense");
           expect(e.element(by.className("card-example-usage")).getText()).toContain("Example usage");

        });
    });

    it('should add one card', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');
        page.getAllCards().count().then( beforecount => {
            page.addCard('Word test', 'Synonym test', 'Antonym test', 'General Sense test', 'Example Usage test');
            browser.sleep(500); // wait for card to be added to list
            expect(page.getAllCards().count()).toEqual(beforecount + 1);
        });
    });

    it('should add three cards', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');
        page.getAllCards().count().then( beforecount => {
            page.addCard('Word test 1', 'Synonym test 1', 'Antonym test 1', 'General Sense test 1', 'Example Usage test 1');
            browser.sleep(3000); // wait for stuff
            page.addCard('Word test 2', 'Synonym test 2', 'Antonym test 2', 'General Sense test 2', 'Example Usage test 2');
            browser.sleep(3000); // wait for stuff
            page.addCard('Word test 3', 'Synonym test 3', 'Antonym test 3', 'General Sense test 3', 'Example Usage test 3');
            browser.sleep(3000); // wait for cards to be added to list
            expect(page.getAllCards().count()).toEqual(beforecount + 3);
        });
    });

    it('should add one card and check that its still there', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');
        page.getAllCards().count().then( beforecount => {
            page.addCard('Word test', 'Synonym test', 'Antonym test', 'General Sense test', 'Example Usage test');
            page.navigateTo('59de8a1f012e92ce86a57177');
            expect(page.getAllCards().count()).toEqual(beforecount + 1);
        });
    });

    it('should add a random card and check that its there', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');

        var word = page.randomText(10);
        var synonym = page.randomText(10);
        var antonym = page.randomText(10);
        var generalsense = page.randomText(30);
        var exampleusage = page.randomText(30);

        page.addCard(word, synonym, antonym, generalsense, exampleusage);
        browser.sleep(500); // wait for card to be added to list

        let e = page.getAllCards().last();
        expect(e.element(by.className("card-word")).getText()).toEqual(word);
        expect(e.element(by.className("synonym-cont")).getText()).toEqual(synonym);
        expect(e.element(by.className("antonym-cont")).getText()).toEqual(antonym);
        expect(e.element(by.className("general-sense-cont")).getText()).toEqual(generalsense);
        expect(e.element(by.className("example-usage-cont")).getText()).toEqual(exampleusage);

    });

    it('should edit the deck name and cancel, leaving the name unchanged', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');

        var startingName = page.getDeckHeader();

        page.changeName('new-deck-name', false);

        expect(page.getDeckHeader()).toEqual(startingName);
    });

    it('should edit the deck name and save the changes, checking that it updated', () => {
        page.navigateTo('59de8a1f012e92ce86a57177');

        var startingName = page.getDeckHeader();

        page.changeName('new-deck-name', true);

        expect(page.getDeckHeader()).toEqual('new-deck-name');
    });

    it('should press the trash button and then press cancel, leaving the page unchanged', ()=>{
        page.navigateTo('59de8a1f012e92ce86a57177');
        page.clickButton('delete');
        page.clickButton('cancel-button');

        expect(page.getDeckHeader()).toEqual('new-deck-name');
    });

    it('should press the trash button, then delete, and be taken to the deck list page which does not contain the deleted deck', () =>{
    page.clickButton('delete');
    page.clickButton('delete-button');
    deckListPage = new DeckListPage;

    expect((deckListPage.getAllDeckNames()).toLocaleString().includes('new-deck-name')).toEqual(false);
    });

});
