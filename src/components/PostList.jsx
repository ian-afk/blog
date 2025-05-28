import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/posts'

export function PostList({ posts = [] }) {
  const queryClient = useQueryClient()
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data) => {
      console.log(data.message, 'hello')
      alert(data.message)
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        refetchType: 'active',
      })
    },
  })
  const handleDelete = (id) => {
    const isDelete = window.confirm('Are you sure you want to delete?')

    if (isDelete) {
      console.log(id)
      deleteMutate(id)
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} deletePost={handleDelete} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
