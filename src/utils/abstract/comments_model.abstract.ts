export abstract class CommentsModelStor<T> {
  abstract add_comment(comment: T): Promise<T>;
  abstract get_comments_in_video(video_id: string): Promise<any[]>;
  abstract get_comment_by_id(id: string): Promise<any[]>;
  abstract update_comment_by_id(id: string, comment: T): Promise<T>;
  abstract delete_comment_by_id(id: string): Promise<T>;
}
