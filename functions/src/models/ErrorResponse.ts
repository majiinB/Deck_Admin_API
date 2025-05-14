/**
 * Error Response Model for API Error Responses
 *
 * @file ErrorResponse.ts
 * This module defines a class `ErrorResponse` that represents a standard structure for API error responses.
 * It includes properties for the error code and message.
 * This class is designed to provide a consistent format for error responses across the application.
 *
 * @module models
 * @file ErrorResponse.ts
 * @class ErrorResponse
 * @classdesc Represents a base error response structure for API responses.
 * @author Arthur M. Artugue
 * @created 2025-03-30
 * @updated 2025-04-04
 */

/**
 * Represents a base response structure for API responses.
 *
 * @template T - The type of the data payload included in the response.
 */
export class ErrorResponse {
  /**
   * Indicates whether the operation was successful.
   */
  error?: string;

  /**
   * A message providing additional information about the response.
   */
  message?: string;

  /**
   * Gets the error message.
   * @return {string | undefined} The error message or undefined if not set.
   */
  public getError(): string | undefined {
    return this.error;
  }

  /**
   * Sets the error message.
   * @param {string} error - The error message to set.
   */
  public setError(error: string): void {
    this.error = error;
  }

  /**
   * Gets the message.
   * @return {string | undefined} The message or undefined if not set.
   */
  public getMessage(): string | undefined {
    return this.message;
  }

  /**
   * Sets the message.
   * @param {string} message - The message to set.
   */
  public setMessage(message: string): void {
    this.message = message;
  }
}
