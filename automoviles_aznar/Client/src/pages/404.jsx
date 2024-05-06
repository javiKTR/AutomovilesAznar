import { Link } from '../link.jsx'

export default function Page404(){
    return(
        <>
        <h1>Pagina no encontrada</h1>
        <h2>Error 404</h2>
        <Link to = '/'>Volver a la pagina principal</Link>
        </>
    )
}