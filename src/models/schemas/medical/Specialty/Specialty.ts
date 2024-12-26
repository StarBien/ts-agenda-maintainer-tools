import { PracticeType, SpecialtyType } from "@src/types/medical"

interface SpecialtyInterface {
    getSnomedCode : () => string
    getSnomedLabel : () => string
    getStarbienLabel : () => string
    getSpecialtyType : () => SpecialtyType
    getPracticeType : () => PracticeType
}

export class Specialty implements SpecialtyInterface {
    snomedCode : string
    snomedLabel : string
    starbienLabel : string
    specialtyType : SpecialtyType
    practiceType : PracticeType

    constructor(
        snomedCode : string,
        snomedLabel : string,
        starbienLabel : string,
        specialtyType : SpecialtyType,
        practiceType : PracticeType,
    ) {
        this.snomedCode = snomedCode
        this.snomedLabel = snomedLabel
        this.starbienLabel = starbienLabel
        this.specialtyType = specialtyType
        this.practiceType = practiceType
    }

    getSnomedCode : () => string
    getSnomedLabel : () => string
    getStarbienLabel : () => string
    getSpecialtyType : () => SpecialtyType
    getPracticeType : () => PracticeType
}
