import fs from "fs";
import { GenerateSQL } from "./GenerateSQL";
import { inputData, inputMap, InputType } from "./FetchInput";

import { ClinicDTO } from "@src/schemas/medical";

import { consolidateInsertStatements } from "@utils/consolidate-sql-statements";

const genSQL = new GenerateSQL(inputData);

type ScriptType<T> = T & {
   SCRIPT_ID: number;
};

/** Recorrer cada mapa, y aplicar el flujo desde la Clinica al Recurso */

type ProcessState = {
   Clinics: ScriptType<ClinicDTO>[];
};

const test: ProcessState = {
   Clinics: [],
};

type ItemsTree = {
   Clinics: Record<InputType<ClinicDTO>["SCRIPT_ID"], InputType<ClinicDTO>>;
   Branches: any;
};

create();
// update();

function create() {
   let sql = "";

   // Create Specialties
   inputData.Especialidades.forEach((especialidad) => {
      if (especialidad.SCRIPT_ACTION == "CREATE") {
         sql += genSQL.createSpecialty(especialidad);
      }
   });

   // Create Clinics
   inputData.Clinicas.forEach((clinica) => {
      //   clinica.SCRIPT_ID
      if (clinica.SCRIPT_ACTION == "CREATE") {
         sql += genSQL.createClinic(clinica);
      }
   });

   // Create Branches
   inputData.Sedes.forEach((sede) => {
      // Si una sede fue vinculada a una clinica por crear, se recupera el SCRIPT_ID correspondiente a la nueva clinica
      let matchClinicScriptId = /C(\d+)/.exec(sede.clinicId);

      const clinicId: string = matchClinicScriptId
         ? inputData.Clinicas.find((c) => c.SCRIPT_ID == Number(matchClinicScriptId[1]))?.id ?? ""
         : sede.clinicId;

      sede.clinicId = clinicId;

      if (sede.SCRIPT_ACTION == "CREATE") {
         sql += genSQL.createBranch(sede);
      }
   });

   // Create Practitioners (Table persons + medics)
   inputData.Practicantes.forEach((practitioner) => {
      if (practitioner.SCRIPT_ACTION == "CREATE") {
         sql += genSQL.createPractitioner(practitioner);
      }
   });

   // Create Resources
   inputData.Recursos.forEach((resource) => {
      if (resource.SCRIPT_ACTION == "CREATE") {
         sql += genSQL.createClinicResource(resource);
      }
   });

   // Run Sedes Map
   Object.entries(inputMap.Sedes).forEach((kvp) => {
      const sedeScriptId = kvp[0];
      const { Practicantes, Recursos } = kvp[1];

      const sede = inputData.Sedes.find((x) => x.SCRIPT_ID.toString() == sedeScriptId);
      if (sede == undefined) return;

      // Link Practitioners to Branches
      Practicantes.toString()
         .split(";")
         .forEach((scriptId) => {
            if (scriptId == "") return; // Empty cell

            const practicante = inputData.Practicantes.find(
               (x) => x.SCRIPT_ID.toString() == scriptId
            );
            if (practicante == undefined)
               throw new Error(
                  `[Sedes Map] - No se encontró el practicante con Script ID '${scriptId}'`
               );

            sql += genSQL.addPractitionerToBranch(sede.id, practicante.id);
         });

      // Link Resources to Branches
      Recursos.toString()
         .split(";")
         .forEach((scriptId) => {
            if (scriptId == "") return; // Empty cell

            const recurso = inputData.Recursos.find((x) => x.SCRIPT_ID.toString() == scriptId);
            if (recurso == undefined)
               throw new Error(
                  `[Sedes Map] - No se encontró el recurso con Script ID '${scriptId}'`
               );

            sql += genSQL.addResourceToBranch(sede.id, recurso.id);
         });
   });

   // Run Especialidades Map
   Object.entries(inputMap.Especialidades).forEach((kvp) => {
      const especialidadScriptId = kvp[0];
      const { Sedes, Recursos, Practicantes } = kvp[1];

      const especialidad = inputData.Especialidades.find(
         (x) => x.SCRIPT_ID.toString() == especialidadScriptId
      );
      if (especialidad == undefined) return;

      Sedes.toString()
         .split(";")
         .forEach((scriptId) => {
            if (scriptId == "") return; // Empty cell

            const sede = inputData.Sedes.find((x) => x.SCRIPT_ID.toString() === scriptId);
            if (sede == undefined)
               throw new Error(
                  `[Especialidades Map] - No se encontró el sede con Script ID '${scriptId}'`
               );

            sql += genSQL.addSpecialtyToBranch(especialidad.snomedCode, sede.id);
         });

      Recursos.toString()
         .split(";")
         .forEach((scriptId) => {
            if (scriptId == "") return; // Empty cell

            const recurso = inputData.Recursos.find((x) => x.SCRIPT_ID.toString() === scriptId);
            if (recurso == undefined)
               throw new Error(
                  `[Especialidades Map] - No se encontró el recurso con Script ID '${scriptId}'`
               );

            sql += genSQL.addSpecialtyToResource(especialidad.snomedCode, recurso.id);
         });

      Practicantes.toString()
         .split(";")
         .forEach((scriptId) => {
            if (scriptId == "") return; // Empty cell

            const practicante = inputData.Practicantes.find(
               (x) => x.SCRIPT_ID.toString() === scriptId
            );
            if (practicante == undefined)
               throw new Error(
                  `[Especialidades Map] - No se encontró el practicante con Script ID '${scriptId}'`
               );

            sql += genSQL.addSpecialtyToPractitioner(especialidad.snomedCode, practicante.id);
         });
   });

   const result = consolidateInsertStatements([sql]).join("\n\n");
   // const result = sql;
   const outputFilePath = "./output/example.sql";

   console.log("\n\nWritting output into: ", outputFilePath);
   fs.writeFileSync(outputFilePath, result);
}

// ------------------------------------------------------------------
// UPDATE DB ========================================================
// ------------------------------------------------------------------

function update() {
   return;
}
