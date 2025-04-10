import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { DraftPatient, Patient } from "../types"
import { v4 as uuid4 } from "uuid"


// Types
type PatientState = {
    patients: Patient[]

    activeId: Patient['id']
    addPatient: (data:DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data:DraftPatient) => void
}

// Utils
const createPatient = (patient: DraftPatient) : Patient =>{
    return {
        id: uuid4(),
        ...patient
    }
}

// Store, cuando guarde el paciente reiniciar el form
export const usePatientStore = create<PatientState>()(
    devtools(persist((set) => ({
        patients : [],
        activeId: '',

        //Funcion para agregar un paciente
        addPatient: (data) => {
            const newPatient = createPatient(data)

            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },

        //Funcion para eliminar un paciente
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },

        //Funcion para obtener un paciente
        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        
        },

        //Funcion para actualizar un paciente
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                activeId: ''
            }))
        }
    }),
    {
        name: 'patient-storage'
    }))
)