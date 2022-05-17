import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import List from "../components/hospital/List";
import Layout from "../components/Layout";
import {useEffect} from "react";
import {useAppSelector} from "../store/reducers";

const Home: NextPage = () => {
    const userInfo = useAppSelector(state => state.user.userInfo)
    const handleText = () => {
        console.log('user =>', userInfo)
    }
    useEffect(() => {
        if(userInfo) {
            localStorage.setItem('IsLogin', "true")
        }
    }, [])
    return (
    <Layout>
      <div >Hello World</div>
    </Layout>
  )
}

export default Home
