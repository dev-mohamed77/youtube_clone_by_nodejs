export abstract class LikeModelStor<T> {
  abstract add_like(user_id: string, video_id: string): Promise<T>;
  abstract delete_like(user_id: string, video_id: string): Promise<T>;
  abstract get_likes_in_video(video_id: string): Promise<any[]>;
}
