const { getRepository } = require('typeorm')
const { set } = require('../../utils/httpException')
const Post = require('./post.entity')

module.exports = {
  getAllPost: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const postDoc = await getRepository(Post).find()

        resolve(postDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  getPostByUsername: async (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        const postDoc = await getRepository(Post).find()
        let find = []
        postDoc.map((data) => {
          if (data.user.username === username) {
            find.push(data)
          }
        })
        resolve(find)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  createPost: async (post) => {
    return new Promise(async (resolve, reject) => {
      try {
        const postDoc = await getRepository(Post).save({
          userId: post.userId,
          post: post.post.post,
        })
        resolve(postDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  updatePost: async (postId, post) => {
    return new Promise(async (resolve, reject) => {
      try {
        const postDoc = await getRepository(Post).update(postId, {
          post: post.post,
        })
        resolve(postDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  deletePost: async (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const postDoc = await getRepository(Post).delete(postId)
        resolve(postDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },
}
