import { Link } from 'react-router'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5">
            <div className="container">
                <div className="d-flex gap-3">
                <Link className="navbar-brand" to= "/">Home</Link>
                <Link className="navbar-brand" to= "/library">My Library</Link>
                </div>
            </div>
        
        </nav>
    )
}

export default NavBar