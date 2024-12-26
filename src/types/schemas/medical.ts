
import { v4 as uuidv4 } from 'uuid';

// Tables ---------------------------------------------------------------------

export class Clinic {
    id : string
    name : string
    hasOnlineBooking : boolean = false
    locationType : LocationType = LocationType.FACILITIES

    constructor(
        name : string, 
        id? : string,
        locationType? : LocationType,
    ) {
        this.name = name;
        if(id) this.id = id;
        if(locationType) this.locationType = locationType;
    }
}

// ===============================================================
// ===============================================================

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
    private id : string
    private clinicId : string
    private name : string
    private country : string
    private region : string
    private commune : string
    private city : string
    private streetName : string
    private streetNumber : string
    private restOfAddress : string
    private latitude : number
    private longitude : number
    private altitude : number
    private phone : string

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

interface BranchBuilderInterface {
    setId : (value: string) => BranchBuilder;
    setClinicId : (value: string) => BranchBuilder;
    setName : (value: string) => BranchBuilder;
    setCountry : (value: string) => BranchBuilder;
    setRegion : (value: string) => BranchBuilder;
    setCommune : (value: string) => BranchBuilder;
    setCity : (value: string) => BranchBuilder;
    setStreetName : (value: string) => BranchBuilder;
    setStreetNumber : (value: string) => BranchBuilder;
    setRestOfAddress : (value: string) => BranchBuilder;
    setLatitude : (value: number) => BranchBuilder;
    setLongitude : (value: number) => BranchBuilder;
    setAltitude : (value: number) => BranchBuilder;
    setPhone : (value: string) => BranchBuilder;

    build : () => Branch;
    getBranch : () => Branch;
}

export class BranchBuilder implements BranchBuilderInterface {
    id : string
    clinicId : string
    name : string
    country : string
    region : string
    commune : string
    city : string
    streetName : string
    streetNumber : string
    restOfAddress : string
    latitude : number
    longitude : number
    altitude : number
    phone : string

    branch : Branch

    setId(value: string) : BranchBuilder {
        this.id = value
        return this
    };

    setClinicId(value: string) : BranchBuilder {
        this.clinicId = value
        return this
    };

    setName(value: string) : BranchBuilder {
        this.name = value
        return this
    };

    setCountry(value: string) : BranchBuilder {
        this.country = value
        return this
    };

    setRegion(value: string) : BranchBuilder {
        this.region = value
        return this
    };

    setCommune(value: string) : BranchBuilder {
        this.commune = value
        return this
    };

    setCity(value: string) : BranchBuilder {
        this.city = value
        return this
    };

    setStreetName(value: string) : BranchBuilder {
        this.streetName = value
        return this
    };

    setStreetNumber(value: string) : BranchBuilder {
        this.streetNumber = value
        return this
    };

    setRestOfAddress(value: string) : BranchBuilder {
        this.restOfAddress = value
        return this
    };

    setLatitude(value: number) : BranchBuilder {
        this.latitude = value
        return this
    };

    setLongitude(value: number) : BranchBuilder {
        this.longitude = value
        return this
    };

    setAltitude(value: number) : BranchBuilder {
        this.altitude = value
        return this
    };

    setPhone(value: string) : BranchBuilder {
        this.phone = value
        return this
    };

    build() : Branch {
        this.branch = new Branch(
            this.id ? this.id : uuidv4(),
            this.clinicId,
            this.name,
            this.country,
            this.region,
            this.commune,
            this.city,
            this.streetName,
            this.streetNumber,
            this.restOfAddress,
            this.latitude,
            this.longitude,
            this.altitude,
            this.phone
        )
        return this.branch;
    }

    getBranch() : Branch {
        return this.branch
    }

}


export type ClinicResource = {
    id : string
    name : string
    country : string
    region : string
    commune : string
    streetName : string
    streetNumber : string
    documentType : string
    documentValue : string
    documentCountry : string
    photo : string   
}

// ====================================================================
// ====================================================================

interface MedicInterface {
    getId : () => string
    getAttendanceType : () => AttendanceType
    getLocationType : () => LocationType
    getPhoto : () => string
}

export class Medic implements MedicInterface {
    private id : string
    private attendanceType : AttendanceType
    private locationType : LocationType
    private photo : string

    constructor(
        id : string,
        attendanceType : AttendanceType,
        locationType : LocationType,
        photo : string
    ) {
        this.id = id
        this.attendanceType = attendanceType
        this.locationType = locationType
        this.photo = photo
    }

    getId() : string {
        return this.id
    }

    getAttendanceType() : AttendanceType {
        return this.attendanceType
    }

    getLocationType() : LocationType {
        return this.locationType
    }

    getPhoto() : string {
        return this.photo
    }
}

interface MedicBuilderInterface {
    setId : (id : string) => MedicBuilder
    setAttendanceType : (attendanceType : AttendanceType) => MedicBuilder
    setLocationType : (locationType : LocationType) => MedicBuilder
    setPhoto : (photo : string) => MedicBuilder

    build : () => Medic
    getMedic : () => Medic
}

class MedicBuilder implements MedicBuilderInterface {
    id : string
    attendanceType : AttendanceType
    locationType : LocationType
    photo : string
    medic : Medic
    
    setId(value: string) : MedicBuilder {
        this.id = value
        return this
    }

    setAttendanceType(value: AttendanceType) : MedicBuilder {
        this.attendanceType = value;
        return this;
    }

    setLocationType(value: LocationType) : MedicBuilder {
        this.locationType = value
        return this
    }

    setPhoto(value: string) : MedicBuilder {
        this.photo = value
        return this
    }
    
    build() : Medic {
        this.medic = new Medic(
            this.id,
            this.attendanceType,
            this.locationType,
            this.photo
        )

        return this.medic;
    }

    getMedic() : Medic {
        return this.medic;
    }
    
}

// ==================================================================


export type Specialty = {
    snomedCode : string
    snomedLabel : string
    starbienLabel : string
    specialtyType : SpecialtyType
    practiceType : PracticeType
}

// Enums ----------------------------------------------------------------------

enum LocationType {
    HOME = 'AT_HOME',
    FACILITIES = 'AT_FACILITIES'
}

enum SpecialtyType {
    CONSULTATION = 'CONSULTATION',
    LABORATORY = 'LABORATORY',
    IMAGING = 'IMAGING'
}

enum PracticeType {
    CONSULTATION = 'CONSULTATION',
    EXAM = 'EXAM'
}

enum AttendanceType {
    IN_PERSON = 'IN_PERSON'
}