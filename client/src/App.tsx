import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { ADMIN, MARKET, PRODUCE, VENDOR } from './constants/globalConstants'

import Market from './components/market'
import VendorByMarketId from './components/vendor-by-market-id'
import Vendor from './components/vendor'
import Page from './components/page'
import Produce from './components/produce'
import VendorAdmin from './components/vendor-admin'
import ProduceByVendorId from './components/produce-by-vendor-id'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to={`/${MARKET}`} />
          </Route>
          <Route exact path={`/${MARKET}`}>
            <Page page={MARKET}>
              <Market />
            </Page>
          </Route>
          <Route exact path={`/${VENDOR}`}>
            <Page page={VENDOR}>
              <Vendor />
            </Page>
          </Route>
          <Route exact path={`/${VENDOR}/${ADMIN}`}>
            <VendorAdmin />
          </Route>
          <Route path={`/${MARKET}/:id/${VENDOR}`}>
            <VendorByMarketId />
          </Route>
          <Route exact path={`/${PRODUCE}`}>
            <Page page={PRODUCE}>
              <Produce />
            </Page>
          </Route>
          <Route path={`/${VENDOR}/:id/${PRODUCE}`}>
            <ProduceByVendorId />
          </Route>
          <Route>
            <div style={{ color: '#ffffff' }}>404</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
