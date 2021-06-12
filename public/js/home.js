$(document).ready(()=>{
  $.get("/api/posts",{followingOnly:true},results =>{
  //  console.log(postData)
     outputPosts(results,$(".postsContainer"))

  })
})

function outputPosts(results,container)
{
   container.html("");
   results.forEach(result => {
     var html=createPostHtml(result)
     container.append(html)
   });

   if(results.length == 0){
     container.append("<span class='noResults'>Nothing</span>")
   }

}
