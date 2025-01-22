import { randomUUID } from "crypto";
import fs, { readFile } from "fs";
import { v4 as uuidv4 } from "uuid";

let newBranches_old = `
UUID	TM | CHILLAN	17
UUID	CENTRO DE SALUD | SALVADOR - PROVIDENCIA	50
UUID	CENTRO DE SALUD | ALAMEDA - METRO MONEDA	51
UUID	CENTRO DE SALUD | LA FLORIDA	52
UUID	CENTRO DE SALUD | MAIPU	53
UUID	CENTRO DE SALUD | SAN MIGUEL	54
UUID	CENTRO DE SALUD | INDEPENDENCIA - HIPODROMO	55
`;

let newBranches = `
e8268c48-a34b-44af-b07a-f6c4b875c6ae	CENTRO DE SALUD | SALVADOR - PROVIDENCIA	50
8efb525a-c1f4-48d0-9ced-0f94f69f5ace	CENTRO DE SALUD | ALAMEDA - METRO MONEDA	51
fa0db95f-f7a1-419f-9f9e-634a585c187f	CENTRO DE SALUD | LA FLORIDA	52
4bbb48bf-60f4-457f-aaa3-c88bb3f2836c	CENTRO DE SALUD | MAIPU	53
a028a540-2805-411b-919a-fb6575a01fd9	CENTRO DE SALUD | SAN MIGUEL	54
07a9d915-93fd-48e7-b3d3-4f89da83bc25	CENTRO DE SALUD | INDEPENDENCIA - HIPODROMO	55
`;

// ==============================================================

/**
 * Previous requirements for new Branches:
 * CLINIC ID
 * SPECIALTY ID
 *
 *
 * Methods to have:
 * genClinic
 * genSpecialty
 * genBranch(clinicId, details)
 * genClinicResource()
 * genPractitioner
 *
 * assResourceToBranch
 * assResourceToSpecialty
 * assBranchToSpecialty
 * assPractitionerToSpecialty
 * assPractitionerToBranch
 *
 * OBS: Practitioners have to be
 * addded to the persons table
 *
 * -------------------------------
 *
 * Flow to create new branches with resources
 * The clinic and specialties already exists
 *
 * Create branch
 * Create clinic resource
 *
 * Associate branch to clinic
 * Associate branch to specialty
 * Associate resource to branch
 *
 *
 *
 */

// ==============================================================

console.log("Raw data:", newBranches);

// Generate branches adapter resource

const genBranchesAdapterResourceJSON = () => {
   let withUUIDs = newBranches.replace(/UUID/gm, () => randomUUID());

   let matchPattern = /([\dA-z-]+)	(.*?)	(\d+)\n/g;
   let outputPattern =
      '"$1" : {\n    "starbienId": "$1",\n    "name": "$2",\n    "cliniId": $3\n},\n';

   // let matches = [...newBranches.matchAll(matchPattern)]

   let output = "{" + withUUIDs.replace(matchPattern, outputPattern).slice(0, -2) + "}";

   fs.writeFileSync("output/example.json", output);

   return output;
};

let branchesJSON = JSON.parse(genBranchesAdapterResourceJSON());
console.log("Branches Adapter JSON resource:\n", branchesJSON);
