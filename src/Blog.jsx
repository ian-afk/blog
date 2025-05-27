import { useQuery } from '@tanstack/react-query'
import { Post } from './components/Post'
import { CreatePost } from './components/CreatePost'
import { PostList } from './components/PostList'
import { PostFilter } from './components/PostFilter'
import { PostSorting } from './components/PostSorting'

import { getPosts } from './api/posts'
import { useState } from 'react'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []
  return (
    <>
      <CreatePost />
      <br />
      <hr />
      <h2>Filter by:</h2>
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
      {/* <Post
        title='Full-Stack React Projects'
        contents="Let's become full-stack developers!"
        author='Daniel Bugl'
      /> */}
    </>
  )
}
