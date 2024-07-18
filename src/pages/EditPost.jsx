import React, {useState, useEffect} from 'react'
import storageService from '../appwrite/storage'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'

function EditPost() {

    const [post, SetPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            storageService.getPost(slug)
            .then((post)=>{
                if(post) {
                    SetPost(post)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])


  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
