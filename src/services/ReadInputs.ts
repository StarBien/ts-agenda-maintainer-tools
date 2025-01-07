// Imports

import fs from 'node:fs'
import excelToJson from 'convert-excel-to-json';

// type InputType = {
//     [key : string] : any[]
// }

const EXCEL_FILE = 'inputs/Agenda Mantainer.xlsx';
const readConfig = [
    {
        name: 'Clinicas',     
        header: {rows: 1},   
        columnToKey: makeCellNotation(1)
    },{
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


const removeEmptyRows = (rows : any[]) => {
    return rows.filter(row => Object.entries(row).length > 1);
}

const cleanData = (data : Object) => {
    // return Object.entries(data).map(x => [x[0], removeEmptyRows(x[1])])

    type Dictionary<T> = {
        [key : string] : T
    }

    let result : Record<string, any> = {};
    const sheetNames = Object.keys(data)

    Object.entries(data).forEach((x, i) => 
        result[sheetNames[i]] = removeEmptyRows(x[1])
    )

    return result;

}

// let output : InputType = cleanData(result)
let output = cleanData(result)
console.log(output)

console.log('EOF')

export default [[branchesMap, specialtiesMap], output]