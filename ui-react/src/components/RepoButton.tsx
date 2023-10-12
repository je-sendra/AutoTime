import { Link } from "react-router-dom";

export default function RepoButton() {
    return (
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

            <div className='dropdown-menu'>
                <Link className='dropdown-item' to='/repo'>Ver aquí</Link>
                <a
                    className='dropdown-item'
                    href='https://github.com/VewTech/AutoTime'
                    target='_blank'
                    rel='noreferrer'
                >
                    Abrir en GitHub
                </a>
            </div>
        </div>
    )
}