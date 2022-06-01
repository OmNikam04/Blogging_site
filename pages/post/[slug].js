import React from 'react'
import { useRouter } from 'next/router'
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'
import { getPosts, getPostDetails} from '../../services'

const PostDetails = ({ post }) => {
    const router = useRouter()

    if(router.isFallback){
        return <Loader/>
    }
    console.log(post)
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                {/* Render our compoents */}
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentsForm slug={post.slug}/>
                <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8">
                    <PostWidget slug={post.slug} categories={post.categories.map((category)=> category.slug)}/>
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails


export async function getStaticProps({ params }){
    const data = await getPostDetails(params.slug)
  
    return {
      props: { post: data }
    }
}
export async function getStaticPaths(){
    // we are rendering statically all possible paths for our application so next js can render it before our page load
    const posts = await getPosts();

    return {
        paths: posts.map(({node: {slug}})=>({params: {slug}})),
        fallback: true // next.js statically generate our site so by fallback true we are making it dynamic
    }
}

