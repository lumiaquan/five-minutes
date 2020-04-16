// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID;

  const start = event.start;
  let promise = db.collection("ordinaryFirstPost");
  if (start > 0) {
    promise = promise.skip(start);
  }
  const postRes = await promise.limit(3).orderBy("time", "desc").get()
  const posts = postRes.data;
  if(posts.length > 0){
    posts.forEach((post,index) => {
      post.isPraised = false;
      if(post.praises && post.praises.length>0){
        post.praises.forEach((praise,index) => {
          if(praise == openId){
            post.isPraised = true;
          }
        })
      }
    })
  }
  return{
    posts
  }
}