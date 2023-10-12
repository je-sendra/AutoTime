import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Schedule } from '../models/Schedule'
import { ClockingAction } from '../models/ClockingAction';

export default function ScheduleCard(props: { schedule: Schedule }) {

    useEffect(() => {
        setMySchedule(Object.assign(new Schedule(), props.schedule));
    }, [props.schedule]);

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [mySchedule, setMySchedule] = useState<Schedule>(props.schedule)

    function addNewClockingAction() {
        let newClockingAction = new ClockingAction()
        let newSchedule = { ...mySchedule, clockings: [...mySchedule.clockings, newClockingAction] }
        setMySchedule(Object.assign(new Schedule(), newSchedule))
    }

    function removeClockingAction(idClocking: string) {
        mySchedule.removeClockingAction(idClocking)
        forceUpdate()
    }

    function updateTime(evt: ChangeEvent<HTMLInputElement>, clockingAction: ClockingAction) {
        clockingAction.scheduledTime = evt.target.value
        mySchedule.updateClockingAction(clockingAction)
        forceUpdate()
    }

    function updateAction(evt: ChangeEvent<HTMLSelectElement>, clockingAction: ClockingAction) {
        clockingAction.action = Number(evt.target.value)
        mySchedule.updateClockingAction(clockingAction)
        forceUpdate()
    }

    return (
        <>
            <div className='card bg-light'>
                <div className='card-header d-flex justify-content-between'>
                    <div className='align-self-center fs-4 text-truncate'>
                        {mySchedule.name}
                    </div>
                    <div className='d-flex column-gap-2'>
                        <div className='g-col-6'>
                            <button
                                className='btn btn-outline-success'
                            >
                                EJECUTAR
                            </button>
                        </div>

                        <div className='g-col-6'>

                            <button
                                onClick={() => mySchedule.removeFromLocalStorage()}
                                className='btn btn-outline-danger'
                            >
                                ELIMINAR
                            </button>
                        </div>

                    </div>
                </div>
                <div className='card-body'>
                    {
                        mySchedule.clockings.map((currentClocking) =>
                            <div key={currentClocking.idClocking}>
                                <div className='d-flex justify-content-start py-1'>
                                    <div>
                                        <input
                                            type='time'
                                            className='form-control'
                                            value={currentClocking.scheduledTime}
                                            onChange={evt => updateTime(evt, currentClocking)}
                                        />
                                    </div>
                                    <div className='px-1'>
                                        <select
                                            value={currentClocking.action}
                                            onChange={evt => updateAction(evt, currentClocking)}
                                            className='form-select'
                                        >
                                            <option value={0}>ENTRADA</option>
                                            <option value={1}>SALIDA</option>
                                            <option value={2}>PAUSA</option>
                                            <option value={3}>REANUDAR</option>
                                        </select>
                                    </div>
                                    <div>

                                        <button
                                            className='btn btn-primary'
                                            onClick={() => removeClockingAction(currentClocking.idClocking)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <button
                        className='btn btn-secondary'
                        onClick={addNewClockingAction}
                    >
                        +
                    </button>
                </div>
                <div className='card-footer container-fluid justify-content-center'>
                    <div className="input-group">
                        <span className="input-group-text">Variación (minutos)</span>
                        <input
                            type="number"
                            className="form-control"
                            value={mySchedule.minutesVariation}
                            onChange={evt => setMySchedule(Object.assign(new Schedule(), { ...props.schedule, minutesVariation: evt.target.valueAsNumber }))}
                        />
                    </div>
                    <div className='pt-2 d-flex justify-content-end'>
                        {
                            JSON.stringify(props.schedule) !== JSON.stringify(mySchedule) &&
                            <button
                                className='btn btn-success'
                                onClick={() => mySchedule.updateInLocalStorage()}
                            >
                                GUARDAR CAMBIOS
                            </button>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}