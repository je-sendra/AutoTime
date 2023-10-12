export class ClockingAction {

    constructor() {
        this.idClocking = window.crypto.randomUUID()
        this.scheduledTime = "00:00:00"
        this.action = 0
    }

    idClocking: string
    scheduledTime: string
    action: number
}