import { useEffect, useState } from 'react';
import { Schedule } from '../types/Schedule'

export default function ScheduleCard(props: { schedule: Schedule }) {

    function actionToText(action: number): string {
        switch (action) {
            case 0:
                return "ENTRADA";
            case 1:
                return "SALIDA"
            case 2:
                return "PAUSA"
            case 3:
                return "REANUDAR"
            default:
                return "UNDEFINED"
        }
    }

    useEffect(() => {
        setMySchedule(Object.assign(new Schedule(), props.schedule));
    }, [props.schedule]);

    const [mySchedule, setMySchedule] = useState<Schedule>(props.schedule)

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
                                onClick={mySchedule.removeFromLocalStorage}
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
                            <>
                                <div className='d-flex justify-content-around'>
                                    <div>
                                        {currentClocking.scheduledTime}
                                    </div>
                                    <div>

                                        {actionToText(currentClocking.action)}
                                    </div>
                                    <button
                                        className='btn btn-primary'
                                    >
                                        -
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='card-footer container-fluid justify-content-center'>
                    <div className="input-group">
                        <span className="input-group-text">Variación (minutos)</span>
                        <input
                            type="number"
                            className="form-control"
                            value={mySchedule.minutesVariation}
                        // onChange={evt => setMySchedule({ ...mySchedule, minutesVariation: evt.target.valueAsNumber })}
                        />
                    </div>
                    <div className='pt-2 d-flex justify-content-end'>
                        {props.schedule !== mySchedule && <button className='btn btn-success'>GUARDAR CAMBIOS</button>}
                    </div>
                </div>

            </div>
        </>
    )
}