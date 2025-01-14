// Imports

import fs from 'node:fs'
import excelToJson from 'convert-excel-to-json';

import { ClinicDTO, BranchDTO, ClinicResourceDTO, PractitionerPersonDTO, SpecialtyDTO } from './types';
// import { Clinic } from '@src/models/schemas/medical/Clinic/Clinic';
// import { Medic } from '@src/models/schemas/medical/Medic/Medic';
// import { ClinicResource } from '@src/models/schemas/medical/ClinicResource/ClinicResource';
// import { Specialty } from '@src/models/schemas/medical/Specialty/Specialty';
// // import { Branch } from '@src/models/schemas/medical/Branch/Branch';

const EXCEL_FILE = 'inputs/Agenda Mantainer.xlsx';
const readConfig = [
    {
        name: 'Clinicas',     
        header: {rows: 1},   
        columnToKey: makeCellNotation(1)
    },
    {
        name: 'Sedes',
        header: {rows: 1},   
        columnToKey: makeCellNotation()
    },
    {
        name: 'Recursos',
        header: {rows: 1},   
        columnToKey: makeCellNotation()
    },{
        name: 'Especialidades',
        header: {rows: 1},   
        columnToKey: {
            A: 'SCRIPT_ID',
            B: 'snomed_code',
            C: 'snomed_label',
            D: 'starbien_label',
            E: 'specialty_type',
            F: 'practice_type'
        }
    },{
        name: 'Practicantes',
        header: {rows: 2},
        columnToKey: makeCellNotation(2)
    }
]

function makeCellNotation(rowIndex? : number) {
    rowIndex = rowIndex == null ? 1 : rowIndex;

    return [...Array(26)].reduce((acc, _, i) => {
        const char = String.fromCharCode(65 + i); // Generate A-Z
        acc[char] = `{{${char}${rowIndex}}}`; // Create A1 notation
        return acc;
      }, {})
}


// Read Files

const readPlainFile = (path : string) => {

    const data = fs.readFileSync(path, 'utf-8');

    console.log(data);
    
    
    
    const formatted = data
        .split('\r\n')
        .map(row => row.split('\t'))
    
    console.log('formatted: ', formatted)

    return formatted
    
}

const test_Specialties = () => {

    readPlainFile('inputs/specialties.csv')
    
    
    let scriptMap = readPlainFile('inputs/Mapping.csv')
    
    // Remove empty rows
    scriptMap = scriptMap.filter(row => !row.every(x => x ==''))
    console.log(scriptMap)
}

// excelToJson ========================================
// Read Maps ================

const branchesMap = excelToJson({
    sourceFile: EXCEL_FILE,
    sheets: [{
        name: 'Map',
        header: { rows: 2 },
        range: 'A3:D100',
        columnToKey: {
            B: 'Sede',
            C: 'Practicante',
            D: 'Recurso'
        }
    }]
})

let specialtiesMap = excelToJson({
    sourceFile: EXCEL_FILE,
    sheets: [{
        name: 'Map',
        header: { rows: 2 },
        range: 'F3:I100',
        columnToKey: {
            F: 'Especialidad',
            G: 'Sede',
            H: 'Practicante',
            I: 'Recurso'
        }
    }]
})

console.log('Maps:\n', 'branchesMap:\n', branchesMap, `\nspecialtiesMap:\n`, specialtiesMap)

// ==============================

let result = excelToJson({
    sourceFile: EXCEL_FILE,
    sheets: readConfig
})


const removeEmptyRows = (rows : any[]) : ValidTypes[] => {
    return rows.filter(row => Object.entries(row).length > 1) as ValidTypes[];
}

const cleanData = (data : Record<string, unknown[]>) => {
    // return Object.entries(data).map(x => [x[0], removeEmptyRows(x[1])])

    let result = {} as Dictionary
    const sheetNames = Object.keys(data)

    Object.entries(data).forEach((x, i) => 
        result[sheetNames[i]] = removeEmptyRows(x[1])
    )

    return result;

}

// let output : InputType = cleanData(result)

let output = cleanData(result)
// console.log(output)

console.log('EOF')

export default [[branchesMap, specialtiesMap], output]

//-------------------------------------------------

type Dictionary = {
    [key: string]: any[]; // Allows indexing with any string
};


export type ValidTypes = 
    ClinicDTO |  BranchDTO  | // | Specialty | ClinicResource |
    PractitionerPersonDTO | ClinicResourceDTO | SpecialtyDTO

export type InputDict = {
    [k : string] : ValidTypes[] //ValidTypes[]
}

// type InputDataType = {
//     Clinicas : Clinic[]
//     Sedes : Branch[]
//     Recursos : ClinicResource[]
//     Practicantes : any[]// Modelar Persona y Type intermedio
//     Especialidades : Specialty[]
// }