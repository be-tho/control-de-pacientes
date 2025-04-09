import { create } from "zustand"
import { DraftPatient, Patient } from "../types"
import { v4 as uuid4 } from "uuid"


// Types
type PatientState = {
    patients: Patient[]
    addPatient: (data:DraftPatient) => void
}

// Utils
const createPatient = (patient: DraftPatient) : Patient =>{
    return {
        id: uuid4(),
        ...patient
    }
}

// Store, cuando guarde el paciente reiniciar el form
export const usePatientStore = create<PatientState>((set) => ({
    patients : [],
    addPatient: (data) => {
        const newPatient = createPatient(data)

        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    }
}))        