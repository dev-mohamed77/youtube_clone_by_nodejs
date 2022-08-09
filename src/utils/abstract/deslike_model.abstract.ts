export abstract class DesLikeModelStor<T> {
  abstract add_desLike(user_id: string, video_id: string): Promise<T>;
  abstract delete_desLike(user_id: string, video_id: string): Promise<T>;
  abstract get_desLikes_in_video(video_id: string): Promise<any[]>;
}
