import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class HelpPage {
    navigateTo() {
        return browser.get('/help');
    }

    getPageTitle(){
        let title = element(by.id('help-title')).getText();
        return title;
    }
}
