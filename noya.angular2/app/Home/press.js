"use strict";
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
var dal = require("../dal/models");
var services = require("../services/services");
var Press = (function () {
    function Press(dataService) {
        this.dataService = dataService;
    }
    Press.prototype.ngOnInit = function () {
        var _this = this;
        var req = { Language: dal.Language.Hebrew };
        this.dataService.ConnectToApiData(req, 'api/Data/GetPress').subscribe(function (res) { return _this.pressItems = res.PressItems; });
    };
    return Press;
}());
Press = __decorate([
    core_1.Component({
        selector: 'noya-press',
        templateUrl: './press.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [services.DataService])
], Press);
exports.Press = Press;
//# sourceMappingURL=press.js.map