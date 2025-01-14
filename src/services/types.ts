import { LocationType, PracticeType, SpecialtyType } from "@src/types/medical"

export type SpecialtyDTO = {
    snomedCode : string
    snomedLabel : string
    starbienLabel : string
    specialtyType : SpecialtyType
    practiceType : PracticeType
}

export type ClinicDTO = {
    id : string
    name : string
    hasOnlineBooking : boolean
    locationType : LocationType
}

export type BranchDTO = {
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
}

// Combination of the Medic + Person table
export type PractitionerPersonDTO = {
    id : string
    photo : string
    attendance_type : string
    location_type : string
    firstname : string
    lastname : string
    mother_maiden_name : string
    birthdate : string
    country : string
    region : string
    commune : string
    city : string
    street_name : string
    street_number : string
    rest_of_address : string
    document_type : string
    document_value : string
    document_country : string
    gender : string
    deceased : string
    phone : string
    email : string
}

export type ClinicResourceDTO = {
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