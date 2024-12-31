import { ClinicResource } from "../ClinicResource/ClinicResource"
import { Specialty } from "../Specialty/Specialty"

interface BranchInterface {
    getId : () => string
    getClinicId : () => string
    getName : () => string
    getCountry : () => string
    getRegion : () => string
    getCommune : () => string
    getCity : () => string
    getStreetName : () => string
    getStreetNumber : () => string
    getRestOfAddress : () => string
    getLatitude : () => number
    getLongitude : () => number
    getAltitude : () => number
    getPhone : () => string
}

export class Branch implements BranchInterface {
    private readonly id : string
    private readonly clinicId : string
    private readonly name : string
    private readonly country : string
    private readonly region : string
    private readonly commune : string
    private readonly city : string
    private readonly streetName : string
    private readonly streetNumber : string
    private readonly restOfAddress : string
    private readonly latitude : number
    private readonly longitude : number
    private readonly altitude : number
    private readonly phone : string

    resources : ClinicResource[] = []
    specialties : Specialty[] = []

    constructor(
        id : string,
        clinicId : string,
        name : string,
        country : string,
        region : string,
        commune : string,
        city : string,
        streetName : string,
        streetNumber : string,
        restOfAddress : string,
        latitude : number,
        longitude : number,
        altitude : number,
        phone : string,
    ) {

        this.id = id;
        this.clinicId = clinicId;
        this.name = name;
        this.country = country;
        this.region = region;
        this.commune = commune;
        this.city = city;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.restOfAddress = restOfAddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.phone = phone;        
    }

    getId() : string {
        return this.id
    };

    getClinicId() : string {
        return this.clinicId
    };

    getName() : string {
        return this.name
    };

    getCountry() : string {
        return this.country
    };

    getRegion() : string {
        return this.region
    };

    getCommune() : string {
        return this.commune
    };

    getCity() : string {
        return this.city
    };

    getStreetName() : string {
        return this.streetName
    };

    getStreetNumber() : string {
        return this.streetNumber
    };

    getRestOfAddress() : string {
        return this.restOfAddress
    };

    getLatitude() : number {
        return this.latitude
    };

    getLongitude() : number {
        return this.longitude
    };

    getAltitude() : number {
        return this.altitude
    };

    getPhone() : string {
        return this.phone
    };

}
