import { z } from "zod";

export enum LocationType {
   HOME = "AT_HOME",
   FACILITIES = "AT_FACILITIES",
}

export enum SpecialtyType {
   CONSULTATION = "CONSULTATION",
   LABORATORY = "LABORATORY",
   IMAGING = "IMAGING",
}

export enum PracticeType {
   CONSULTATION = "CONSULTATION",
   EXAM = "EXAM",
}

export enum AttendanceType {
   IN_PERSON = "IN_PERSON",
}

enum SCRIPT_ACTION {
   CREATE = "CREATE",
   UPDATE = "UPDATE",
   DELETE = "DELETE",
   NONE = "NONE",
}

// type ScriptInput<T> = z.infer<typeof withScriptId(o : T)>

// Generic function to augment a schema with SCRIPT_ID
export function withScriptId<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
   return schema.extend({
      SCRIPT_ID: z.string(),
      SCRIPT_ACTION: z.nativeEnum(SCRIPT_ACTION),
   }) as z.ZodObject<
      T & {
         SCRIPT_ID: z.ZodString;
         SCRIPT_ACTION: z.ZodNativeEnum<typeof SCRIPT_ACTION>;
      }
   >;
}

export const SpecialtyDTO_Schema = z.object({
   snomedCode: z.string(),
   snomedLabel: z.string().optional(),
   starbienLabel: z.string().optional(),
   specialtyType: z.nativeEnum(SpecialtyType).optional(),
   practiceType: z.nativeEnum(PracticeType).optional(),
   tags: z.string().optional(),
   keywords: z.string().optional(),
});

export type SpecialtyDTO = z.infer<typeof SpecialtyDTO_Schema>;

export const ClinicDTO_Schema = z.object({
   id: z.string(),
   name: z.string(),
   hasOnlineBooking: z.boolean(),
   tags: z.string().optional(),
});

export type ClinicDTO = z.infer<typeof ClinicDTO_Schema>;

export const BranchDTO_Schema = z.object({
   id: z.string(),
   clinicId: z.string(),
   name: z.string(),
   country: z.string(),
   region: z.string().optional(),
   commune: z.string().optional(),
   city: z.string().optional(),
   streetName: z.string().optional(),
   streetNumber: z.string().optional(),
   restOfAddress: z.string().optional(),
   latitude: z.number(),
   longitude: z.number(),
   altitude: z.number().default(0),
   phone: z.string().optional(),
   tags: z.string(),
   attendanceType: z.string(),
});

export type BranchDTO = z.infer<typeof BranchDTO_Schema>;

export const PractitionerPersonDTO_Schema = z.object({
   id: z.string(),
   photo: z.string().optional(),
   attendanceType: z.string().optional(),
   locationType: z.string().optional(),
   firstname: z.string().optional(),
   lastname: z.string().optional(),
   motherMaidenName: z.string().optional(),
   birthdate: z.date().optional(),
   country: z.string().optional(),
   region: z.string().optional(),
   commune: z.string().optional(),
   city: z.string().optional(),
   streetName: z.string().optional(),
   streetNumber: z.string().optional(),
   restOfAddress: z.string().optional(),
   documentType: z.string(),
   documentValue: z.string(),
   documentCountry: z.string(),
   gender: z.string().optional(),
   deceased: z.string().optional(),
   phone: z.string().optional(),
   email: z.string().email().optional(),
});

export type PractitionerPersonDTO = z.infer<typeof PractitionerPersonDTO_Schema>;

export const ClinicResourceDTO_Schema = z.object({
   id: z.string(),
   name: z.string(),
   country: z.string().optional(),
   region: z.string().optional(),
   commune: z.string().optional(),
   streetName: z.string().optional(),
   streetNumber: z.string().optional(),
   documentType: z.string(),
   documentValue: z.string(),
   documentCountry: z.string(),
   photo: z.string(),
});

export type ClinicResourceDTO = z.infer<typeof ClinicResourceDTO_Schema>;
