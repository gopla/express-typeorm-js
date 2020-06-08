require('dotenv').config()
const {
  connectTestDB,
  closeDB,
  mockingDBRecord,
} = require('../../utils/database')
const { expect } = require('chai')
const app = require('../../app')
const supertest = require('supertest')

const request = supertest(app)

const auth = async () => {
  const authRes = await request.post('/user/login').send({
    username: 'gopla',
    password: '123',
  })
  return authRes.body.token
}

describe('Post test', () => {
  beforeAll(async () => {
    await connectTestDB()
    await mockingDBRecord()
  })

  afterAll(async () => await closeDB())

  it('Can throw error when not authenticated', async () => {
    const allPost = await request.get('/post').send()

    expect(allPost.body).to.deep.equal({
      statusCode: 403,
      isSuccess: false,
      message: 'Forbidden Access',
    })
  })

  it('Can create new post', async () => {
    const token = await auth()
    const newPost = await request
      .post('/post')
      .set('authorization', `bearer ${token}`)
      .send({
        post: 'Test Post',
      })

    expect(newPost.body).to.deep.include({
      userId: 1,
      post: 'Test Post',
      id: 1,
    })
  })

  it('Can get all post', async () => {
    const token = await auth()
    const allPost = await request
      .get('/post')
      .set('authorization', `bearer ${token}`)
      .send()

    expect(allPost.body).to.have.length(1)
  })

  it('Can get post by one user', async () => {
    const token = await auth()
    const allPost = await request
      .get('/post/gopla')
      .set('authorization', `bearer ${token}`)
      .send()

    expect(allPost.body).to.have.length(1)
  })

  it('Can update a post', async () => {
    const token = await auth()
    const updPost = await request
      .put('/post/1')
      .set('authorization', `bearer ${token}`)
      .send({
        post: 'Updated',
      })

    expect(updPost.body).to.deep.equal({
      isSuccess: true,
      message: 'Post updated',
    })
  })

  it('Can delete a post', async () => {
    const token = await auth()
    const delPost = await request
      .delete('/post/1')
      .set('authorization', `bearer ${token}`)
      .send()

    expect(delPost.body).to.deep.equal({
      isSuccess: true,
      message: 'Post deleted',
    })
  })
})
