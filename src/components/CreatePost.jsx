import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'

export function CreatePost() {
  const [input, setInput] = useState({
    title: '',
    author: '',
    contents: '',
  })

  const queryClient = useQueryClient()
  const createtPostMutation = useMutation({
    mutationFn: () =>
      createPost({
        title: input.title,
        author: input.author,
        contents: input.contents,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setInput({
        title: '',
        author: '',
        contents: '',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createtPostMutation.mutate()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={input.title}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          value={input.author}
          onChange={handleChange}
        />
      </div>
      <br />
      <textarea
        id=''
        cols='30'
        rows='10'
        name='contents'
        value={input.contents}
        onChange={handleChange}
      />
      <br />
      <input
        type='submit'
        value={createtPostMutation.isPending ? 'Posting...' : 'Post'}
        disabled={!input.title || createtPostMutation.isPending}
      />
      {createtPostMutation.isSuccess && (
        <>
          <br />
          Post created successfully
        </>
      )}
    </form>
  )
}
