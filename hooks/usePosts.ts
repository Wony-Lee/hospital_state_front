import axios from 'axios'
import {useMutation, useQuery} from 'react-query'

export const usePosts = () => {
    const posts = `/posts`
    return useQuery(['Posts'], () => {
        return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}${posts}`)
            .then((res) => { return res.data})
    })
}

