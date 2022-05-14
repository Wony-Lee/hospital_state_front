import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import List from "../components/hospital/list";

const Home: NextPage = () => {
  return (
    <div>
      <List/>
    </div>
  )
}

export default Home
