
// Tables ---------------------------------------------------------------------

export class Clinic {
    id : string | null = null
    name : string
    hasOnlineBooking : boolean = false
    locationType : LocationType
}

export type Branch = {
    id : string
    clinic_id : string
    name : string
    country : string
    region : string
    commune : string
    city : string
    street_name : string
    street_number : string
    rest_of_address : string
    latitude : string
    longitude : string
    altitude : string
    phone : string
}

export type ClinicResource = {
    id : string
    name : string
    country : string
    region : string
    commune : string
    street_name : string
    street_number : string
    document_type : string
    document_value : string
    document_country : string
    photo : string   
}

export type Medic = {
    id : string
    attendanceType : 'IN_PERSON'
    locationType : LocationType
    photo : string
}

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