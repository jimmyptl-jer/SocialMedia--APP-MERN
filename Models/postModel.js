import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    description: {
      type: String
    },
    picturePath: {
      type: String
    },
    userPicturePath: {
      type: String
    },
    likes: {
      type: Map,
      of: Boolean
    },
    comments: {
      type: Array,
      default: []
    }
  }, {
  timeStamps: true
}
)

const Post = mongoose.model('Post', postSchema)
export default Post;