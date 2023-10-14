import { useState } from 'react'

export default function LoginBox({ onLoginButtonClicked }) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <>
            <div className="card">
                <div className="card-header">
                    INICIAR SESIÓN
                </div>
                <div className="card-body">
                    <form>
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                        />

                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </form>

                    <button className="btn btn-success my-2" onClick={() => onLoginButtonClicked(email, password)}>
                            ACEPTAR
                        </button>
                </div>
            </div>
        </>
    )
}