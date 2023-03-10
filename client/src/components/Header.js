import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import authService from "../utils/authService"

const Header = () => {
    const navigate = useNavigate
    useEffect(() => {
        if (authService.getToken() == null) {
            navigate('/')
        }
    }, [])
    return (
        <header className="Header">
            <nav>
                <ul>
                    <li><Link to="movies">Movies</Link></li>
                    <li><Link to="subscriptions">Subscriptions</Link></li>
                    <li><Link to="users">Users Managment</Link></li>
                    <li><Link to="users">Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header