import { Suspense, lazy } from 'react'
import { Component, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const AlquilerPage = lazy(() => import('./pages/alquilar.jsx'))
const CompraPage = lazy(() => import('./pages/compra.jsx'))
const HomePage = lazy(() => import('./pages/home.jsx'))
const Page404 = lazy(() => import('./pages/404.jsx'))
const SerchPage = lazy(() => import('./pages/serch.jsx'))
const Singin = lazy(() => import('./pages/Singin.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Logout = lazy(() => import('./pages/Logout.jsx'))
const Coche = lazy(() => import('./pages/coche.jsx'))
const Cocheadmin = lazy(() => import('./pages/cocheAdmin.jsx'))
const ManageCars = lazy(() => import('./pages/manageCoches.jsx'))
const Cita = lazy(() => import('./pages/cita.jsx'))

import { Router } from './Router.jsx'
import { Route } from './Route.jsx'

const routes = [
  {
    path: '/serch/:query',
    Component: SerchPage
  }
]



function App() {

  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/alquiler' Component={AlquilerPage} />
          <Route path='/compra' Component={CompraPage} />
          <Route path='/Singin' Component={Singin} />
          <Route path='/Login' Component={Login} />
          <Route path='/Logout' Component={Logout} />
          <Route path='/Coche/:query' Component={Coche} />
          <Route path='/CocheAdmin/:query' Component={Cocheadmin} />
          <Route path='/manageCars' Component={ManageCars} />
          <Route path='/cita' Component={Cita} />
        </Router>
      </Suspense>
    </main>
  );
}


export default App
