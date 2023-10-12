import { Outlet, Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import RepoButton from '../components/RepoButton'

export default function MainLayout() {


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
                        "userToken" !== undefined ?
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
            <Outlet />
        </>
    )
}