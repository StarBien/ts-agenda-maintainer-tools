
import { Branch } from "@src/models/schemas/medical/Branch/Branch";
import { ClinicResource } from "@src/models/schemas/medical/ClinicResource/ClinicResource";
import { Specialty } from "@src/models/schemas/medical/Specialty/Specialty";

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
 * 
*/

interface GenerateSQLInterface {
    // createBranch : () => Branch
    // createClinicResource : () => ClinicResource

    addBranchToClinic : (branch : Branch) => string 
    addSpecialtyToBranch : (specialtyId : Specialty['snomedCode'], branchId : Branch['id']) => string
    addSpecialtyToResource : (specialtyId : Specialty['snomedCode'], resourceId : ClinicResource['id']) => string
    addResourceToBranch : (branchId : string, resourceId : string) => string
}

export class GenerateSQL implements GenerateSQLInterface {

    addBranchToClinic(branch : Branch) : string {

        let template = `
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '${branch.getId()}',
            '${branch.getClinicId()}',
            '${branch.getName()}',
            '${branch.getCountry()}',
            '${branch.getRegion()}',
            '${branch.getCommune()}',
            '${branch.getCity()}',
            '${branch.getStreetName()}',
            ${branch.getStreetNumber()},
            '${branch.getRestOfAddress()}',
            ${branch.getLatitude()},
            ${branch.getLongitude()},
            ${branch.getAltitude()},
            '${branch.getPhone()}'
        ) ON CONFLICT DO NOTHING;
        `

        return template;
    };

    addResourceToBranch(branchId: string, resourceId: string) : string {

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

    addSpecialtyToBranch(specialtyId : string, branchId : string) : string {
        
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

    addSpecialtyToResource(specialtyId : string, resourceId : string) : string {

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