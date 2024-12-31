import { v4 as uuidv4 } from 'uuid';
import { ClinicResource } from "./ClinicResource"

export class ClinicResourceBuilder {
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
    clinicResource : ClinicResource

    getClinicResource() : ClinicResource {
        return this.clinicResource
    }

    build() : ClinicResource {
        this.clinicResource = new ClinicResource(
            this.id ? this.id : uuidv4(),
            this.name,
            this.country,
            this.region,
            this.commune,
            this.streetName,
            this.streetNumber,
            this.documentType,
            this.documentValue,
            this.documentCountry,
            this.photo
        )
        return this.clinicResource
    }

    
    setId(value : string) {
        this.id = value
        return this
    }

    setName(value : string) {
        this.name = value
        return this
    }

    setCountry(value : string) {
        this.country = value
        return this
    }

    setRegion(value : string) {
        this.region = value
        return this
    }

    setCommune(value : string) {
        this.commune = value
        return this
    }

    setStreetName(value : string) {
        this.streetName = value
        return this
    }

    setStreetNumber(value : string) {
        this.streetNumber = value
        return this
    }

    setDocumentType(value : string) {
        this.documentType = value
        return this
    }

    setDocumentValue(value : string) {
        this.documentValue = value
        return this
    }

    setDocumentCountry(value : string) {
        this.documentCountry = value
        return this
    }

    setPhoto(value : string) {
        this.photo = value
        return this
    }
}
