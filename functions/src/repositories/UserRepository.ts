/**
 * Flashcard Manager API - Repository
 *
 * @file UserRepository.ts
 * This module defines the repository layer for managing User data within Firestore,
 * Extending FirebaseAdmin, it provides methods for CRUD operations on Users,
 *
 * Methods:
 * - getFlashcards: Queries Firestore for non-deleted flashcards within a specific deck, supporting pagination.
 * - getAllFlashcards: Queries Firestore for all non-deleted flashcards within a specific deck.
 * - getSpecificFlashcard: Retrieves a single flashcard document from a specific deck's subcollection by its ID.
 * - createFlashcard: Adds a new flashcard document to a deck's subcollection and increments the deck's flashcard count.
 * - updateFlashcard: Updates fields of an existing flashcard document and adjusts the deck's flashcard count if deletion status changes.
 * - deleteFlashcards: Deletes one or more flashcard documents from a deck's subcollection using a batch operation and decrements the deck's flashcard count.
 *
 * @module repository
 * @file UserRepository.ts
 * @class UserRepository
 * @classdesc Repository class for managing User data in Firestore.
 * @author Arthur M. Artugue
 * @created 2024-04-18
 * @updated 2025-05-12
 */

import {logger} from "firebase-functions/v1";
import {FirebaseAdmin} from "../config/FirebaseAdmin";

/**
 * UserRepository class for managing user data in Firestore.
 */
export class UserRepository extends FirebaseAdmin {
  /**
   * Retrieves the role of a user based on their ID.
   * @param {string} adminID - A user IDs.
   * @return {Promise<string>} - A promise that resolves to a mapping of user IDs to user names.
   * @throws {Error} - If an unknown error occurs while fetching user names.
   */
  public async getUserRole(adminID: string): Promise<string | undefined> {
    try {
      // Verify if the adminID is a valid string
      if (typeof adminID !== "string" || adminID.trim() === "") {
        const unknownError = new Error("Invalid adminID provided");
        unknownError.name = "INVALID_ADMIN_ID_TYPE";
        throw unknownError;
      }

      const db = this.getDb();
      const userRef = db.collection("users").where("user_id", "==", adminID);
      const userSnap = await userRef.get();

      if (userSnap.empty) {
        const notFoundError = new Error(`No user found with ID ${adminID}`);
        notFoundError.name = "USER_NOT_FOUND";
        throw notFoundError;
      }

      const userDoc = userSnap.docs[0];
      const userData = userDoc.data();
      logger.info(`User data: ${JSON.stringify(userData)}`);

      if (!userData.role || typeof userData.role !== "string") {
        const roleError = new Error(`User ${adminID} has no valid role field`);
        roleError.name = "USER_ROLE_UNDEFINED";
        throw roleError;
      }

      return userData.role;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching user role: ${error.message}`);
        if (error.name === "USER_NOT_FOUND") {
          throw error; // Re-throw the specific error
        } else if (error.name === "INVALID_ADMIN_ID_TYPE") {
          throw error; // Re-throw the specific error
        } else if (error.name === "USER_ROLE_UNDEFINED") {
          throw error; // Re-throw the specific error
        }
        return;
      } else {
        const unknownError = new Error("An unknown error occurred while fetching user role");
        unknownError.name = "GET_USER_ROLE_UNKNOWN_ERROR";
        logger.error(unknownError.message);
        throw unknownError; // Re-throw the unknown error
      }
    }
  }
  /**
 * Retrieves the names of users who own specific decks.
 * @param {string[]} ownerIDs - An array of user IDs.
 * @return {Promise<Record<string, string>>} - A promise that resolves to a mapping of user IDs to user names.
 * @throws {Error} - If an unknown error occurs while fetching user names.
 */
  public async getOwnerNames(ownerIDs: string[]): Promise<Record<string, string>> {
    try {
      // Filter out invalid IDs
      const validOwnerIDs = ownerIDs.filter((id) => typeof id === "string" && id.trim() !== "");

      if (validOwnerIDs.length === 0) return {};

      const db = this.getDb();
      const userRef = db.collection("users").where("user_id", "in", validOwnerIDs);
      const userSnap = await userRef.get();

      const userMap: Record<string, string> = {};

      userSnap.forEach((doc) => {
        const data = doc.data();
        const userId = data.user_id;
        const userName = data.name;
        if (userId && userName) {
          userMap[userId] = userName;
        }
      });

      // Assign 'user not found' to IDs not present in the fetched data
      validOwnerIDs.forEach((id) => {
        if (!userMap[id]) {
          userMap[id] = "Deleted User";
        }
      });

      return userMap;
    } catch (error) {
      const unknownError = new Error("An unknown error occurred while fetching user names");
      unknownError.name = "GET_USER_NAMES_UNKNOWN_ERROR";
      throw unknownError;
    }
  }
}
