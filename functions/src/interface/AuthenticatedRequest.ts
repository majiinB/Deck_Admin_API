/**
 * Custom Request Interface for Authenticated Requests
 *
 * @file AuthenticatedRequest.ts
 * This module defines a custom interface `AuthenticatedRequest` that extends the standard Express `Request` interface.
 * It adds an optional `user` property of type `DecodedIdToken` to the request object, which is used to store
 * decoded Firebase authentication token information after successful authentication.
 *
 * This interface is intended to be used in routes that require authentication to ensure that the decoded
 * user information is available in the request object for further processing.
 *
 * @module interface
 * @file AuthenticatedRequest.ts
 * @interface AuthenticatedRequest
 * @extends {Request}
 * @property {DecodedIdToken | undefined} user - Optional property to store decoded Firebase authentication token.
 * @author Arthur M. Artugue
 * @created 2025-04-02
 * @updated 2025-04-04
 */

import {Request} from "express";
import {DecodedIdToken} from "firebase-admin/auth";

/**
 * Interface representing an authenticated request, extending the standard Express Request.
 * It includes an optional 'user' property to hold decoded Firebase ID token information.
 */
export interface AuthenticatedRequest extends Request {
  /**
   * Optional property to store decoded Firebase ID token information.
   */
  user?: DecodedIdToken;
}
