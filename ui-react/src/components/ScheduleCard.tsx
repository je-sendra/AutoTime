import { ChangeEvent, useEffect, useState } from 'react';
import { Schedule } from '../models/Schedule'
import { ClockingAction } from '../models/ClockingAction';
import tippy from 'tippy.js';
import axios from 'axios';

export default function ScheduleCard(props: { schedule: Schedule }) {

    const popoverBody = document.getElementById("popover-content")

    let selectedDate = "2023-10-14"

    tippy("#run-button", {
        content: popoverBody?.innerHTML,
        allowHTML: true,
        trigger: 'click',
        interactive: true,
        onShow(instance) {
            instance.popper.querySelector('.close-button')!.addEventListener('click', () => {
                handleRunButtonClicked()
                instance.hide();
            });
            instance.popper.querySelector(".date-selector")!.addEventListener('change', evt => {
                selectedDate = (evt.target as HTMLInputElement)!.value!
            })
        },
        onHide(instance) {
            instance.popper.querySelector('.close-button')!.removeEventListener('click', () => {
                instance.hide();
            });
        },
    })


    useEffect(() => {
        setMySchedule(Object.assign(new Schedule(), props.schedule));
    }, [props.schedule]);

    const [needsToSave, setNeedsToSave] = useState<boolean>(false)
    const [mySchedule, setMySchedule] = useState<Schedule>(props.schedule)

    function addNewClockingAction() {
        let newClockingAction = new ClockingAction()
        let newSchedule = { ...mySchedule, clockings: [...mySchedule.clockings, newClockingAction] }
        setNeedsToSave(true)
        setMySchedule(Object.assign(new Schedule(), newSchedule))
    }

    function removeClockingAction(idClocking: string) {
        let newSchedule = mySchedule
        newSchedule.removeClockingAction(idClocking)
        setNeedsToSave(true)
        setMySchedule(Object.assign(new Schedule(), newSchedule))
    }

    function updateTime(evt: ChangeEvent<HTMLInputElement>, clockingAction: ClockingAction) {
        let newSchedule = mySchedule
        let id = clockingAction.idClocking
        let i = newSchedule.clockings.findIndex(currentClocking => currentClocking.idClocking === id)
        newSchedule.clockings[i] = { ...newSchedule.clockings[i], scheduledTime: evt.target.value }
        setNeedsToSave(true)
        setMySchedule(Object.assign(new Schedule(), newSchedule))
    }

    function updateAction(evt: ChangeEvent<HTMLSelectElement>, clockingAction: ClockingAction) {
        let newSchedule = mySchedule
        clockingAction.action = Number(evt.target.value)
        newSchedule.updateClockingAction(clockingAction)
        setNeedsToSave(true)
        setMySchedule(Object.assign(new Schedule(), newSchedule))
    }

    function handleVariationChange(evt: ChangeEvent<HTMLInputElement>) {
        setNeedsToSave(true)
        setMySchedule(Object.assign(new Schedule(), { ...mySchedule, minutesVariation: evt.target.valueAsNumber }))
    }

    function onSaveButtonClicked() {
        setNeedsToSave(false)
        mySchedule.updateInLocalStorage()
    }

    async function handleRunButtonClicked() {
        console.log(selectedDate)
        let apiEndpoint = "https://autotime-api.azurewebsites.net/user/schedule?" +
            "date=" + selectedDate +
            "&token" + localStorage.getItem("userToken")
        console.log("HEY")
        let response = await axios.post(apiEndpoint, mySchedule)
        console.log(response)
    }

    return (
        <>
            <div className='card bg-light'>
                <div className='card-header d-flex justify-content-between'>
                    <div className='align-self-center fs-4 text-truncate'>
                        {mySchedule.name}
                    </div>
                    <div className='d-flex column-gap-2'>
                        <div
                            className='g-col-6'
                        >
                            <button
                                id='run-button'
                                className='btn btn-outline-success'
                                disabled={needsToSave.valueOf()}
                            >
                                EJECUTAR
                            </button>

                            <div className='d-none' id="popover-content">
                                <div
                                    className='card'
                                >
                                    <div
                                        className='card-header'
                                    >
                                        Selecciona una fecha
                                    </div>
                                    <div className='card-body'>

                                        <input
                                            className='form-control date-selector'
                                            type="date"
                                            value={selectedDate}
                                        />

                                        <button
                                            className='btn btn-success my-2 close-button'
                                        >
                                            FICHAR
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                            onChange={evt => handleVariationChange(evt)}
                        />
                    </div>
                    <div className='pt-2 d-flex justify-content-end'>
                        {
                            needsToSave &&
                            <button
                                className='btn btn-success'
                                onClick={onSaveButtonClicked}
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