import {Component, OnInit, Injector, HostListener} from '@angular/core'
import {BaseComponent} from '../../common/base.component'
import {TraverseItem, DataRequest, Language, TraverseItemResponse, DataError} from '../../dal/models'
import {DataService, CacheManager} from '../../services/services'
import {UtiltyService} from '../../services/utitlity'

import {IAppState} from '../../../store/states/state';
import {NgRedux, select} from '@angular-redux/store';
import {CARDS_LOADED} from '../../../store/const';
import {Observable} from 'rxjs/Observable';
import {Action} from '../../../store/actions/actions';


@Component({
  selector: 'cards-manager',
  templateUrl: './cards-manager.component.html',
  styleUrls: ['./cards-manager.component.scss']
})

export class CardsManagerComponent extends BaseComponent implements OnInit {
  @select('cards') cards$: Observable<Array<TraverseItem>>;
  traverseItems: TraverseItem[];
  trios: Array<Array<TraverseItem>>;
  dous: Array<Array<TraverseItem>>;

  constructor(private dataService: DataService, private cacheManager: CacheManager, private injector: Injector, private utiltyService: UtiltyService, public store: NgRedux<IAppState>, private  action: Action) {
    super(injector);
    this.trios = new Array<Array<TraverseItem>>();
    this.dous = new Array<Array<TraverseItem>>();
    this.cards$.subscribe((val) => {
      console.log(val);
    })
  }

  @HostListener('window:resize')
  onResize() {

  }

  get showTrio(): boolean {
    return this.utiltyService.IsDesktop || this.utiltyService.IsTablet;
  }

  get showDuo(): boolean {
    return this.utiltyService.IsPhablet;
  }

  get showOne(): boolean {
    return this.utiltyService.IsMobile;
  }


  ngOnInit() {
    let lang: Language = +this.cacheManager.GetFromCache('lang', '0');
    let req: DataRequest = {Language: lang}
    this.dataService.ConnectToApiData(req, 'GetTraverseItems').subscribe((res: TraverseItemResponse) => {
        this.action.postCards(res.TraverseItems);
      },
      (err: DataError) => {
      }
    );
  }
}



