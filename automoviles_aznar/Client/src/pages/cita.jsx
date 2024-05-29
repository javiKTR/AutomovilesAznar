import { parseJwt } from "../paretoken.js"
import { Header } from "../componenets/header.jsx"

export default function Cita(){
    let tokenExitst
    try {
        tokenExitst = (parseJwt(localStorage.getItem('login')).exp * 1000 > Date.now());
    } catch (error) {
        tokenExitst = false;
    }
    return(
    <>
        <Header tokenExitst={ tokenExitst }/>
    </>
    )
}