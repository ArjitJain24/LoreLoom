import React, {useState, useEffect} from 'react'
import storageService from '../appwrite/storage'
import { Container, PostCard } from '../components'




function Home() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        storageService.getPosts()
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    else{
        return (
            <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...posts} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        )
    }
}

export default Home