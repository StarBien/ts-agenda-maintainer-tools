
import { GenerateSQL } from "./GenerateSQL"
import { inputData, inputMap, InputType } from "./FetchInput"

import { BranchDTO, SpecialtyDTO, ClinicDTO, PractitionerPersonDTO, ClinicResourceDTO,  } from "./types"

import { consolidateInsertStatements } from "../utils/consolidate-sql-statements"


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

create()
update()

// test.Clinics[0].SCRIPT_ID

function create() {

    let sql = '';
    // TODO Create a Clinic
    inputData.Clinicas.forEach(clinica => {
        clinica.SCRIPT_ID
        sql += genSQL.createClinic(clinica)
    
    })
    
    inputData.Sedes.forEach(sede => {
        sql += genSQL.createBranch(sede)
    })
    
    // console.log('inputData.Sedes: ', inputMap.Sedes)

    // Run Sedes Map
    Object.entries(inputMap.Sedes).forEach(kvp => {
        const sedeScriptId = kvp[0]
        const {Practicantes, Recursos} = kvp[1]

        const sede = inputData.Sedes.find(x => x.SCRIPT_ID.toString() == sedeScriptId)
        if(sede == undefined) return
        
        // Link Practitioners to Branches
        Practicantes.toString().split(';').forEach(scriptId => {

            if(scriptId == '') return   // Empty cell

            const practicante = inputData.Practicantes.find(x => x.SCRIPT_ID.toString() == scriptId)
            if(practicante == undefined) throw new Error(`[Sedes Map] - No se encontró el practicante con Script ID '${scriptId}'`)

            sql += genSQL.addPractitionerToBranch(sede.id, practicante.id)

        })
        
        // Link Resources to Branches
        Recursos.toString().split(';').forEach(scriptId => {

            if(scriptId == '') return   // Empty cell
            
            const recurso = inputData.Recursos.find(x => x.SCRIPT_ID.toString() == scriptId)
            if(recurso == undefined) throw new Error(`[Sedes Map] - No se encontró el recurso con Script ID '${scriptId}'`)

            sql += genSQL.addResourceToBranch(sede.id, recurso.id)

        })
    })


    // Run Especialidades Map
    Object.entries(inputMap.Especialidades).forEach(kvp => {
        const especialidadScriptId = kvp[0]
        const {Sedes, Recursos, Practicantes} = kvp[1]

        const especialidad = inputData.Especialidades.find(x => x.SCRIPT_ID.toString() == especialidadScriptId)
        if(especialidad == undefined) return

        Sedes.toString().split(';').forEach(scriptId => {
            if(scriptId == '') return   // Empty cell
            
            const sede = inputData.Sedes.find(x => x.SCRIPT_ID.toString() === scriptId)
            if(sede == undefined) throw new Error(`[Especialidades Map] - No se encontró el sede con Script ID '${scriptId}'`)
            
            sql += genSQL.addSpecialtyToBranch(especialidad.snomedCode, sede.id)

        })

        Recursos.toString().split(';').forEach(scriptId => {
            if(scriptId == '') return   // Empty cell
            
            const sede = inputData.Sedes.find(x => x.SCRIPT_ID.toString() === scriptId)
            if(sede == undefined) throw new Error(`[Especialidades Map] - No se encontró la sede con Script ID '${scriptId}'`)
            
            sql += genSQL.addSpecialtyToBranch(especialidad.snomedCode, sede.id)

        })

        Practicantes.toString().split(';').forEach(scriptId => {
            if(scriptId == '') return   // Empty cell
            
            const sede = inputData.Sedes.find(x => x.SCRIPT_ID.toString() === scriptId)
            if(sede == undefined) throw new Error(`[Especialidades Map] - No se encontró el practicante con Script ID '${scriptId}'`)
            
            sql += genSQL.addSpecialtyToBranch(especialidad.snomedCode, sede.id)

        })
    })

    
    console.log(consolidateInsertStatements([sql]).join('\n\n'))

}

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

// ------------------------------------------------------------------
// UPDATE DB ========================================================
// ------------------------------------------------------------------

function update() {
    return 
}