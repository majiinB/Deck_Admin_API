/**
 * Base Response Model for API Responses
 *
 * @file BaseResponse.ts
 * This module defines a generic class `BaseResponse` that represents a standard structure for API responses.
 * It includes properties for the response status, message, and an optional data payload.
 * This class is designed to provide a consistent format for API responses across the application.
 *
 * @module models
 * @file BaseResponse.ts
 * @class BaseResponse<T>
 * @classdesc Represents a base response structure for API responses.
 * @template T - The type of the data payload included in the response.
 * @author Arthur M. Artugue
 * @created 2025-03-30
 * @updated 2025-04-04
 */

/**
 * Represents a base response structure for API responses.
 *
 * @template T - The type of the data payload included in the response.
 */
export class BaseResponse<T> {
  /**
   * Indicates whether the operation was successful.
   */
  status!: number;

  /**
   * A message providing additional information about the response.
   */
  message!: string;

  /**
   * Optional data payload of type `T` included in the response.
   */
  data?: T;

  /**
  * Getter and Setter for `status`.
  * @return {string} The current status of the response.
  */
  public getStatus(): number {
    return this.status;
  }

  /**
   * Sets the status of the response.
   *
   * @param {string} status - The new status to set.
   */
  public setStatus(status: number): void {
    this.status = status;
  }

  /**
   * Getter and Setter for `message`.
   * @return {string} The current message of the response.
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Sets the message of the response.
   *
   * @param {string} message - The new message to set.
   */
  public setMessage(message: string): void {
    this.message = message;
  }

  /**
   * Getter and Setter for `data`.
   * @return {T | undefined} The current data payload of the response.
   */
  public getData(): T | undefined {
    return this.data;
  }

  /**
   * Sets the data payload of the response.
   *
   * @param {T} data - The new data payload to set.
   */
  public setData(data: T): void {
    this.data = data;
  }
}
