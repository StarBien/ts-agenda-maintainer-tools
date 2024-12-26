import { v4 as uuidv4 } from 'uuid';

import { Branch, BranchBuilder, Clinic } from "../../types/schemas/medical";


export default function execute() {

    let clinic = new Clinic('Test Clinic');

    console.log(genClinic(clinic))

    let [branch, branchSQL] = genBranch(new BranchBuilder()
        .setClinicId(clinic.id)
        .setName('Test Branch')
        .build()
    )

    console.log(branch, branchSQL)

} 

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

export const genBranch = (branch : Branch) : Object[] => {

    let template = `
        -- ADD BRANCH ${branch.getName().toUpperCase()}
        INSERT INTO medical.branches
        (id, clinic_id, name, country, region, commune, city, street_name, street_number, rest_of_address, latitude, longitude, altitude, phone)
        VALUES
        (
            '${branch.getId()}',
            '${branch.getClinicId()}',
            '${branch.getName()}',
            'CL',
            'CL-RM',
            'CL PRO',
            'Santiago',
            'Luis Thayer Ojeda',
            ${branch.getStreetNumber()},
            '${branch.getRestOfAddress()}',
            -33.4179992,
            -70.6032104,
            0,
            '+56229944003'
        ) ON CONFLICT DO NOTHING;
        `;

    return [branch, template];

}

type wrapperSQL = {
    object : any
    sql : string
}