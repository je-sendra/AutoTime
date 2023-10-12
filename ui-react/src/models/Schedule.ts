import { ClockingAction } from "./ClockingAction"

export class Schedule {

    public readonly idSchedule: string
    public name: string
    public clockings: ClockingAction[]
    public minutesVariation: number

    public constructor(name?: string) {
        this.idSchedule = window.crypto.randomUUID()
        this.name = (name === undefined ? "default" : name)
        this.clockings = []
        this.minutesVariation = 0
    }

    public static setInLocalStorage(schedules: Schedule[]) {
        localStorage.setItem("schedules", JSON.stringify(schedules))
        window.dispatchEvent(new Event("storage"));
    }

    public pushToLocalStorage() {
        let schedules = Schedule.getAll()
        Schedule.setInLocalStorage([...schedules, this])
    }

    public static getAll(): Schedule[] {
        let storedSchedules: string | null
        try {
            storedSchedules = localStorage.getItem("schedules")
        } catch (error) {
            let newSchedules: Schedule[] = []
            localStorage.setItem("schedules", JSON.stringify(newSchedules))
            return newSchedules
        }
        if (storedSchedules === null) return []
        return JSON.parse(storedSchedules)
    }

    public removeFromLocalStorage() {
        if (this === undefined) throw new Error("'this' is undefined in removeFromLocalStorage()")
        let schedules = Schedule.getAll()
        let newSchedules = schedules.filter((currentSchedule) => currentSchedule.idSchedule !== this.idSchedule)
        Schedule.setInLocalStorage(newSchedules)
    }

    public updateInLocalStorage() {
        if (this === undefined) throw new Error("'this' is undefined in updateInLocalStorage()")
        let schedules = Schedule.getAll()
        let indexToUpdate = schedules.findIndex(currentSchedule => currentSchedule.idSchedule === this.idSchedule)
        schedules[indexToUpdate] = this
        Schedule.setInLocalStorage(schedules)
    }

    public removeClockingAction(idClocking: string) {
        if (this === undefined) throw new Error("'this' is undefined in removeClockingAction()")
        this.clockings = this.clockings.filter(currentClocking => currentClocking.idClocking !== idClocking)
    }

    public updateClockingAction(clockingAction: ClockingAction) {
        if (this === undefined) throw new Error("'this' is undefined in updateClockingAction()")
        let indexToUpdate = this.clockings.findIndex(currentClocking => currentClocking.idClocking === clockingAction.idClocking)
        this.clockings[indexToUpdate] = clockingAction
    }
}