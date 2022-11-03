export abstract class LikeModelStor<T> {
  abstract add_like(user_id: string, video_id: string): Promise<T>;
  abstract delete_like(user_id: string, video_id: string): Promise<T>;
  abstract get_count_likes_in_video(video_id: string): Promise<any>;
  abstract check_if_the_user_liked_the_video(
    user_id: string,
    video_id: string
  ): Promise<any[]>;
}
