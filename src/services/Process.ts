import { LocationType } from "@src/types/medical";
import { GenerateSQL } from "./generateSQL";
import ReadInputs, { ValidTypes } from "./ReadInputs";
import { randomUUID } from "crypto";

import { ClinicDTO, BranchDTO,  } from "./types";

const [maps, data] = ReadInputs;
const genSQL = new GenerateSQL();


// Initialize UUID where missing ====================================

function initializeUUIDs() {

    console.log('Initializing UUIDs...')

    
    const keys = Object.keys(data);
    console.log('Data keys:', keys)

    keys.forEach((key, i) => {
        console.log('Entries: ', key)
        
    })

    Object.entries(data).forEach( x => {
        let key = x[0]
        let values : ValidTypes[] = x[1]
        // console.log('Entries: ', key, values.length)

        values.forEach(row  => {
            // console.log(row as Clinic[])
            // if(row instanceof Clinic[]) {
            //     console.log('Working with Clinics')
            //     // row.forEach(y => y['id'] = 'AAA-BBB-CCC')
            // }
            // if(row as Branch[]) {
            //     console.log('Working with Branches')
            //     // row.forEach(y => y['id'] = 'AAA-BBB-CCC')
            // }

            // if(row as Clinic) row['id'] = 'AAA-BBB-CCC' //randomUUID()
            // if(row instanceof Branch) row['id'] = 'AAA-BBB-CCC' //randomUUID()
        })


        console.log('DEBUG - With UUID: ', values[0])

    });
    
    
    console.log('Finished initializing UUIDs...')
}

initializeUUIDs()

// Create new Clinics ===============================================

function createNewClinics() {
    console.log('Creating new Clinics')

}

createNewClinics()

// Create new Branches

// Create new Specialties

// Create new Clinic Resources

// Create new Practitioners + Person

// Link elements
// - Specialties to: Resource/Practitioner
// - Branch to: Resource/Practitioner/Specialty

// Output ===========================================================


