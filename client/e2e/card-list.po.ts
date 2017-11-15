import {browser, element, by} from 'protractor';
import {Key, WebElement, WebDriver, } from "selenium-webdriver";


export class CardListPage {
    navigateTo() {
        return browser.get('/card-list');
    }

    getPageTitle(){
        let title = element(by.css('.page-title')).getText();
        return title;
    }


    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }


    getElementById(htmlId: string){
        return element.all(by.id(htmlId))
    }
    getAllDecks(){
        return this.getElementsByClass('deck');
    }


    clickByCSS(selector: string) {
        let e = element(by.css(selector));
        e.click();
    }

    typeInput(input: string, text: string, enter?: boolean) {
        let inputElement = element(by.id(input));
        inputElement.click();
        inputElement.sendKeys(text);
        if(enter) {
            inputElement.sendKeys(Key.ENTER);
        }
    }


    // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    randomText(length: number): string {
        var text: string = "";
        var possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    clickElement(id: string) {
        let e = element(by.id(id));
        e.click();
    }

}
