import { GenerateSQL } from "./generateSQL";
import ReadInputs from "./ReadInputs";


const [maps, data] = ReadInputs;
const genSQL = new GenerateSQL();


// Initialize UUID where missing ====================================

function initializeUUIDs() {

    console.log('Initializing UUIDs...')

    console.log('Data keys:', Object.keys(data))

    

    

    for(const key of Object.keys(data)) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            // console.log(`Items in ${key}: ${data[key]}`)
        }
        
    }

    // console.log('Keys? : ', data[0])
    
    [
        ['Clinicas', []],
        ['']
    ]
    
    
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


