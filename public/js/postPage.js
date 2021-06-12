$(document).ready(()=>{
  $.get("/api/posts/"+postId ,results =>{
  //  console.log(postData)
     outputPostsWithReplies(results,$(".postsContainer"))

  })
})
