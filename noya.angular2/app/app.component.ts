﻿import { Component, OnInit, AfterViewInit, Injector, HostListener } from "@angular/core"

import * as services from "./services/services"
import * as dal from "./dal/models"

import { Router, NavigationEnd } from '@angular/router'
import { BaseComponent } from './common/base.component'
import { pageNameService } from './services/page-name.service'



//import * as blabla from './youmax/js/source_unpacked/jquery.youmax.js' 

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ['./app.component.css'],
    moduleId: module.id
})


export class AppComponent extends BaseComponent implements OnInit, AfterViewInit {
    currentPathName: string;
    menuItems: dal.MenuItem[];
    currentView: string;
    headerImage: string;
    constructor(private dataService: services.DataService, private cacheManager: services.CacheManager, private router: Router, private injector: Injector, private pn: pageNameService, private yts: services.youTubeService) {
        super(injector);

    }

    get pageName(): string { return this.pn.currentPageName; }
    public UpdateImage(imageUrl: string) {

    }
    goToContact() {
        this.router.navigate(['/contact']);
    }

    get dir(): string {
        let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew);
        if (l == dal.Language.Hebrew) return 'rtl'
        else return 'ltr'
    }

    goToContent(): void {
        var top = $('#content').offset().top;
        //console.log(div.scrollTop);
        $('html, body').animate({
            scrollTop: top
        }, 1000);
        //console.log(div.scrollTop);
    };

    changeMode() {
        if (this.pn.currentUrl.includes('galilu'))
            this.router.navigate(['/home']);
        else
            this.router.navigate(['galilu']);
    }

    get isHebrew(): boolean {
        let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew) == dal.Language.Hebrew;
        return l;
    }
    get galiluMessage(): string {

        return this.pn.currentUrl.includes('galilu') ? 'Noya Schleien' : 'To store'
    }
    //@HostListener('mouseenter') onMouseEnter() {
    //    this.kidsArtMessage = 'Coming Soon...';
    //}

    //@HostListener('mouseleave') onMouseLeave() {
    //    this.kidsArtMessage = 'Kids Art';
    //}


    get displayMenu(): boolean {
        //console.log('in displayMenu');
        return !this.pn.currentUrl.includes('galilu')
    }
    changeToEnglish() {
        this.cacheManager.StoreInCache("lang", dal.Language.English);
        document.location.reload();
    }
    changeToHebrew() {
        this.cacheManager.StoreInCache("lang", dal.Language.Hebrew);
        document.location.reload();
    }

    ngAfterViewInit() {

    }









    ngOnInit() {
        //var req: dal.DataRequest = { Language: dal.Language.Hebrew };
        //this.dataService.ConnectToApiData(req, "api/Data/GetMenuItems").
        //    subscribe(
        //    (dataresponse: dal.MenuResponse) => {

        //        this.menuItems = dataresponse.MenuItems
        //    },
        //    (error: dal.DataError) => console.error(error));



    }


}

