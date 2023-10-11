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
                    ps-3
                    pe-3"
            >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">INICIO</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/schedules">HORARIOS</Link>
                    </li>
                </ul>

                <div className='btn-group'>
                    <button
                        className='btn btn-dark dropdown-toggle'
                        data-bs-toggle='dropdown'
                    >
                        <i
                            className='bi bi-github pad2y'
                            style={{
                                color: 'white',
                                paddingRight: '10px'
                            }}
                        />
                        REPOSITORIO
                    </button>

                    <RepoButton />
                </div>
            </nav>
            <Outlet />
        </>
    )
}