import React from 'react'
import Header from '../ui-components/header'
import Footer from '../ui-components/footer'
import routes from '../route/config'
import './index.css'

const App = () => (
  <div>
    <Header />
    <div className='app'>
      {routes}
    </div>
    <Footer />
  </div>
)

export default App
