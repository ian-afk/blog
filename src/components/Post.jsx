import PropTypes from 'prop-types'

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string,
  deletePost: PropTypes.func,
}
export function Post({ title, contents, author, id: _id, deletePost }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      <br />
      <div>
        <button onClick={() => deletePost(_id)}>Delete</button>
      </div>
    </article>
  )
}
