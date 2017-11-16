import {DeckListPage} from "./deck-list.po";
import {browser, by, protractor} from 'protractor';



describe('deck-list-page', () => {
    let page: DeckListPage;

    beforeEach(() => {
        page = new DeckListPage();
        page.navigateTo();
    });


    it('should highlight title header', () => {
        expect(page.getPageTitle()).toEqual('Decks');
    });

    it('should add one deck', () => {
        page.getAllDecks().count().then(beforecount => {
            page.addDeck("Test Deck");
            browser.sleep(500); // wait for stuff
            expect(page.getAllDecks().count()).toEqual(beforecount + 1);
        });
    });

    it('should add three decks', () => {
        page.getAllDecks().count().then(beforecount => {
            page.addDeck("Test Deck 1");
            browser.sleep(500); // wait for stuff
            page.addDeck("Test Deck 2");
            browser.sleep(500); // wait for stuff
            page.addDeck("Test Deck 3");
            browser.sleep(500); // wait for stuff
            expect(page.getAllDecks().count()).toEqual(beforecount + 3);
        });
    });

    it('should add one deck and check that its still there', () => {
        page.getAllDecks().count().then(beforecount => {
            page.addDeck("Test Deck");
            page.navigateTo();
            expect(page.getAllDecks().count()).toEqual(beforecount + 1);
        });
    });

    it('should add a random card and check that its there', () => {
        var name = page.randomText(10);

        page.addDeck(name)
        //browser.sleep(500); // wait for card to be added to list

        let e = page.getAllDecks().last();
        expect(e.element(by.className("deck-name")).getText()).toEqual(name);

    });


});
