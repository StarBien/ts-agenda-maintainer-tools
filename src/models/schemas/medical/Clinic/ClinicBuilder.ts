import { LocationType } from "@src/types/medical";
import Clinic from "./Clinic";

interface ClinicBuilderInterface {
    setId : (value : string) => ClinicBuilder
    setName : (value : string) => ClinicBuilder
    setHasOnlineBooking : (value : boolean) => ClinicBuilder
    setLocationType : (value : LocationType) => ClinicBuilder

    getClinic : () => Clinic
    build : () => Clinic
}

export class ClinicBuilder implements ClinicBuilderInterface {

    id : string
    name : string
    hasOnlineBooking : boolean
    locationType : LocationType
    
    clinic : Clinic

    setId(value: string) : this {
        this.id = value
        return this
    }

    setName(value: string) : this {
        this.name = value
        return this
    }

    setHasOnlineBooking(value: boolean) : this {
        this.hasOnlineBooking = value
        return this
    }

    setLocationType(value: LocationType) : this {
        this.locationType = value
        return this
    }


    getClinic() : Clinic {
        this.clinic = new Clinic(
            this.id,
            this.name,
            this.hasOnlineBooking,
            this.locationType,
        )
        return this.clinic
    }

    build() : Clinic { return this.clinic };
    
}