import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Home} from "./home";
import {of} from "rxjs/index";
import {NgRedux} from "@angular-redux/store";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Actions} from "../../../store/actions/actions";
import {UtiltyService} from "../../services/utitlity";
import {CacheManager} from "../../services/services";

describe('home component', () => {
  let mockNgRedux = jasmine.createSpyObj(['select'])
  let fixture: ComponentFixture<Home>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Home],
      providers: [{provide: NgRedux, useValue: mockNgRedux}, Actions, UtiltyService, CacheManager],
      schemas: [NO_ERRORS_SCHEMA]// Defines a schema that will allow any property on any element
    })
    mockNgRedux.select.and.returnValue(of('some text'));
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
  })

  it('should display home page txt (some text) inside div inner html', () => {
    let htmlDivElement = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    let htmlDivElement_inner_html = htmlDivElement.innerHTML;
    expect(htmlDivElement_inner_html).toEqual('some text');

  })


})
