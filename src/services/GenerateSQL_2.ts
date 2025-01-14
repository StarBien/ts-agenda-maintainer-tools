
import { Clinic } from "@src/models/schemas/medical/Clinic/Clinic"
import { BranchDTO, SpecialtyDTO, ClinicDTO, PractitionerPersonDTO, ClinicResourceDTO,  } from "./types"
import { InputDataShape, InputType } from "./FetchInput"

/**
 * USE CASES:
 * * Initialize Clinic Defaults
 * * Create Clinic                              **
 * * Create Practitioner                        **
 * * Create Specialty                           **
 * * Create ClinicResource                      **
 * * Create & Add Branch to a Clinic            ** TODO
 * * Add Practitioner to a Branch               **
 * * Add Resource to a Branch                   ** TODO
 * * Add Specialty to Branch                    **
 * * Add Specialty to a Resource                ** TODO
 * * Add Specialty to a Practitioner            **
 * * Remove Practitioner from a Branch          **
 * * Remove Practitioner from a Specialty       **
 * 
 * FUTURE:
 * * Update Specialty
 * * Update Clinic
 * * Update Branch
 * * Update Clinic Resource
 * * Update Person
 * * Update 
*/

interface GenerateSQLInterface {
    createClinic : (clinic : ClinicDTO) => string
    createBranch :(branch : BranchDTO) => string 
    createClinicResource : (clinicResource : ClinicResourceDTO) => string
    // createPractitioner : (practitioner : PractitionerPersonDTO) => string
    // addBranchToClinic : (branch : BranchDTO) => string // TO REMOVE?
    
    addResourceToBranch : (branchId : string, resourceId : string) => string
    // addPractitionerToBranch : () => string
    addSpecialtyToBranch : (specialtyId : SpecialtyDTO['snomedCode'], branchId : BranchDTO['id']) => string
    addSpecialtyToResource : (specialtyId : SpecialtyDTO['snomedCode'], resourceId : ClinicResourceDTO['id']) => string
    // addSpecialtyToPractitioner : (specialtyId : SpecialtyDTO['snomedCode'], resourceId : ClinicResourceDTO['id']) => string
}

export class GenerateSQL implements GenerateSQLInterface {

    private Especialidades : InputType<SpecialtyDTO>[]
    private Clinicas : InputType<ClinicDTO>[]
    private Sedes : InputType<BranchDTO>[]
    private Recursos : InputType<ClinicResourceDTO>[]
    private Practicantes : InputType<PractitionerPersonDTO>[]

    constructor(inputData : InputDataShape) {

    }

    createClinic(clinic: ClinicDTO) : string {

        let template = `
        -- ADD NEW CLINIC '${clinic.name.toUpperCase()}'
        INSERT INTO medical.clinics
        (id, name, has_online_booking, location_type)
        VALUES (
            '${clinic.id}',
            '${clinic.name}',
            false,
            'AT_FACILITIES'
        ) ON CONFLICT DO NOTHING;
        `

        return template;
    }

    createBranch(branch : BranchDTO) : string {

        console.log('Creating Branch...', 'Branch: ', branch)

        let template = `
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '${branch.id}',
            '${branch.clinicId}',
            '${branch.name}',
            '${branch.country}',
            '${branch.region}',
            '${branch.commune}',
            '${branch.city}',
            '${branch.streetName}',
            ${branch.streetNumber},
            '${branch.restOfAddress}',
            ${branch.latitude},
            ${branch.longitude},
            ${branch.altitude},
            '${branch.phone}'
        ) ON CONFLICT DO NOTHING;
        `

        return template;
    };

    
    createClinicResource(clinicResource : ClinicResourceDTO) : string {

        let template = `
        
        `

        return template;
    }

    addResourceToBranch(
        branchId: BranchDTO['id'], 
        resourceId: ClinicResourceDTO['id']
    ) : string {

        let template = `
        -- ADD CLINIC-RESOURCES-BRANCHES
        INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
        VALUES(
            '${branchId}',
            '${resourceId}'
        ) ON CONFLICT DO NOTHING;
        `;

        return template;
    };

    addSpecialtyToBranch(
        specialtyId : SpecialtyDTO['snomedCode'], 
        branchId : BranchDTO['id']
    ) : string {
        
        const template = 
        `
        -- ADD BRANCHES-SPECIALTIES (Especialidades de una Sede)
        INSERT INTO medical.branches_specialties
        ( branch_id, specialty_id )
        VALUES
        (
            '${branchId}',
            '${specialtyId}'
        ) ON CONFLICT DO NOTHING;
        ` 
        
        return template;
    }

    addSpecialtyToResource(
        specialtyId : SpecialtyDTO['snomedCode'], 
        resourceId : ClinicResourceDTO['id']
    ) : string {

        let template = `
        -- ADD SPECIALTY TO RESOURCE
        INSERT INTO medical.clinic_resources_specialties (specialty_id, resource_id)
        VALUES(
            '${specialtyId}',
            '${resourceId}'
        ) ON CONFLICT DO NOTHING;
        `;

        return template;
    };
}