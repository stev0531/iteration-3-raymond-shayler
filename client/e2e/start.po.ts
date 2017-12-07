import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class StartPage {
    navigateTo() {
        return browser.get('/start');
    }

    clickButton(id: string) {
        let e = element(by.id(id));
        e.click();
    }

    clickElement(id: string) {
        let e = element(by.id(id));
        e.click();
    }

    getElementById(id: string) {
        let e = element(by.id(id));
        return e;
    }

    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }

    getPageTitle(id: string){
        let title = element(by.id(id)).getText();
        return title;
    }

    typeALimit(limit: number) {
        let input = element(by.id('inputLimit'));
        input.click();
        input.sendKeys(limit);
    }

    arrowUp(num: number) {
        for(let i=0;i<num;i++){
            browser.actions().sendKeys(Key.ARROW_UP).perform();
        }

    }

    getActivePage(classId: string) {
        return element(by.className(classId));
    }

}
