module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    let posts = await db.get_user_posts([user_id])
    if (posts[0]) res.status(200).send(posts)
    else res.sendStatus(500)
  },
  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    let posts = await db.get_all_user_posts()
    res.status(200).send(posts)
  },
  getPost: async (req, res) => {
    const db = req.app.get('db')
    const { user_id, post_id } = req.params
    let post = await db.get_user_post([user_id, post_id])
    post = post[0]
    if (post) res.status(200).send(post)
    else res.sendStatus(500)
  },
  addPost: (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const { title, img, content } = req.body
    db.add_post([title, img, content, user_id])
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500))
  },
  editPost: (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    const { title, img, content } = req.body
    db.edit_post([title, img, content, post_id])
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  },
  deletePost: (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    db.delete_post([post_id])
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  }
}
