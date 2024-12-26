import { v4 as uuidv4 } from 'uuid';
import { Branch } from './Branch';

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

    setId(value: string) : this {
        this.id = value
        return this
    };

    setClinicId(value: string) : this {
        this.clinicId = value
        return this
    };

    setName(value: string) : this {
        this.name = value
        return this
    };

    setCountry(value: string) : this {
        this.country = value
        return this
    };

    setRegion(value: string) : this {
        this.region = value
        return this
    };

    setCommune(value: string) : this {
        this.commune = value
        return this
    };

    setCity(value: string) : this {
        this.city = value
        return this
    };

    setStreetName(value: string) : this {
        this.streetName = value
        return this
    };

    setStreetNumber(value: string) : this {
        this.streetNumber = value
        return this
    };

    setRestOfAddress(value: string) : this {
        this.restOfAddress = value
        return this
    };

    setLatitude(value: number) : this {
        this.latitude = value
        return this
    };

    setLongitude(value: number) : this {
        this.longitude = value
        return this
    };

    setAltitude(value: number) : this {
        this.altitude = value
        return this
    };

    setPhone(value: string) : this {
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
