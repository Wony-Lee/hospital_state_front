import React from 'react';
import NavBar from "./Navigation/NavBar";

interface Props {
    children:React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}
export default Layout
