var ig = require('instagram-scraping');
var express=require("express");
var app=express();
app.listen(process.env.PORT || 40,()=>{
  console.log("Uygulama Aktif")
})

app.get("/json",(req,res)=>{
    const user=req.query.username;


ig.scrapeUserPage(user).then((result) => {

  const username=result.user.username;
  const user_id=result.user.id;
  const pp_url=result.user.profile_pic_url;
  const is_private=result.user.is_private;
  const is_verified=result.user.is_verified;
  const follower_count=result.user.edge_followed_by.count;
  const full_name=result.user.full_name;
  const following_count=result.user.edge_follow.count;
  const bio=result.user.biography;
  let last_post,last_post_desc;
  if(result.user.edge_owner_to_timeline_media.count>0){
   last_post=result.user.edge_owner_to_timeline_media.edges[0].node.display_url;
   last_post_desc=result.user.edge_owner_to_timeline_media.edges[0].node.accessibility_caption;
  }else{
     last_post="null";
     last_post_desc="null";
  }



  const erh4n={

    username:username,
    full_name:full_name,
    bio:bio,
    user_id:user_id,
    is_verified:is_verified,
    pp_url:pp_url,
    is_private:is_private,
    follower_count:follower_count,
    following_count:following_count,
    last_post:last_post,
    last_post_desc:last_post_desc


              }
res.json(erh4n);

});

  })