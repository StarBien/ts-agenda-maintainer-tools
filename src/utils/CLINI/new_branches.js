
import fs, { readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';

let newBranches = `
UUID	TM | CHILLAN	17
UUID	CENTRO DE SALUD | SALVADOR - PROVIDENCIA	50
UUID	CENTRO DE SALUD | ALAMEDA - METRO MONEDA	51
UUID	CENTRO DE SALUD | LA FLORIDA	52
UUID	CENTRO DE SALUD | MAIPU	53
UUID	CENTRO DE SALUD | SAN MIGUEL	54
UUID	CENTRO DE SALUD | INDEPENDENCIA - HIPODROMO	55
`





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


console.log('Raw data:', newBranches);

// Generate branches adapter resource

const genBranchesAdapterResourceJSON = () => {

    let withUUIDs = newBranches.replaceAll('UUID', () => uuidv4())

    let matchPattern = /([\dA-z-]+)	(.*?)	(\d+)\n/g;
    let outputPattern = '"$1" : {\n    "starbienId": "$1",\n    "name": "$2",\n    "cliniId": $3\n},\n';

    // let matches = [...newBranches.matchAll(matchPattern)]

    let output = '{'+withUUIDs.replaceAll(matchPattern, outputPattern).slice(0, -2)+'}';

    return output;

}

let branchesJSON = JSON.parse(genBranchesAdapterResourceJSON());
console.log('Branches Adapter JSON resource:\n', branchesJSON);


// Generate SQL Files

const genSQLFiles = (branchesJSON) => {

    return readFile('template_new_branches.sql');

    let templateSQL = ``;

    // fs.writeFile("./output/example.sql", formatted);
}

console.log('SQL Files:\nadd_new_branches.sql:\n\n', genSQLFiles(branchesJSON));
prompt('Give money');