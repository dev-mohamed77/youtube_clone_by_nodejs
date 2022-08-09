import { Videos } from "../types/videos.types";

export abstract class VideosModelStore<T> {
  abstract create_video(params: T): Promise<T>;
  abstract get_videos(): Promise<T[]>;
  abstract get_all_videos_random(): Promise<any[]>;
  abstract get_video_by_id(id: string): Promise<any[]>;
  abstract update_video_by_id(id: string, video: T): Promise<T>;
  abstract delete_video_by_id(id: string): Promise<T>;
  abstract add_view(id: string): Promise<T>;
  abstract trend(): Promise<any[]>;
  abstract sub(): Promise<T>;
}
