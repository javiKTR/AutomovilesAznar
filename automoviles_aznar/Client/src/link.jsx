
import { EVENTS } from './consts.js'

export function navigate (href) {
    window.history.pushState({},'',href)
  
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)

}

export function Link ({target, to, ...props}){
    const handleClick = () => {
        const isMainEvent = button == 0
        const isModifiedEvent = metaKey || ctrKey || altKey || shifKey
        const isManageableEvent = target == undefined || target == '__self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            preventDefault()
            navigate(to)
        }
    }

    return <a onClick={handleClick} href={to} target={target} {...props}/>
}