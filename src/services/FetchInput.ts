import { readFileSync } from "fs";
import * as XLSX from "xlsx";

import { randomUUID } from "crypto";

import { z } from "zod";
import {
   BranchDTO,
   ClinicDTO,
   ClinicResourceDTO,
   PractitionerPersonDTO,
   SpecialtyDTO,
   BranchDTO_Schema,
   ClinicDTO_Schema,
   ClinicResourceDTO_Schema,
   PractitionerPersonDTO_Schema,
   withScriptId,
} from "@src/schemas/medical";
import { normalizeData } from "./InputMapper";

const EXCEL_FILE = "inputs/Agenda Maintainer.xlsx";

const buf = readFileSync(EXCEL_FILE);
const workbook = XLSX.read(buf);

type UUID = `${string}-${string}-${string}-${string}-${string}`;

type ValidTypes = BranchDTO | ClinicDTO | ClinicResourceDTO | PractitionerPersonDTO | SpecialtyDTO;

export type InputType<T> = T & {
   SCRIPT_ID: number;
   SCRIPT_ACTION: "CREATE" | "UPDATE" | "DELETE" | "NONE";
};

export type InputDataShape = {
   Especialidades: InputType<SpecialtyDTO>[];
   Clinicas: InputType<ClinicDTO>[];
   Sedes: InputType<BranchDTO>[];
   Recursos: InputType<ClinicResourceDTO>[];
   Practicantes: InputType<PractitionerPersonDTO>[];
};

type MapShape = {
   Sedes: Record<string, { Practicantes: string; Recursos: string }>;
   Especialidades: Record<string, { Sedes: string; Practicantes: string; Recursos: string }>;
};

const defaultSheetConfig = {
   name: "Default",
   blankrows: false,
   defval: "",
};

const sheetsConfig: (XLSX.Sheet2JSONOpts & { name: string; schema?: z.ZodObject<any> })[] = [
   defaultSheetConfig,
   {
      ...defaultSheetConfig,
      name: "Especialidades",
      schema: withScriptId(ClinicDTO_Schema),
   },
   {
      ...defaultSheetConfig,
      name: "Clinicas",
      schema: withScriptId(ClinicDTO_Schema),
   },
   {
      ...defaultSheetConfig,
      name: "Sedes",
      schema: withScriptId(BranchDTO_Schema),
   },
   {
      ...defaultSheetConfig,
      name: "Practicantes",
      range: 1,
      schema: withScriptId(PractitionerPersonDTO_Schema),
   },
   {
      ...defaultSheetConfig,
      name: "Recursos",
      schema: withScriptId(ClinicResourceDTO_Schema),
   },
   {
      ...defaultSheetConfig,
      name: "Map Sedes",
      range: "B4:D10",
   },
   {
      ...defaultSheetConfig,
      name: "Map Especialidad",
      range: "F4:I10",
   },
];

function readMapData(): MapShape {
   const maps: MapShape = {
      Sedes: {},
      Especialidades: {},
   };

   const sheet = workbook.Sheets["Map"];

   type MapSedesRow = {
      Sede: string;
      Practicante: string;
      Recurso: string;
   };

   type MapEspecialidadesRow = {
      Especialidad: string;
      Sede: string;
      Practicante: string;
      Recurso: string;
   };

   sheetsConfig
      .filter((x) => x.name.startsWith("Map "))
      .forEach((sheetConfig) => {
         const json = XLSX.utils.sheet_to_json<MapSedesRow | MapEspecialidadesRow>(
            sheet,
            sheetConfig
         );
         console.log(`Reading map sheet '${sheetConfig.name}'...\n`, json);

         if (sheetConfig.name == "Map Sedes") {
            (json as MapSedesRow[]).forEach((row) => {
               const sedes = row.Sede.toString().split(";");

               sedes.forEach((s) => {
                  maps.Sedes[s] = {
                     Practicantes: row.Practicante,
                     Recursos: row.Recurso,
                  };
               });
            });
         }

         if (sheetConfig.name == "Map Especialidad") {
            (json as MapEspecialidadesRow[]).forEach((row) => {
               const especialidades = row.Especialidad.toString().split(";");

               console.log("Parsing Map: ", especialidades);
               especialidades.forEach((e: string) => {
                  let range = expandRange(e); // ?? [e];
                  console.log("Expanded range: ", range);

                  range.forEach((x) => {
                     let sedes = "";
                     let practicantes = "";
                     let recursos = "";

                     // Concatenate and make unique if the key is already present
                     if (maps.Especialidades.hasOwnProperty(x)) {
                        sedes = maps.Especialidades[x].Sedes;
                        practicantes = maps.Especialidades[x].Practicantes;
                        recursos = maps.Especialidades[x].Recursos;
                     }

                     sedes = row.Sede + (sedes ? ";" + sedes : "");
                     practicantes = row.Practicante + (practicantes ? ";" + practicantes : "");
                     recursos = row.Recurso + (practicantes ? ";" + recursos : "");

                     maps.Especialidades[x] = {
                        Sedes: expandRange(cleanStringArray(sedes)).join(";"),
                        Practicantes: expandRange(cleanStringArray(practicantes)).join(";"),
                        Recursos: expandRange(cleanStringArray(recursos)).join(";"),
                     };
                  });
               });
            });
         }
      });

   return maps;
}

function readMapData2(): MapShape {
   const maps: MapShape = <MapShape>{};

   const sheet = workbook.Sheets["Map"];

   type MapSedesRow = {
      Sede: string;
      Practicante: string;
      Recurso: string;
   };

   type MapEspecialidadesRow = {
      Especialidad: string;
      Sede: string;
      Practicante: string;
      Recurso: string;
   };

   sheetsConfig
      .filter((x) => x.name.startsWith("Map "))
      .forEach((sheetConfig) => {
         const json = XLSX.utils.sheet_to_json(sheet, sheetConfig);

         console.log(`Reading map sheet '${sheetConfig.name}'...\n`, json);

         if (sheetConfig.name == "Map Sedes") {
            readMapRows<MapSedesRow>(
               json as MapSedesRow[],
               (row, maps) => {
                  const sedes = row.Sede.toString().split(";");
                  sedes.forEach((s) => {
                     const existing = maps.Sedes[s] || <MapSedesRow>{};
                     maps.Sedes[s] = {
                        Practicantes: mergeValues(existing.Practicantes, row.Practicante),
                        Recursos: mergeValues(existing.Recursos, row.Recurso),
                     };
                  });
               },
               maps
            );
         }
      });

   return maps;
}

type SheetProcessor<RowType> = (row: RowType, maps: MapShape) => void;

function readMapRows<RowType>(
   data: RowType[],
   processor: SheetProcessor<RowType>,
   maps: MapShape
): void {
   data.forEach((row) => {
      processor(row, maps);
   });
}

// function readMapRows<MapSchemaRowType>(data: MapSchemaRowType[]): void {
//    // const mapRow : MapSchemaRowType = data[0]

//    for (const row in data) {
//       const mapRowKeys = row.toString().split(";");

//       mapRowKeys.forEach((x) => {});
//    }
// }

function readInputData(): Record<string, any[]> {
   const data: Record<string, any[]> = {};

   Object.values(workbook.Sheets).forEach((sheet, i) => {
      const sheetName = workbook.SheetNames[i];

      if (sheetName == "Map") return;
      console.log(`Reading sheet '${sheetName}'...`);

      const sheetConfig = sheetsConfig.find((x) => x.name == sheetName) ?? sheetsConfig[0];

      let json = XLSX.utils.sheet_to_json<InputType<ValidTypes>>(sheet, sheetConfig);

      // Remove un-assigned rows
      let clean = json.filter((row) => Object.values(row).slice(1).join("") !== "");

      if (clean.length == 0) return (data[sheetName] = []);

      if (sheetConfig.schema) {
         console.log("-- Validating schema for Sheet: ", sheetName);
         const [translated, success] = normalizeData(clean, sheetConfig.schema);

         console.log("--- Successfully parsed? ", success);

         if (success) data[sheetName] = translated;
      } else {
         data[sheetName] = clean;
      }
   });

   // Initialize UUIDs for each item in the sheets (where needed)
   Object.entries(data).forEach(([key, values]) => {
      // Logica un poco repetitiva pero por temas de TS hay que castear los tipos
      // Si saben de una mejora apliquenla bienvenidamente!
      if (key == "Clinicas") (values as ClinicDTO[]).forEach((x) => (x.id = initializeUUID(x.id)));
      if (key == "Sedes") (values as BranchDTO[]).forEach((x) => (x.id = initializeUUID(x.id)));
      if (key == "Practicantes")
         (values as PractitionerPersonDTO[]).forEach((x) => (x.id = initializeUUID(x.id)));
      if (key == "Recursos")
         (values as ClinicResourceDTO[]).forEach((x) => (x.id = initializeUUID(x.id)));
   });

   return data;
}

function initializeUUID(string: string): UUID {
   return isUUID(string) ? (string as UUID) : randomUUID();
}

const isUUID = (string: string): boolean => {
   if (string == null) return false;
   if (string.split("-").length < 5) return false;

   return true;
};

function mergeValues(existing: string, incoming: string): string {
   return cleanStringArray(incoming + (existing ? ";" + existing : ""));
}

function expandRange(stringRange: string): string[] {
   /**
    * Range cases:
    * Input => "1-4"
    * Output =? "1;2;3;4"
    */
   const rangeMatch = RegExp(/(\d+)-(\d+)/).exec(stringRange);

   if (!rangeMatch) return [stringRange];

   const rangeStart = Number(rangeMatch[1]);
   const rangeEnd = Number(rangeMatch[2]);

   const rangeLength = rangeMatch ? Math.abs(rangeEnd - rangeStart) : 0;

   return [...Array(rangeLength + 1).fill(0)].map((x, i) => i + rangeStart + "");
}

function cleanStringArray(stringArray: string, separator = ";") {
   /**
    * gets a string array ("1;2;3") and returns a string array
    * with sorted, unique items, also removing any undefined/empty
    *
    * Input => "3;4;2;1;3;4"
    * Ouput => "1;2;3;4"
    */
   const noEmpty = stringArray
      .split(separator)
      .filter((y) => y !== "")
      .sort();
   const noDuplicates = [...new Set(noEmpty)];

   return noDuplicates.join(separator);
}

// Execution ==================================================================

const inputMap = readMapData();
const data = readInputData();

const inputData: InputDataShape = {
   Especialidades: data["Especialidades"] as InputType<SpecialtyDTO>[],
   Clinicas: data["Clinicas"] as InputType<ClinicDTO>[],
   Sedes: data["Sedes"] as InputType<BranchDTO>[],
   Practicantes: data["Practicantes"] as InputType<PractitionerPersonDTO>[],
   Recursos: data["Recursos"] as InputType<ClinicResourceDTO>[],
};

// Create an array to store the counts for each key
const counts = Object.keys(data).map((key) => ({
   Hoja: key,
   Cantidad: data[key].length,
}));

console.log("InputData:");
console.table(counts);

// =========== MAPS

console.log("Mapas:\n", inputMap);

console.table(inputMap.Sedes);
console.table(inputMap.Especialidades);

export { inputMap, inputData };
