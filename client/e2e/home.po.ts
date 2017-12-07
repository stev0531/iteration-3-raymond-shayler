import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class HomePage{


    navigateTo() {
        return browser.get('/home');
    }

    getElementById(htmlId: string){
        return element.all(by.id(htmlId))
    }

}
