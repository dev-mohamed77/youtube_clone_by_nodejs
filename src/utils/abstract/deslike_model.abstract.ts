export abstract class DesLikeModelStor<T> {
  abstract add_desLike(user_id: string, video_id: string): Promise<T>;
  abstract delete_desLike(user_id: string, video_id: string): Promise<T>;
  abstract get_count_desLikes_in_video(video_id: string): Promise<any>;
  abstract check_if_the_user_desLiked_the_video(
    user_id: string,
    video_id: string
  ): Promise<any[]>;
}
