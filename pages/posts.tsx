import React from 'react';
import List from "../components/hospital/List";
import Layout from "../components/Layout";
import {usePosts} from "../hooks/usePosts";

const Posts = () => {
    const {isLoading, data} = usePosts();
    if(isLoading) return `...Loading`
    return (
        <Layout>
            <List posts={data}/>
        </Layout>
    )
}

export default Posts
