// import inputData from "./FetchInput"
import { GenerateSQL } from "./GenerateSQL_2"

import { inputData, inputMap, InputType } from "./FetchInput"

import { BranchDTO, SpecialtyDTO, ClinicDTO, PractitionerPersonDTO, ClinicResourceDTO,  } from "./types"


// TODO Implementar ZOD o algun Schema Validator

const genSQL = new GenerateSQL(inputData)


type ScriptType<T> = T & {
    SCRIPT_ID : number
}


/** Recorrer cada mapa, y aplicar el flujo desde la Clinica al Recurso */

type ProcessState = {
    Clinics : ScriptType<ClinicDTO>[]
}

const test : ProcessState = {
    Clinics : []
}

type ItemsTree = {
    Clinics : Record<InputType<ClinicDTO>['SCRIPT_ID'], InputType<ClinicDTO>>
    Branches : any
}

// test.Clinics[0].SCRIPT_ID

function createNew
let sql = '';
// TODO Create a Clinic
inputData.Clinicas.forEach(clinica => {
    clinica.SCRIPT_ID
    sql += genSQL.createClinic(clinica)

})

inputData.Sedes.forEach(sede => {
    sql += genSQL.createBranch(sede)
})

inputMap.Sedes

console.log(sql)

// TODO Create Clinic Branch
/** 
 * La idea es que busque que SCRIPT_ID se asigno a una Clinica y su sede
 * y se cree un UUID si la Clinica no lo tiene, 
 * sino se le asigne el que corresponda
 * */

// console.log(inputData['Sedes'][0])
// console.log(genSQL.createBranch(inputData.Sedes[0]))

// TODO Link Resource to Branch


inputData.Sedes.forEach(sede => {
    // console.log(genSQL.addResourceToBranch(sede.id, 'CR111'))
})