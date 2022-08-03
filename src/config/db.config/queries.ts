export default {
  ADD_USER:
    "INSERT INTO users (users_fullname , users_username , users_email , users_password  ,  users_created_at) VALUES ($1 ,$2 ,$3 , $4 , $5) returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
  ADD_USER_BY_GOOGLE:
    "INSERT INTO users (users_fullname , users_username , users_email , users_is_google  ,  users_created_at) VALUES ($1 ,$2 ,$3 , $4 , $5) returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at",
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
};

// returning users_id , users_fullname , users_username , users_email , users_image_url , users_gender , users_is_google , users_created_at , users_update_at
