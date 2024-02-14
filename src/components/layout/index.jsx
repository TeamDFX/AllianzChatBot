import React from 'react'

import Content from '../content'
import Header from '../header'

import './index.scss'

function Layout() {
    return (
        <div className='container-layout' >
            <Header />
            <Content />
        </div>
    )
}

export default Layout