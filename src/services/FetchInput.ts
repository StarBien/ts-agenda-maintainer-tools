import { readFileSync } from "fs";
import * as XLSX from 'xlsx'

import { BranchDTO, ClinicDTO, ClinicResourceDTO, PractitionerPersonDTO, SpecialtyDTO } from "./types";
import { randomUUID } from "crypto";


const EXCEL_FILE = 'inputs/Agenda Mantainer.xlsx';

const buf = readFileSync(EXCEL_FILE);
const workbook = XLSX.read(buf);

type UUID = `${string}-${string}-${string}-${string}-${string}`;

type ValidTypes = 
BranchDTO | ClinicDTO | ClinicResourceDTO | PractitionerPersonDTO | SpecialtyDTO

export type InputType<T> = T & {
    SCRIPT_ID : number
}

export type InputDataShape = {
    Especialidades : InputType<SpecialtyDTO>[]
    Clinicas : InputType<ClinicDTO>[]
    Sedes : InputType<BranchDTO>[]
    Recursos : InputType<ClinicResourceDTO>[]
    Practicantes : InputType<PractitionerPersonDTO>[]
}

type MapTypes = 
[PractitionerPersonDTO, ClinicResourceDTO] | 
[BranchDTO, PractitionerPersonDTO, ClinicResourceDTO]

type MapShape = {
    Sedes: Record<string, {Practicantes : string, Recursos : string}>
    // Sedes: {[Sede : string] : {Practicantes : string, Recursos : string}}
    Especialidades: Record<string, {Sedes: string, Practicantes : string, Recursos : string}>
}

const defaultSheetConfig =     {
    name: 'Default',
    blankrows: false,
    defval:"",
}

const sheetsConfig : (XLSX.Sheet2JSONOpts & {name: string})[]  = [
    defaultSheetConfig,
    {
        name: 'Practicantes',
        range: 1,
    },
    {
        ...defaultSheetConfig,
        name: 'Map Sedes',
        range: "B4:D10",
    },
    {        
        ...defaultSheetConfig,
        name: 'Map Especialidad',
        range: "F4:I10",
    }
]

function readMapData() : MapShape {
    
    const maps : MapShape = {
        Sedes: {},
        Especialidades: {}
    }

    const sheet = workbook.Sheets['Map']

    type MapSedesRow = {
        Sede : string
        Practicante : string
        Recurso : string
    }

    type MapEspecialidadesRow = {
        Especialidad : string
        Sede : string
        Practicante : string
        Recurso : string
    }

    sheetsConfig
        .filter(x => x.name.startsWith('Map '))
        .forEach(sheetConfig => {

            const json = XLSX.utils.sheet_to_json<MapSedesRow | MapEspecialidadesRow>(sheet, sheetConfig)
            console.log(`Reading map sheet '${sheetConfig.name}'...\n`, json)

            if(sheetConfig.name == 'Map Sedes') {
                (json as MapSedesRow[]).forEach(row  => {
                const sedes = row.Sede.toString().split(';');

                sedes.forEach(s => {
                    maps.Sedes[s] = {
                        Practicantes: row.Practicante, 
                        Recursos: row.Recurso
                    }
                })
            })}

            if(sheetConfig.name == 'Map Especialidad') {
                (json as MapEspecialidadesRow[]).forEach(row  => {
                    const especialidades = row.Especialidad.toString().split(';');
                
                    especialidades.forEach(e => {
                        maps.Especialidades[e] = {
                            Sedes: row.Sede,
                            Practicantes: row.Practicante, 
                            Recursos: row.Recurso
                        }
                    }) 
                })
            }

        })

    return maps;
}

function readInputData() : Record<string, ValidTypes[]> {

    const data : Record<string, ValidTypes[]> = {}

    Object.values(workbook.Sheets).forEach((sheet, i) => {

        const sheetName = workbook.SheetNames[i]

        if(sheetName == 'Map') return
        console.log(`Reading sheet '${sheetName}'...`)
    
        const sheetConfig = 
            sheetsConfig.find(x => x.name == sheetName) ?? sheetsConfig[0]
        
        let json = XLSX.utils.sheet_to_json<InputType<ValidTypes>>(sheet, sheetConfig)
    
        // Remove un-assigned rows
        const clean = json.filter(row => Object.values(row).slice(1).join("") !== "")
    
        data[sheetName] = clean
    })

    // Initialize UUIDs for each item in the sheets (where needed)
    Object.entries(data).forEach(([key, values], i) => {
        // Logica un poco repetitiva pero por temas de TS hay que castear los tipos
        // Si saben de una mejora apliquenla bienvenidamente!
        if(key == 'Clinicas') (values as ClinicDTO[]).forEach(x => x.id = initializeUUID(x.id))
        if(key == 'Sedes') (values as BranchDTO[]).forEach(x => x.id = initializeUUID(x.id))
        if(key == 'Practicantes') (values as PractitionerPersonDTO[]).forEach(x => x.id = initializeUUID(x.id))
        if(key == 'Recursos') (values as ClinicResourceDTO[]).forEach(x => x.id = initializeUUID(x.id))
    })

    return data
}


function initializeUUID(string : string) : UUID {
    return isUUID(string) ? 
        string as UUID :
        randomUUID()
}

const isUUID = (string : string) : boolean => {
    if(string == null) return false
    if(string.split('-').length < 5) return false

    return true
}


// Execution ==================================================================

const inputMap = readMapData()
const data = readInputData()

const inputData : InputDataShape = {
    Especialidades: data['Especialidades'] as InputType<SpecialtyDTO>[],
    Clinicas: data['Clinicas'] as InputType<ClinicDTO>[],
    Sedes: data['Sedes'] as InputType<BranchDTO>[],
    Practicantes: data['Practicantes'] as InputType<PractitionerPersonDTO>[],
    Recursos: data['Recursos'] as InputType<ClinicResourceDTO>[]
};

// console.log(inputData);


// Create an array to store the counts for each key
const counts = Object.keys(data).map(key => ({
    Hoja: key,
    Cantidad: data[key].length
  }));
  
console.log('InputData:')
console.table(counts);

// =========== MAPS

console.log('Mapas:\n', inputMap)
// console.table(inputMap)
console.table(inputMap.Sedes)
console.table(inputMap.Especialidades)
// console.table(inputMap)


export {inputMap, inputData}
