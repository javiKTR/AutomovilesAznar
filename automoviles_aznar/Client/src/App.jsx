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
const ManageCars = lazy(() => import('./pages/manageCoches.jsx'))

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
          <Route path='/manageCars' Component={ManageCars} />
        </Router>
      </Suspense>

    </main>
  );
}


export default App
