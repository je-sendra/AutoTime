import { ClockingAction } from "./ClockingAction"

export class Schedule {

    public readonly idSchedule: string
    public name: string
    public clockings: ClockingAction[]
    public minutesVariation: number

    public constructor(name?: string) {
        this.idSchedule = window.crypto.randomUUID()
        this.name = (name === undefined ? "default" : name )
        this.clockings = []
        this.minutesVariation = 0
    }

    public static setInLocalStorage(schedules : Schedule[]) {
        localStorage.setItem("schedules", JSON.stringify(schedules))
    }

    public pushToLocalStorage() {
        let schedules = Schedule.getAll()
        Schedule.setInLocalStorage([...schedules, this])
    }

    public static getAll(): Schedule[] {
        let storedSchedules : string | null
        try {
            storedSchedules = localStorage.getItem("schedules")
        } catch (error) {
            let newSchedules : Schedule[] = []
            localStorage.setItem("schedules", JSON.stringify(newSchedules))
            return newSchedules
        }
        if(storedSchedules === null) return []
        return JSON.parse(storedSchedules)
    }

    public removeFromLocalStorage() {
        let schedules = Schedule.getAll()
        console.log(this)
        console.log(this.idSchedule)
        let newSchedules = schedules.filter((currentSchedule) => currentSchedule.idSchedule !== this.idSchedule)
        console.log(JSON.stringify(newSchedules))
        Schedule.setInLocalStorage(newSchedules)
    }
}