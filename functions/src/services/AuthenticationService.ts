import {Response, NextFunction} from "express";
import {FirebaseAdmin} from "../config/FirebaseAdmin";
import {AuthenticatedRequest} from "../interface/AuthenticatedRequest";
import {BaseResponse} from "../models/BaseResponse";
import {ErrorResponse} from "../models/ErrorResponse";
import {UserRepository} from "../repositories/UserRepository";
import {DecodedIdToken} from "firebase-admin/auth";

/**
 * Service for handling authentication-related operations.
 */
export class AuthenticationService extends FirebaseAdmin {
  /**
  * Middleware to verify Firebase ID token from the request's Authorization header.
  *
  * @function verifyFirebaseToken
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Express next middleware function.
  * @return {void} Calls `next()` if authentication succeeds, otherwise sends a 401 or 403 error response.
  */
  public async verifyFirebaseToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const baseResponse = new BaseResponse();
    const errorResponse = new ErrorResponse();
    const authHeader = (req.headers as { authorization?: string }).authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      errorResponse.setError("UNAUTHORIZED");
      errorResponse.setMessage("No token provided");

      baseResponse.setStatus(401);
      baseResponse.setMessage("The request is unauthorized");
      baseResponse.setData(errorResponse);

      res.status(401).json(baseResponse);
      return;
    }

    const token = authHeader?.split(" ")[1];

    try {
      const decodedToken : DecodedIdToken = await this.getAuth().verifyIdToken(token);
      req.user = decodedToken; // Attach user data to request
    } catch (error) {
      errorResponse.setError("INVALID_TOKEN");
      errorResponse.setMessage("Invalid token: " + (error instanceof Error ? error.message : "Unknown error"));

      baseResponse.setStatus(403);
      baseResponse.setMessage("The request is unauthorized");
      baseResponse.setData(errorResponse);

      res.status(403).json(baseResponse);
      return;
    }

    try {
      const userRole : string | undefined = await new UserRepository().getUserRole(req.user.user_id);

      if (!userRole) {
        errorResponse.setError("UNAUTHORIZED");
        errorResponse.setMessage("User role not found");

        baseResponse.setStatus(403);
        baseResponse.setMessage("The request is unauthorized");
        baseResponse.setData(errorResponse);

        res.status(403).json(baseResponse);
        return;
      }

      const allowed = ["admin", "moderator"];

      if (!allowed.includes(userRole)) {
        errorResponse.setError("UNAUTHORIZED");
        errorResponse.setMessage("User is not authorized");
        baseResponse.setStatus(403);
        baseResponse.setMessage("The request is unauthorized");
        baseResponse.setData(errorResponse);
        res.status(403).json(baseResponse);
        return;
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      if (error instanceof Error) {
        errorResponse.setError(error.name);
        errorResponse.setMessage(error.message);

        baseResponse.setStatus(403);
        baseResponse.setMessage("The request is unauthorized");
        baseResponse.setData(errorResponse);

        res.status(403).json(baseResponse);
        return;
      } else {
        errorResponse.setError("UNKNOWN_ERROR");
        errorResponse.setMessage("An unknown error occurred");

        baseResponse.setStatus(500);
        baseResponse.setMessage("The request is unauthorized");
        baseResponse.setData(errorResponse);

        res.status(500).json(baseResponse);
        return;
      }
    }
  }
}
