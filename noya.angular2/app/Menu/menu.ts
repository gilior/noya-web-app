﻿import { Component, Injector } from '@angular/core'
import * as services from "../services/services"
import * as dal from "../dal/models"

import { Router, NavigationEnd } from '@angular/router'
import { BaseComponent } from '../common/base.component'
import { pageNameService } from '../services/page-name.service'
@Component({ selector: 'main-menu', moduleId: module.id, templateUrl: './menu.html', styleUrls: ['./menu.css'] })

export class MenuComponent extends BaseComponent {
    currentPathName: string;
    menuItems: dal.MenuItem[];
    currentView: string;
    headerImage: string;
    constructor(private dataService: services.DataService, private cacheManager: services.CacheManager, private router: Router, private injector: Injector, private pn: pageNameService, private yts: services.youTubeService) {
        super(injector);

    }

    isCollapsed: boolean = true;

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









}