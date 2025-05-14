
/**
 * Deck - Firebase Admin Configuration
 * @file firebaseAdmin.ts
 * @description This module initializes Firebase Admin SDK using a service
 * account and provides methods for accessing Firebase services.
 *
 * Initialization:
 * - Initializes Firebase Admin SDK if not already initialized.
 *
 * Methods:
 * - getDb: Retrieves the Firestore database instance.
 * - getAuth: Retrieves the Firebase Admin auth instance.
 * - getTimeStamp: Retrieves the current timestamp using Firebase Admin's Firestore Timestamp.
 *
 * External Dependencies:
 * - firebase-admin: Firebase Admin SDK for server-side authentication.
 *
 * @author Arthur M. Artugue
 * @created 2025-05-14
 * @updated 2025-05-14
 */

import admin from "firebase-admin";
import {Timestamp} from "firebase-admin/firestore";

/**
 * Class responsible for initializing and managing the Firebase Admin SDK
 * for server-side operations, such as authentication and Firestore database access.
 */
export class FirebaseAdmin {
  /**
  * The parsed service account credentials used to initialize the Firebase Admin SDK.
  * @type {admin.ServiceAccount}
  */
  // private serviceAccount: admin.ServiceAccount;

  /**
  * The Firestore database instance for interacting with Firestore.
  * @type {FirebaseFirestore.Firestore}
  */
  private db: FirebaseFirestore.Firestore;

  /**
   * Initializes the FirebaseAdmin class by reading the service account
   * credentials and setting up the Firebase Admin SDK.
   */
  constructor() {
    // Singleton
    if (admin.apps.length === 0) {
      admin.initializeApp();
    }

    this.db = admin.firestore();
  }

  /**
   * Retrieves the Firestore database instance.
   * @return {FirebaseFirestore.Firestore} The Firestore database instance.
   */
  protected getDb(): FirebaseFirestore.Firestore {
    return this.db;
  }

  /**
   * Retrieves the Firebase Admin auth instance.
   * @return {admin.auth.Auth} The Firebase Admin auth instance.
   */
  protected getAuth(): admin.auth.Auth {
    return admin.auth();
  }

  /**
   * Retrieves the current timestamp using Firebase Admin's Firestore Timestamp.
   *
   * @return {Timestamp} The current Firestore timestamp.
   */
  static getTimeStamp(): Timestamp {
    return admin.firestore.Timestamp.now();
  }
}
