// TODO: Implement interface ClinicResourceInterface
export class ClinicResource {
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

    constructor(
        id : string,
        name : string,
        country : string,
        region : string,
        commune : string,
        streetName : string,
        streetNumber : string,
        documentType : string,
        documentValue : string,
        documentCountry : string,
        photo : string,        
    ) {
        this.id = id
        this.name = name
        this.country = country
        this.region = region
        this.commune = commune
        this.streetName = streetName
        this.streetNumber = streetNumber
        this.documentType = documentType
        this.documentValue = documentValue
        this.documentCountry = documentCountry
        this.photo = photo        
    }

    getId() : string {
        return this.id
    }

    getName() : string {
        return this.name
    }

    getCountry() : string {
        return this.country
    }

    getRegion() : string {
        return this.region
    }

    getCommune() : string {
        return this.commune
    }

    getStreetName() : string {
        return this.streetName
    }

    getStreetNumber() : string {
        return this.streetNumber
    }

    getDocumentType() : string {
        return this.documentType
    }

    getDocumentValue() : string {
        return this.documentValue
    }

    getDocumentCountry() : string {
        return this.documentCountry
    }

    getPhoto() : string {
        return this.photo
    }

}
