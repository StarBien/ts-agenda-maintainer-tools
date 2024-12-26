import { AttendanceType, LocationType } from "@src/types/medical"

interface MedicInterface {
    getId : () => string
    getAttendanceType : () => AttendanceType
    getLocationType : () => LocationType
    getPhoto : () => string
}

export class Medic implements MedicInterface {
    private readonly id : string
    private readonly attendanceType : AttendanceType
    private readonly locationType : LocationType
    private readonly photo : string

    constructor(
        id : string,
        attendanceType : AttendanceType,
        locationType : LocationType,
        photo : string
    ) {
        this.id = id
        this.attendanceType = attendanceType
        this.locationType = locationType
        this.photo = photo
    }

    getId() : string {
        return this.id
    }

    getAttendanceType() : AttendanceType {
        return this.attendanceType
    }

    getLocationType() : LocationType {
        return this.locationType
    }

    getPhoto() : string {
        return this.photo
    }
}
