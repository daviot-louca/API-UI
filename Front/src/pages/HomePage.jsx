import { Link } from 'react-router-dom'


export default function HomePage() {
    return <div>
        <Link to="/login">Se connecter</Link>
        <Link to="/register">S'inscrire</Link>
    </div>
}