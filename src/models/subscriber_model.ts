import { SubscriberModelStor } from "../utils/abstract/subscriber_model.abstract";
import { subscriber } from "../utils/types/subscriber.type";
import db_connection from "../config/db.config/connection";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
export class SubscriberModel implements SubscriberModelStor<subscriber> {
  async add_subscribe(subscriber: subscriber): Promise<any> {
    try {
      const query = db_queries.ADD_SUBSCRIBE;
      const values = [
        subscriber.user_to,
        subscriber.user_from,
        subscriber.created_at,
      ];

      const result = await db_connection(query, values);
      return result.rows[0];
    } catch (err) {
      const message = "Error Add Subscribe";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async unsubscribe(subscriber: subscriber): Promise<any> {
    try {
      const query = db_queries.DELETE_SUBSCRIBE;
      const values = [subscriber.user_to, subscriber.user_from];

      const result = await db_connection(query, values);
      return result.rows[0];
    } catch (err) {
      const message = "Error UnSubscribe";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async get_subscribers_count(user_id: string): Promise<any> {
    try {
      const query = db_queries.GET_SUBSCRIPTION_COUNT;
      const values = [user_id];

      const result = await db_connection(query, values);
      return result.rows[0];
    } catch (err) {
      const message = "Error Get Subscriber Count";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async get_subscription_status(subscriber: subscriber): Promise<any[]> {
    try {
      const query = db_queries.GET_SUBSCRIPTION;
      const values = [subscriber.user_from, subscriber.user_to];

      const result = await db_connection(query, values);
      return result.rows;
    } catch (err) {
      const message = "Error Get Subscription status";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async GET_SUBSCRIPTION_WITH_ID(
    user_id: string,
    limit?: number,
    page?: number
  ): Promise<any[]> {
    try {
      const queries =
        limit != null && page != null
          ? db_queries.GET_SUBSCRIPTION_WITH_ID_LIMIT
          : db_queries.GET_SUBSCRIPTION_WITH_ID_ALL;
      const value =
        limit != null || page != null ? [user_id, limit, page] : [user_id];

      const result = await db_connection(queries, value);
      return result.rows;
    } catch (err) {
      const message = "Error Get Subscription with id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
}
