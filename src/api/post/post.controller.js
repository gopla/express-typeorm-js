const postService = require('./post.service')

module.exports = {
  index: async (req, res, next) => {
    try {
      const post = await postService.getAllPost()
      res.json(post)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res, next) => {
    try {
      const post = await postService.getPostByUsername(req.params.username)
      res.json(post)
    } catch (error) {
      console.log(error)

      res.status(error.statusCode || 500).json(error)
    }
  },

  store: async (req, res, next) => {
    try {
      const _post = {
        userId: req.user.id,
        post: req.body,
      }
      const postRes = await postService.createPost(_post)
      res.json(postRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  update: async (req, res, next) => {
    try {
      await postService.updatePost(req.params.id, req.body)
      res.json({
        isSuccess: true,
        message: 'Post updated',
      })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      await postService.deletePost(req.params.id)
      res.json({ isSuccess: true, message: 'Post deleted' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
