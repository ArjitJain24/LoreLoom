import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import fileService from '../../appwrite/file'
import storageService from '../../appwrite/storage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data)=>{
        if(post){
            // already a post present so we need to update the post

            // uploading newly added image to database
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null

            // deleting the previously uploaded image
            if(file){
                fileService.deleteFile(post.featuredImage)
            }

            // updating the rest of the post details in database
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if(dbPost) navigate(`/post/${dbPost.$id}`) 
        }

        // there is no post so we are creating a new post
        else{
            const file = await fileService.uploadFile(data.image[0])

            const fileId = file.$id
            data.featuredImage = fileId
            
            const dbPost = await storageService.createPost({
                ...data,
                userID: userData.$id
            })

            if(dbPost) navigate(`/post/${dbPost.$id}`)
        }
    }

    // in slug we basically want to convert title to a - separated value so we convert any white spaces or symbol to -
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, "-")
        }
        return ''
    }, [])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if ( name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })


        return ()=> subscription.unsubscribe()
    }, [watch, slugTransform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">

            {/* input for adding title of post */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* input for creating slug */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* Real Time Editor */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* option to upload image */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
