import { z } from "zod"
import { BranchDTO, SpecialtyDTO, ClinicDTO, PractitionerPersonDTO, ClinicResourceDTO,  } from "./types"
import { sqlEscapeSingleQuotes } from "@src/utils/sql-escape-single-quotes";

// Type for normalization configuration
type NormalizationConfig = {
	[key: string]: "string" | "number" | "date" | "unknown";
  };
  
  // Map Zod schema types to normalizationConfig types
 function generateNormalizationConfig(schema: z.ZodSchema): NormalizationConfig {
	const shape = (schema as z.ZodObject<any>).shape;
	const config: NormalizationConfig = {};
  
	for (const key in shape) {
		const field = shape[key];
		if (field instanceof z.ZodString) {
			config[key] = "string";
		} else if (field instanceof z.ZodNumber) {
			config[key] = "number";
		} else if (field instanceof z.ZodDate) {
			config[key] = "date";
		} else {
			config[key] = "unknown"; // Default for unsupported types
		}
	}
  
	return config;
}

// Function to normalize data based on the configuration
export function normalizeData(
  data: Record<string, any>[],
  schema: z.ZodObject<any>
): [Record<string, any>[], boolean] {

	const config = generateNormalizationConfig(schema)

	const keyMap = createKeyMap(data[0]);

	const translated = data.map((row) => {
		const normalizedRow: Record<string, any> = {};

		row = mapKeys(row, keyMap)

		for (const key in row) {
			if (config[key]) {
				switch (config[key]) {
					case "string":
						normalizedRow[key] = sqlEscapeSingleQuotes(row[key]?.toString()) ?? "";
						break;
					case "number":
						normalizedRow[key] = !isNaN(Number(row[key])) ? Number(row[key]) : null;
						break;
					case "date":
						normalizedRow[key] = new Date(row[key]);
						if (isNaN(normalizedRow[key].getTime())) {
						normalizedRow[key] = null; // Invalid dates become null
						}
						break;
					default:
						normalizedRow[key] = row[key]; // Preserve original value for unknown types
				}
			} else {
				normalizedRow[key] = row[key]; // Preserve values for fields not in config
			}
		}
		return normalizedRow;
  });

	const success = translated.every(row => schema.safeParse(row))

	return [translated, success]
}


// =====================================

export function mapKeys<T extends Record<string, any>> (
	data: T,
	keyMap: Record<string, string>
) : Record<string, any> {
	return Object.fromEntries(
		Object.entries(data).map(([key, value]) => [keyMap[key] || key, value])
	  );
}

// Utility function to convert snake_case to camelCase
function snakeToCamel(snake: string): string {
	return snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
  
  // Function to create the keyMap
  export function createKeyMap<T extends Record<string, any>>(data: T): Record<string, string> {
		const keyMap: Record<string, string> = {};
		for (const key of Object.keys(data)) {
			if (/_/.test(key)) {
			keyMap[key] = snakeToCamel(key);
			}
		}
		return keyMap;
  }

export const BranchKeyMap = {
	SCRIPT_ID : 'SCRIPT_ID',
	id : 'id',
	clinic_id : 'clinicId',
	name : 'name',
	country : 'country',
	region : 'region',
	commune : 'commune',
	city : 'city',
	street_name : 'streetName',
	street_number : 'streetNumber',
	rest_of_address : 'restOfAddress',
	latitude : 'latitude',
	longitude : 'longitude',
	altitude : 'altitude',
	phone : 'phone',
}