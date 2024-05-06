import { EVENTS } from "./consts"
import { useState, useEffect, Children } from "react"
import { match } from 'path-to-regexp'

export function Router ({children, routes = [], defaultComponent: DefaultComponent}) {
    const [currentPhath, setCurrentPath] = useState(window.location.pathname)
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }
      
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)
      }
    }, [])
    
    let routeParams = {}


    const routesFromChildren = Children.map(children, ({ props, type }) => {
      const { name } = type
      const isRoute = name == 'Route'
      return isRoute ? props : null
    })
    
    const reoutesToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = reoutesToUse.find(({ path }) => {
      if (path == currentPhath) return true

      const marcherUrl = match(path,  {decode: decodeURIComponent })
      const matched = marcherUrl(currentPhath)
      if (!matched) return false
      
      routeParams = matched.params
      return true

    })?.Component

    return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}