import { AttendanceType, LocationType } from "@src/types/medical"
import { Medic } from "./Medic"

interface MedicBuilderInterface {
    setId : (id : string) => MedicBuilder
    setAttendanceType : (attendanceType : AttendanceType) => MedicBuilder
    setLocationType : (locationType : LocationType) => MedicBuilder
    setPhoto : (photo : string) => MedicBuilder

    build : () => Medic
    getMedic : () => Medic
}

class MedicBuilder implements MedicBuilderInterface {
    id : string
    attendanceType : AttendanceType
    locationType : LocationType
    photo : string
    medic : Medic
    
    setId(value: string) : this {
        this.id = value
        return this
    }

    setAttendanceType(value: AttendanceType) : this {
        this.attendanceType = value;
        return this;
    }

    setLocationType(value: LocationType) : this {
        this.locationType = value
        return this
    }

    setPhoto(value: string) : this {
        this.photo = value
        return this
    }
    
    build() : Medic {
        this.medic = new Medic(
            this.id,
            this.attendanceType,
            this.locationType,
            this.photo
        )

        return this.medic;
    }

    getMedic() : Medic {
        return this.medic;
    }
    
}
