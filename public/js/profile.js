$(document).ready(()=>{
  if(selectedTab==="replies")
  {
     replyPosts();
  }
  else {

  loadPosts();
}
})

function loadPosts(){
  $.get("/api/posts",{postedBy:profileUserId,isReply:false},results=>{
     outputPosts(results,$(".postsContainer"));
  })
}

function replyPosts(){
  $.get("/api/posts",{postedBy:profileUserId,isReply:true},results=>{
     outputPosts(results,$(".postsContainer"));
  })
}
