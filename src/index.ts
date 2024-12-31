import * as fs from 'node:fs';

import { Branch } from "./models/schemas/medical/Branch/Branch";
import { BranchBuilder } from "./models/schemas/medical/Branch/BranchBuilder";
import { ClinicResourceBuilder } from "./models/schemas/medical/ClinicResource/ClinicResourceBuilder";
import { GenerateSQL } from "./services/generateSQL"

console.log('Agenda Automation')
console.log('Principalmente tareas de mantenimiento')

const genSQL = new GenerateSQL();

// Read inputs
const CLINIC_ID = 'a727f974-cf19-498f-bead-fe9ba08a2dad';

let newCLINIBranches = `
UUID	TM | CHILLAN	17
UUID	CENTRO DE SALUD | SALVADOR - PROVIDENCIA	50
UUID	CENTRO DE SALUD | ALAMEDA - METRO MONEDA	51
UUID	CENTRO DE SALUD | LA FLORIDA	52
UUID	CENTRO DE SALUD | MAIPU	53
UUID	CENTRO DE SALUD | SAN MIGUEL	54
UUID	CENTRO DE SALUD | INDEPENDENCIA - HIPODROMO	55
`

let rawBranches = `

`

// Execute ====================================================================
let branches = [
    new BranchBuilder().setName('Branch 1').build(),
    new BranchBuilder().setName('Branch 2').build(),
    new BranchBuilder().setName('Branch 3').build(),
]

let resources = [
    new ClinicResourceBuilder().setName('Clinic Resource 1').build(),
    new ClinicResourceBuilder().setName('Clinic Resource 2').build(),
    new ClinicResourceBuilder().setName('Clinic Resource 3').build(),
    new ClinicResourceBuilder().setName('Clinic Resource 4').build(),
    new ClinicResourceBuilder().setName('Clinic Resource 5').build(),
]

console.log(resources)

let specialties = [
    '113091000'
    
]

branches[0].resources.push(resources[0])
branches[0].resources.push(resources[1])
branches[0].resources.push(resources[2])

// Initialize Input
let output = '';

branches.forEach(branch => {
    output += genSQL.addBranchToClinic(branch)

    branch.resources.forEach(r => {
        output += genSQL.addResourceToBranch(branch.getId(), r.getId())
    })
})

// resources.forEach(resource => {
//     output += genSQL.addResourceToBranch(resource.getId())
// })



// Return outputs =============================================================
console.log(output);

// fs.writeFile( file, data, options, callback )
let outputFile = './output/result.sql';
fs.writeFile(outputFile, output, (err) => {
    err ? console.log(err) : console.log("File written successfully\n");
})