import { Link } from "react-router-dom";

export default function RepoButton() {
    return (
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
    )
}