export default {
  ADD_USER:
    "INSERT INTO users (users_fullname , users_username , users_email , users_password,  users_created_at) VALUES ($1 ,$2 ,$3 , $4 , $5) returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  ADD_USER_BY_GOOGLE:
    "INSERT INTO users (users_fullname , users_username , users_email , users_is_google,  users_created_at) VALUES ($1 ,$2 ,$3 , $4 , $5) returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  GET_ALL_USER:
    "SELECT users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at FROM users",
  GET_USER_BY_ID:
    "SELECT users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at FROM users WHERE users_id = $1",
  GET_USER_BY_USERNAME_OR_EMAIL:
    "SELECT users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at FROM users WHERE users_username=$1 OR users_email=$2",
  GET_USER_BY_EMAIL:
    "SELECT users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at FROM users WHERE users_email = $1",
  GET_USER_BY_USERNAME:
    "SELECT users_id , users_fullname , users_username , users_email , users_password , users_image_url , users_gender , users_is_google , users_created_at , users_update_at FROM users WHERE users_username = $1",
  UPDATE_USER:
    "UPDATE users SET users_fullname=$1 , users_image_url=$2 ,users_gender=$3 ,users_update_at=$4 WHERE users_id=$5 returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  DELETE_USER_BY_ID: "DELETE FROM users WHERE users_id = $1",

  // videos

  ADD_VIDEOS:
    "INSERT INTO videos (videos_user_id, videos_title, videos_description, videos_url, videos_image_url, videos_created_at) VALUES ($1, $2, $3, $4, $5, $6) returning videos_id, videos_user_id, videos_title, videos_description, videos_views, videos_url, videos_image_url, videos_likes, videos_deslikes, videos_created_at, videos_update_at",
  GET_VIDEOS: "SELECT * FROM videos",
  GET_VIDEOS_RANDOM: "SELECT * FROM videos ORDER BY RANDOM() LIMIT 40",
  GET_VIDEO_BY_ID: "SELECT * FROM videos WHERE videos_id = $1",
  UPDATE_VIDEO:
    "UPDATE videos SET videos_title=$1, videos_description=$2, videos_update_at=$3 WHERE videos_id=$4 returning videos_id, videos_user_id, videos_title, videos_description, videos_views, videos_url, videos_image_url, videos_likes, videos_deslikes, videos_created_at, videos_update_at",
  UPDATE_VIDEO_BY_VIEWS:
    "UPDATE videos SET videos_views=videos_views+1 WHERE videos_id=$1",
  UPDATE_VIDEOS_BY_LIKES:
    "UPDATE videos SET videos_likes=videos_likes+1 WHERE videos_id=$1",
  UPDATE_VIDEOS_BY_DESLIKES:
    "UPDATE videos SET videos_deslikes=videos_deslikes+1 WHERE videos_id=$1",
  DELETE_VIDEO: "DELETE FROM videos WHERE videos_id = $1",
  TREND_VIDEOS: "SELECT * FROM videos ORDER BY videos_views desc limit 40",

  // likes and desLikes

  ADD_LIKE: "INSERT INTO likes(user_id, video_id) VALUES ($1, $2) returning *",
  ADD_DESLIKE:
    "INSERT INTO deslikes(user_id, video_id) VALUES ($1, $2) returning *",
  DELETE_LIKE: "DELETE FROM likes WHERE user_id =$1 AND video_id=$2",
  DELETE_DESLIKE: "DELETE FROM deslikes WHERE user_id =$1 AND video_id=$2",
  GET_LIKES_IN_VIDEOS: "SELECT * FROM likes WHERE video_id=$1",
  GET_DESLIKE_IN_VIDEO: "SELECT * FROM deslikes WHERE video_id=$1",

  // comments
  ADD_COMMENT:
    "INSERT INTO comments (comments_user_id, comments_videos_id, comments_title, comments_created_at) VALUES ($1, $2, $3, $4) returning *",
  GET_COMMENT_BY_ID: "SELECT * FROM comments WHERE comments_id=$1",
  GET_COMMENTS_IN_VIDEO: "SELECT * FROM comments WHERE comments_videos_id=$1",
  UPDATE_COMMENT_BY_ID:
    "UPDATE comments SET comments_title=$1, comments_updated_at=$2 WHERE comments_id=$3 returning *",
  DELETE_COMMENT_BY_ID: "DELETE FROM comments WHERE comments_id=$1",
};
