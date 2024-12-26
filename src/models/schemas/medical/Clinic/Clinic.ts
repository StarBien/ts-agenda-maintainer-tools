import { LocationType } from "@src/types/medical"

interface ClinicInterface {
    getId : () => string
    getName : () => string
    getHasOnlineBooking : () => boolean
    getLocationType : () => LocationType
}

export default class Clinic implements ClinicInterface {
    private readonly id : string
    private readonly name : string
    private readonly hasOnlineBooking : boolean
    private readonly locationType : LocationType

    constructor(
        id : string,
        name : string,
        hasOnlineBooking : boolean,
        locationType : LocationType
    ) {
        this.id = id
        this.name = name
        this.hasOnlineBooking = hasOnlineBooking
        this.locationType = locationType
    }
    
    getId() : string {
        return this.id
    }

    getName() : string {
        return this.name
    }

    getHasOnlineBooking() : boolean {
        return this.hasOnlineBooking
    }

    getLocationType() : LocationType {
        return this.locationType
    }

}