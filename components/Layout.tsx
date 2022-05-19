import React from 'react';
import NavBar from "./Navigation/NavBar";
import Modal from "./Modal/Modal";
import {useAppSelector} from "../store";

interface Props {
    children:React.ReactNode
}

const Layout = ({children}: Props) => {

    return (
        <>
        <div>
            <NavBar />
            {children}
        </div>
        </>
    )
}
export default Layout
