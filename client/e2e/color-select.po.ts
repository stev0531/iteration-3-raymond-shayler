import {browser, element, by} from 'protractor';
import {Key, WebElement, WebDriver, } from "selenium-webdriver";


export class ColorSelectPage {
    navigateTo() {
        return browser.get('/color-select/59de8a1f012e92ce86a57176_14_4');
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

    getActivePage() {
        return element(by.className("active-kb-page"));
    }

    clickByCSS(selector: string) {
        let e = element(by.css(selector));
        e.click();
    }

    clickElement(id: string) {
        let e = element(by.id(id));
        e.click();
    }

}
