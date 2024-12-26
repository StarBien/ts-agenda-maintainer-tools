"use strict";
// Tables ---------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinic = void 0;
var Clinic = /** @class */ (function () {
    function Clinic() {
        this.id = null;
        this.hasOnlineBooking = false;
    }
    return Clinic;
}());
exports.Clinic = Clinic;
// Enums ----------------------------------------------------------------------
var LocationType;
(function (LocationType) {
    LocationType["HOME"] = "AT_HOME";
    LocationType["FACILITIES"] = "AT_FACILITIES";
})(LocationType || (LocationType = {}));
var SpecialtyType;
(function (SpecialtyType) {
    SpecialtyType["CONSULTATION"] = "CONSULTATION";
    SpecialtyType["LABORATORY"] = "LABORATORY";
    SpecialtyType["IMAGING"] = "IMAGING";
})(SpecialtyType || (SpecialtyType = {}));
var PracticeType;
(function (PracticeType) {
    PracticeType["CONSULTATION"] = "CONSULTATION";
    PracticeType["EXAM"] = "EXAM";
})(PracticeType || (PracticeType = {}));
