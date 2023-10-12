import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ScheduleCard from "../components/ScheduleCard";
import { Schedule } from "../types/Schedule";

export default function MySchedulesPage() {

    const [schedules, setSchedules] = useState<Schedule[]>(Schedule.getAll())
    const [newScheduleName, setNewScheduleName] = useState<string>("")

    function addSchedule(name: string) {
        if(name === "") return
        let newSchedule = new Schedule(name);
        console.log(JSON.stringify(newSchedule))
        newSchedule.pushToLocalStorage();
        setSchedules([...schedules, newSchedule])
    }

    return (
        <>
            <PageHeader
                title="HORARIOS"
                subtitle="Crea y edita aquí tus horarios" />

            <div className="container-fluid bg-dark text-dark">
                <div className="input-group container p-2" style={{ maxWidth: 350 }}>
                    <div className="form-floating">
                        <input
                            id="newScheduleNameInput"
                            type="text"
                            className="form-control"
                            placeholder="Nuevo horario"
                            value={newScheduleName}
                            onChange={evt => {setNewScheduleName(evt.target.value)}}
                        />
                        <label htmlFor="newScheduleNameInput">Nuevo horario</label>
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={() => addSchedule(newScheduleName)}
                    >
                        CREAR
                    </button>
                </div>
            </div>

            <div
                className="container-fluid overflow-auto"
            >
                <div
                    className="container mt-3 overflow-auto"
                >
                    <div className="row row-gap-3">
                        {schedules.map((currentSchedule) =>
                            <div className="col" key={currentSchedule.idSchedule}>
                                <ScheduleCard schedule={currentSchedule}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}