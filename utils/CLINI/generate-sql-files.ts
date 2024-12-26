import { v4 as uuidv4 } from 'uuid';

import { Branch, Clinic } from "../../types/schemas/medical";


export default function execute() {

    let clinic = new Clinic()

    console.log(genClinic(clinic))

} 

execute();

export const genClinic = (clinic : Clinic) => {

    if(!clinic.id) {
        clinic.id = uuidv4()
    }

    let template = `
    INSERT INTO medical.clinics
    (id, name, has_online_booking, location_type)
    VALUES (
        '${clinic.id}',
        '${clinic.name}',
        ${clinic.hasOnlineBooking},
        '${clinic.locationType}'
    ) ON CONFLICT DO NOTHING;
    `

    return template;

}

export const genBranch = (branch : Branch) => {

    

}