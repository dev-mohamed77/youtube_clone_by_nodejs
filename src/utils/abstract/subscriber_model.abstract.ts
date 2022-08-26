import { subscriber } from "../types/subscriber.type";

export abstract class SubscriberModelStor<T> {
  abstract get_subscribers_count(user_id: string): Promise<any>;
  abstract GET_SUBSCRIPTION_WITH_ID(
    user_id: string,
    limit: number,
    page: number
  ): Promise<any[]>;
  abstract add_subscribe(subscriber: T): Promise<any>;
  abstract unsubscribe(subscriber: T): Promise<any>;
  abstract get_subscription_status(subscriber: T): Promise<any[]>;
}
