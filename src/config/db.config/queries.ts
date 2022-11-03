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
  UPDATE_USER_WITH_IMAGE:
    "UPDATE users SET users_fullname=$1 , users_image_url=$2 ,users_gender=$3 ,users_update_at=$4 WHERE users_id=$5 returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  UPDATE_USER:
    "UPDATE users SET users_fullname=$1 , users_gender=$2 ,users_update_at=$3 WHERE users_id=$4 returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  DELETE_USER_BY_ID: "DELETE FROM users WHERE users_id = $1",

  // videos

  ADD_VIDEOS:
    "INSERT INTO videos (videos_user_id, videos_title, videos_description, videos_url, videos_image_url, duration, videos_created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",

  GET_VIDEOS:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id LIMIT $1 OFFSET ($2 - 1) * $1;",

  GET_VIDEOS_RANDOM:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id ORDER BY RANDOM() LIMIT $1 OFFSET ($2 - 1) * $1;",

  GET_VIDEO_BY_ID:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id WHERE videos_id = $1",

  GET_VIDEO_BY_USER_ID:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id WHERE v.videos_user_id = $1 LIMIT $2 OFFSET ($3 - 1) * $2;",

  UPDATE_VIDEO:
    "UPDATE videos SET videos_title=$1, videos_description=$2, videos_update_at=$3 WHERE videos_id=$4",

  UPDATE_VIDEO_BY_VIEWS:
    "UPDATE videos SET videos_views=videos_views+1 WHERE videos_id=$1",

  DELETE_VIDEO: "DELETE FROM videos WHERE videos_id = $1",

  TREND_VIDEOS:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id ORDER BY videos_views desc LIMIT $1 OFFSET ($2 - 1) * $1",

  SUB_VIDEOS:
    "SELECT v.videos_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video , v.videos_title, v.videos_description, v.videos_views, v.videos_url, v.duration, v.videos_image_url, v.videos_created_at, v.videos_update_at FROM videos v JOIN users u ON v.videos_user_id = u.users_id WHERE videos_user_id = $1",

  // likes and desLikes

  ADD_LIKE: "INSERT INTO likes(user_id, video_id) VALUES ($1, $2) returning *",
  ADD_DESLIKE:
    "INSERT INTO deslikes(user_id, video_id) VALUES ($1, $2) returning *",
  DELETE_LIKE: "DELETE FROM likes WHERE user_id =$1 AND video_id=$2",
  DELETE_DESLIKE: "DELETE FROM deslikes WHERE user_id =$1 AND video_id=$2",
  GET_LIKES_IN_VIDEOS: "SELECT COUNT(*) FROM likes WHERE video_id=$1",
  GET_DESLIKE_IN_VIDEO: "SELECT COUNT(*) FROM deslikes WHERE video_id=$1",
  GET_LIKE_BY_USER_ID_AND_VIDEO_ID:
    "SELECT * FROM likes WHERE user_id=$1 AND video_id=$2",
  GET_DESLIKE_BY_USER_ID_AND_VIDEO_ID:
    "SELECT * FROM deslikes WHERE user_id=$1 AND video_id=$2",

  // "SELECT v.videos_id,
  // json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS user_video ,
  // v.videos_title,
  // v.videos_description,
  // v.videos_views,
  // v.videos_url,
  // v.duration,
  // v.videos_image_url,
  // v.videos_created_at,
  // v.videos_update_at
  // FROM videos v JOIN users u ON v.videos_user_id = u.users_id ORDER BY RANDOM() LIMIT $1 OFFSET ($2 - 1) * $1;",

  // comments
  ADD_COMMENT:
    "INSERT INTO comments (comments_user_id, comments_videos_id, comments_title, comments_created_at) VALUES ($1, $2, $3, $4) returning *",
  GET_COMMENT_BY_ID:
    "SELECT c.comments_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS comments_user, c.comments_videos_id, c.comments_title, c.comments_created_at, c.comments_updated_at FROM comments c JOIN users u ON c.comments_user_id = u.users_id WHERE comments_id=$1",
  GET_COMMENTS_IN_VIDEO:
    "SELECT c.comments_id, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS comments_user, c.comments_videos_id, c.comments_title, c.comments_created_at, c.comments_updated_at FROM comments c JOIN users u ON c.comments_user_id = u.users_id WHERE comments_videos_id=$1 LIMIT $2 OFFSET ($3 - 1) * $2",
  UPDATE_COMMENT_BY_ID:
    "UPDATE comments SET comments_title=$1, comments_updated_at=$2 WHERE comments_id=$3",
  DELETE_COMMENT_BY_ID: "DELETE FROM comments WHERE comments_id=$1",

  // subscriber
  ADD_SUBSCRIBE:
    "INSERT INTO subscriber (subscriber_user_to, subscriber_user_from, subscriber_created_at) VALUES ($1, $2, $3)",
  DELETE_SUBSCRIBE:
    "DELETE FROM subscriber WHERE subscriber_user_to=$1 AND subscriber_user_from=$2",
  GET_SUBSCRIPTION:
    "SELECT * FROM subscriber WHERE subscriber_user_from=$1 AND subscriber_user_to=$2",
  GET_SUBSCRIPTION_COUNT:
    "SELECT count(*) FROM subscriber WHERE subscriber_user_to=$1",
  GET_SUBSCRIPTION_WITH_ID_LIMIT:
    "SELECT s.subscriber_id, s.subscriber_user_to, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS subscriber_user_from, s.subscriber_created_at FROM subscriber s JOIN users u ON s.subscriber_user_from = u.users_id WHERE subscriber_user_from=$1 LIMIT $2 OFFSET ($3 - 1) * $2",
  GET_SUBSCRIPTION_WITH_ID_ALL:
    "SELECT s.subscriber_id, s.subscriber_user_to, json_build_object('user_id',u.users_id,'user_fullname',u.users_fullname,'users_username',u.users_username,'users_email',u.users_email,'users_image_url',u.users_image_url) AS subscriber_user_from, s.subscriber_created_at FROM subscriber s JOIN users u ON s.subscriber_user_from = u.users_id WHERE subscriber_user_from=$1",
};
