import { LocationType, PracticeType, SpecialtyType } from "@src/types/medical";
import { z, ZodObject, ZodRawShape } from "zod";

// Generic function to augment a schema with SCRIPT_ID
export function withScriptId<T extends ZodRawShape>(schema: ZodObject<T>) {
    return schema.extend({
      SCRIPT_ID: z.string(),
    }) as ZodObject<T & { SCRIPT_ID: z.ZodString }>;
  }

  
  export const SpecialtyDTO_Schema = z.object({
      snomedCode : z.string(),
      snomedLabel : z.string(),
      starbienLabel : z.string(),
      specialtyType : z.nativeEnum(SpecialtyType),
      practiceType : z.nativeEnum(PracticeType)
    })
    
export type SpecialtyDTO = z.infer<typeof SpecialtyDTO_Schema>

export const ClinicDTO_Schema = z.object({
    id : z.string(),
    name : z.string(),
    hasOnlineBooking : z.boolean(),
    locationType : z.nativeEnum(LocationType),
})

export const BranchDTO_Schema = z.object({
    id : z.string(),
    clinicId : z.string(),
    name : z.string(),
    country : z.string(),
    region : z.string(),
    commune : z.string(),
    city : z.string(),
    streetName : z.string(),
    streetNumber : z.string(),
    restOfAddress : z.string(),
    latitude : z.number(),
    longitude : z.number(),
    altitude : z.number(),
    phone : z.string(),
})

export type BranchDTO = z.infer<typeof BranchDTO_Schema>

export const PractitionerPersonDTO_Schema = z.object({
    id : z.string(),
    photo : z.string(),
    attendanceType : z.string(),
    locationType : z.string(),
    firstname : z.string(),
    lastname : z.string(),
    motherMaidenName : z.string(),
    birthdate : z.date(),
    country : z.string(),
    region : z.string(),
    commune : z.string(),
    city : z.string(),
    streetName : z.string(),
    streetNumber : z.string(),
    restOfAddress : z.string(),
    documentType : z.string(),
    documentValue : z.string(),
    documentCountry : z.string(),
    gender : z.string(),
    deceased : z.string(),
    phone : z.string(),
    email : z.string().email(),
})

export const ClinicResourceDTO_Schema = z.object({
    id : z.string(),
    name : z.string(),
    country : z.string(),
    region : z.string(),
    commune : z.string(),
    streetName : z.string(),
    streetNumber : z.string(),
    documentType : z.string(),
    documentValue : z.string(),
    documentCountry : z.string(),
    photo : z.string(),
})

export type ClinicResourceDTO = z.infer<typeof ClinicResourceDTO_Schema>
