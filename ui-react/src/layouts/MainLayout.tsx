import { Outlet, Link, Navigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import RepoButton from '../components/RepoButton'
import { useState } from 'react'
import LoginPage from '../pages/LoginPage'

export default function MainLayout() {

    let userToken = localStorage.getItem("userToken")

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(userToken !== null)

    function onLoginSuccess(token: string) {
        localStorage.setItem("userToken", token)
        setIsLoggedIn(true)
    }

    return (
        <>
            <nav
                className="
                    navbar
                    navbar-expand
                    navbar-dark
                    bg-primary
                    justify-content-between
                    fixed-top
                    ps-3
                    pe-3"
            >

                <ul className="navbar-nav">
                    {
                        isLoggedIn ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/">INICIO</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/schedules">HORARIOS</Link>
                                </li>
                            </>
                            :
                            <li className='nav-item'>
                                <Link className='nav-link text-white' to="https://intratime.es">Intratime</Link>
                            </li>
                    }
                </ul>


                <RepoButton />
            </nav>
            <div style={{ paddingTop: 56 }}></div>

            {
                isLoggedIn ?
                    <Outlet />
                    :
                    <LoginPage onSuccess={onLoginSuccess} />
            }
        </>
    )
}