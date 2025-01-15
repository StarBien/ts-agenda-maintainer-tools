
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
    createPractitioner : (practitioner : PractitionerPersonDTO) => string
    // addBranchToClinic : (branch : BranchDTO) => string // TO REMOVE?
    
    addResourceToBranch : (branchId : string, resourceId : string) => string
    addPractitionerToBranch : (branchId : BranchDTO['id'], practitionerId : PractitionerPersonDTO['id']) => string
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

    constructor(inputData? : InputDataShape) {

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

        // console.log('DEBUG - Creating Branch...', 'Branch: ', branch)

        let template = `
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '${branch.id}',
            '${branch.clinicId}',
            '${branch.name || 'NULL'}',
            '${branch.country || 'NULL'}',
            '${branch.region || 'NULL'}',
            '${branch.commune || 'NULL'}',
            '${branch.city || 'NULL'}',
            '${branch.streetName || 'NULL'}',
            ${branch.streetNumber || 'NULL'},
            '${branch.restOfAddress || 'NULL'}',
            ${branch.latitude || 'NULL'},
            ${branch.longitude || 'NULL'},
            ${branch.altitude || 0},
            '${branch.phone || 'NULL'}'
        ) ON CONFLICT DO NOTHING;
        `

        return template;
    };

    
    createClinicResource(clinicResource : ClinicResourceDTO) : string {

        let template = `
        
        `

        return template;
    }

    createPractitioner(practitioner: PractitionerPersonDTO) : string {

        const persons_template = `
        -- ADD NEW PRACTITIONERS AS PERSONS
        INSERT INTO persons.persons (
            id,
            firstname, lastname, mother_maiden_name,
            birthdate,
            country, region, commune, city, street_name, street_number, rest_of_address,
            document_type, document_value, document_country,
            gender, deceased, phone,
            email
        )
        VALUES (
            '0b344a82-d84a-4b0a-a841-bff674e0fa6c',
            'Rodrigo Ignacio',
            'Alliende', 'Ferrada',
            NULL, 'CL', NULL, NULL, '', '', NULL, NULL,
            'RUT', '166614376', 'CL',
            NULL, 'false', '',
            NULL
        )
        ON CONFLICT DO NOTHING;
        `

        const medics_template = `        
        -- ADD NEW PRACTITIONERS AS MEDICS
        INSERT INTO medical.medics (id, photo, attendance_type, location_type)
        VALUES (
            '0b344a82-d84a-4b0a-a841-bff674e0fa6c',
            'https://www.starbien.life/images/generic_practitioner_icon.png.png',
            'IN_PERSON',
            'AT_FACILITIES'
        )
        ON CONFLICT DO NOTHING;` 

        return persons_template + medics_template;
    }

    // ---

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

    addPractitionerToBranch(
        branchId : BranchDTO['id'], 
        practitionerId : PractitionerPersonDTO['id']
    ) : string {

        const template = `
        -- ASSOCIATE PRACTITIONERS TO BRANCHES
        INSERT INTO medical.medics_branches (branch_id, medic_id)
        VALUES (
            '${branchId}',
            '${practitionerId}'
        )
        ON CONFLICT DO NOTHING;
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