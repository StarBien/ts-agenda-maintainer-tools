import {
   BranchDTO,
   SpecialtyDTO,
   ClinicDTO,
   PractitionerPersonDTO,
   ClinicResourceDTO,
} from "@src/schemas/medical";
import { InputDataShape, InputType } from "./FetchInput";

/**
 * USE CASES:
 * * Initialize Clinic Defaults
 * * Create Clinic                              **
 * * Create Practitioner                        **
 * * Create Specialty                           **
 * * Create ClinicResource                      **
 * * Create & Add Branch to a Clinic            **
 * * Add Practitioner to a Branch               ** DONE
 * * Add Resource to a Branch                   **
 * * Add Specialty to Branch                    ** DONE
 * * Add Specialty to a Resource                **
 * * Add Specialty to a Practitioner            ** DONE
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
   createClinic: (clinic: ClinicDTO) => string;
   createBranch: (branch: BranchDTO) => string;
   createClinicResource: (clinicResource: ClinicResourceDTO) => string;
   createPractitioner: (practitioner: PractitionerPersonDTO) => string;
   // addBranchToClinic : (branch : BranchDTO) => string // TO REMOVE?

   addResourceToBranch: (branchId: string, resourceId: string) => string;
   addPractitionerToBranch: (
      branchId: BranchDTO["id"],
      practitionerId: PractitionerPersonDTO["id"]
   ) => string;
   addSpecialtyToBranch: (
      specialtyId: SpecialtyDTO["snomedCode"],
      branchId: BranchDTO["id"]
   ) => string;
   addSpecialtyToResource: (
      specialtyId: SpecialtyDTO["snomedCode"],
      resourceId: ClinicResourceDTO["id"]
   ) => string;
   // addSpecialtyToPractitioner : (specialtyId : SpecialtyDTO['snomedCode'], resourceId : ClinicResourceDTO['id']) => string
}

export class GenerateSQL implements GenerateSQLInterface {
   private readonly Especialidades: InputType<SpecialtyDTO>[];
   private readonly Clinicas: InputType<ClinicDTO>[];
   private readonly Sedes: InputType<BranchDTO>[];
   private readonly Recursos: InputType<ClinicResourceDTO>[];
   private readonly Practicantes: InputType<PractitionerPersonDTO>[];

   constructor(inputData?: InputDataShape) {
      this.Especialidades = inputData?.Especialidades || [];
      this.Clinicas = inputData?.Clinicas || [];
      this.Sedes = inputData?.Sedes || [];
      this.Recursos = inputData?.Recursos || [];
      this.Practicantes = inputData?.Practicantes || [];
   }

   createSpecialty(specialty: SpecialtyDTO): string {
      let template = `
		INSERT INTO medical.specialties
			(snomed_code, snomed_label, starbien_label, specialty_type, practice_type)
		VALUES (
			'${specialty.snomedCode}',
			'${specialty.snomedLabel}',
			'${specialty.starbienLabel}',
			'${specialty.specialtyType}',
			'${specialty.practiceType}'
		) ON CONFLICT DO NOTHING;
		`;

      return healNulls(template);
   }

   createClinic(clinic: ClinicDTO): string {
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
        `;

      return healNulls(template);
   }

   createBranch(branch: BranchDTO): string {
      let template = `
        -- ADD BRANCH 
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES 
        (
            '${branch.id}',
            '${branch.clinicId}',
            '${branch.name || "NULL"}',
            '${branch.country || "NULL"}',
            '${branch.region || "NULL"}',
            '${branch.commune || "NULL"}',
            '${branch.city || "NULL"}',
            '${branch.streetName || "NULL"}',
            ${branch.streetNumber || "NULL"},
            '${branch.restOfAddress || "NULL"}',
            ${branch.latitude || "NULL"},
            ${branch.longitude || "NULL"},
            ${branch.altitude || 0},
            '${branch.phone || "NULL"}'
        ) ON CONFLICT DO NOTHING;
        `;

      return healNulls(template);
   }

   createClinicResource(clinicResource: ClinicResourceDTO): string {
      let template = `
			-- ADD CLINI CLINIC-RESOURCE - IMAGING
			INSERT INTO medical.clinic_resources (
				id, "name", country, region, commune, street_name, street_number, document_type, document_value, document_country, photo
			)
			VALUES (
				'${clinicResource.id}',
				'${clinicResource.name}',
				'${clinicResource.country || "NULL"}',
				'${clinicResource.region || "NULL"}',
				'${clinicResource.commune || "NULL"}',
				'${clinicResource.streetName || "NULL"}',
				'${clinicResource.streetNumber || "NULL"}',
				'${clinicResource.documentType || "NULL"}',
				'${clinicResource.documentValue || "NULL"}',
				'${clinicResource.documentCountry || "NULL"}',
				'${clinicResource.photo || "NULL"}',
			)
		`;

      return healNulls(template);
   }

   createPractitioner(practitioner: PractitionerPersonDTO): string {
      const genericPractitionerIcon =
         "https://www.starbien.life/images/generic_practitioner_icon.png.png";

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
            '${practitioner.id}',
            '${practitioner.firstname}',
            '${practitioner.lastname || "NULL"}', 
            '${practitioner.motherMaidenName || "NULL"}',
            NULL, 'CL', NULL, NULL, '', '', NULL, NULL,
            'RUT', '${practitioner.documentValue || "NULL"}', 'CL',
            NULL, 'false', '',
            '${practitioner.email || "NULL"}'
        )
        ON CONFLICT DO NOTHING;
        `;

      const medics_template = `        
        -- ADD NEW PRACTITIONERS AS MEDICS
        INSERT INTO medical.medics (id, photo, attendance_type, location_type)
        VALUES (
            '${practitioner.id}',
            '${genericPractitionerIcon}',
            'IN_PERSON',
            'AT_FACILITIES'
        )
        ON CONFLICT DO NOTHING;`;

      return healNulls(persons_template + medics_template);
   }

   addResourceToBranch(branchId: BranchDTO["id"], resourceId: ClinicResourceDTO["id"]): string {
      let template = `
        -- ADD CLINIC-RESOURCES-BRANCHES
        INSERT INTO medical.clinic_resources_branches (branch_id, resource_id)
        VALUES(
            '${branchId}',
            '${resourceId}'
        ) ON CONFLICT DO NOTHING;
        `;

      return healNulls(template);
   }

   addSpecialtyToBranch(
      specialtyId: SpecialtyDTO["snomedCode"],
      branchId: BranchDTO["id"]
   ): string {
      const template = `
        -- ADD BRANCHES-SPECIALTIES (Especialidades de una Sede)
        INSERT INTO medical.branches_specialties
        ( branch_id, specialty_id )
        VALUES
        (
            '${branchId}',
            '${specialtyId}'
        ) ON CONFLICT DO NOTHING;
        `;

      return healNulls(template);
   }

   addPractitionerToBranch(
      branchId: BranchDTO["id"],
      practitionerId: PractitionerPersonDTO["id"]
   ): string {
      const template = `
        -- ASSOCIATE PRACTITIONERS TO BRANCHES
        INSERT INTO medical.medics_branches (branch_id, medic_id)
        VALUES (
            '${branchId}',
            '${practitionerId}'
        )
        ON CONFLICT DO NOTHING;
        `;

      return healNulls(template);
   }

   addSpecialtyToResource(
      specialtyId: SpecialtyDTO["snomedCode"],
      resourceId: ClinicResourceDTO["id"]
   ): string {
      let template = `
        -- ADD SPECIALTY TO RESOURCE
        INSERT INTO medical.clinic_resources_specialties (specialty_id, resource_id)
        VALUES(
            '${specialtyId}',
            '${resourceId}'
        ) ON CONFLICT DO NOTHING;
        `;

      return healNulls(template);
   }
}

function healNulls(string: string) {
   // return string.replace("'NULL'", "NULL");
   return string;
}
