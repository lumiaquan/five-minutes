// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID;
  console.log(openId);
  const postId = event.postId;
  const praise = event.praise;

  if (praise) {
    return await db.collection("ordinaryFirstPost").doc(postId).update({
      data: {
        "praises": _.push(openId)
      }
    })
  } else {
    //从数据库中获取praises数组]]
    const postRes = await db.collection("ordinaryFirstPost").doc(postId).field({
      praises: true
    }).get()
    //将数组中的自己的openId删掉
    const praises = postRes.data.praises;
    const newPraises = [];
    praises.forEach((praise, index) => {
      if (praise != openId) {
        newPraises.push(praise)
      }
    })

    //把新的praises数组重新设置到数据库中
    return await db.collection("ordinaryFirstPost").doc(postId).update({
      data: {
        praises: newPraises
      }
    })
  }

}