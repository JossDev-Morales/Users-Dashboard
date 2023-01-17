import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

function PopSucces({reset}) {
    setTimeout(() => {
        reset(false)
    }, 3000);
    return(
        <div className="succes glass succes1">
            <p>Succes</p>
            <span>
            <FontAwesomeIcon icon={faCheck}/>
            </span>
        </div>
    )
}
export default PopSucces