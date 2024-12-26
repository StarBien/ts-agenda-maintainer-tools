import { PracticeType, SpecialtyType } from "@src/types/medical";
import { Specialty } from "./Specialty";

interface SpecialtyBuilderInterface {
    setSnomedCode : (value : string) => SpecialtyBuilder
    setSnomedLabel : (value : string) => SpecialtyBuilder
    setStarbienLabel : (value : string) => SpecialtyBuilder
    setSpecialtyType : (value : SpecialtyType) => SpecialtyBuilder
    setPracticeType : (value : PracticeType) => SpecialtyBuilder

    getSpecialty : () => Specialty
    build : () => Specialty
}

export class SpecialtyBuilder implements SpecialtyBuilderInterface {
    snomedCode : string
    snomedLabel : string
    starbienLabel : string
    specialtyType : SpecialtyType
    practiceType : PracticeType

    specialty : Specialty

    setSnomedCode(value : string) : this {
        this.snomedCode = value
        return this
    }

    setSnomedLabel(value : string) : this {
        this.snomedLabel = value
        return this
    }

    setStarbienLabel(value : string) : this {
        this.starbienLabel = value
        return this
    }

    setSpecialtyType(value : SpecialtyType) : this {
        this.specialtyType = value
        return this
    }

    setPracticeType(value : PracticeType) : this {
        this.practiceType = value
        return this
    }

    getSpecialty() : Specialty {
        return this.specialty;
    };

    build() : Specialty {
        this.specialty = new Specialty(
            this.snomedCode,
            this.snomedLabel,
            this.starbienLabel,
            this.specialtyType,
            this.practiceType,
        )
        return this.specialty
    };
}