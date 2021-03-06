"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var base_component_1 = require("../common/base.component");
var services = require("../services/services");
var dal = require("../dal/models");
var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact(dataservice, cacheManager, dialogService, dialogeService, router, injector) {
        var _this = _super.call(this, injector) || this;
        _this.dataservice = dataservice;
        _this.cacheManager = cacheManager;
        _this.dialogService = dialogService;
        _this.dialogeService = dialogeService;
        _this.router = router;
        _this.injector = injector;
        _this.formErrors = {
            'name': '',
            'email': '',
            'content': ''
        };
        _this.validationMessages = {
            'name': {
                'required': 'name is required',
                'minlength': 'name must be at least 4 characters long',
                'maxlength': 'name cannot be more than 24 characters long',
            },
            'content': {
                'required': 'content is required',
                'minlength': 'content must be at least 4 characters long',
                'maxlength': 'content cannot be more than 24 characters long',
            },
            'email': {
                'required': 'email is required',
                'forbiddenName': 'invalid email format'
            }
        };
        return _this;
    }
    Contact.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    Contact.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.contactForm) {
            return;
        }
        this.contactForm = this.currentForm;
        if (this.contactForm) {
            this.contactForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    Contact.prototype.onValueChanged = function (data) {
        if (!this.contactForm) {
            return;
        }
        var form = this.contactForm.form;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    Contact.prototype.canDeactivate = function () {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.isSubmitting)
            return true;
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Cancel submitting?');
    };
    Object.defineProperty(Contact.prototype, "invalidEmail", {
        get: function () {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(this.message.Sender.Email);
        },
        enumerable: true,
        configurable: true
    });
    Contact.prototype.invalidEmailInput = function (email) { return (!email.valid && !email.pristine) || (email.valid && !email.pristine && this.invalidEmail); };
    Contact.prototype.ngOnDestroy = function () {
        this.submitted = false;
        this.displaySubmitError = false;
        this.isSubmitting = false;
    };
    Contact.prototype.ngOnInit = function () {
        this.submitted = false;
        this.displaySubmitError = false;
        this.isSubmitting = false;
        //this.message = { Content: 'sds', Date: new Date(), IP: '', Sender: { Email: 'sdsd@sdsd', Name: 'sdsd' } };
        this.message = { Content: '', Date: new Date(), IP: '', Sender: { Email: '', Name: '' } };
    };
    Object.defineProperty(Contact.prototype, "isEng", {
        get: function () {
            var l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew) == dal.Language.English;
            //console.log(l);
            return l;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Contact.prototype, "isHeb", {
        get: function () { return !this.isEng; },
        enumerable: true,
        configurable: true
    });
    ;
    Contact.prototype.onSubmit = function () {
        var _this = this;
        this.isSubmitting = true;
        var req = { Message: this.message, Language: dal.Language.Hebrew };
        this.dataservice.ConnectToApiData(req, 'api/Data/SendMessage')
            .subscribe(function (res) {
            _this.submitted = true;
            _this.isSubmitting = false;
        }, function (err) {
            _this.displaySubmitError = true;
            _this.isSubmitting = false;
        });
    };
    return Contact;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild('contactForm'),
    __metadata("design:type", forms_1.NgForm)
], Contact.prototype, "currentForm", void 0);
Contact = __decorate([
    core_1.Component({
        templateUrl: "./contact.html",
        moduleId: module.id,
        styleUrls: ['./contact.css'],
        animations: [
            core_1.trigger('invalidAnimation', [
                core_1.state('in', core_1.style({ transform: 'translateX(0)', opacity: 1 })),
                core_1.transition('void => *', [
                    core_1.style({ transform: 'translateX(-100%)', opacity: 0 }),
                    core_1.animate(500)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(500, core_1.style({ transform: 'translateX(-100%)', opacity: 0 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [services.DataService, services.CacheManager, services.DialogService, services.DialogService, router_1.Router, core_1.Injector])
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map