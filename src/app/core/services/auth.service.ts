import { Injectable, inject } from "@angular/core";
import { AppStateService } from "../state/app-state.service";
import {
  firebaseConfig,
  isFirebaseConfigured,
} from "../config/firebase.config";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type Auth,
  type User as FirebaseUser,
} from "firebase/auth";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly state = inject(AppStateService);
  private readonly auth: Auth | null = this.initializeAuth();

  constructor() {
    if (this.auth) {
      onAuthStateChanged(this.auth, (user) => this.syncUser(user));
    }
  }

  async signIn(provider: "google" | "facebook"): Promise<void> {
    if (!this.auth) {
      throw new Error(
        "Firebase social authentication is not configured. Add the Firebase Web App configuration first.",
      );
    }

    const authProvider =
      provider === "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();

    const result = await signInWithPopup(this.auth, authProvider);
    this.syncUser(result.user);
  }

  async signOut(): Promise<void> {
    if (this.auth) {
      await firebaseSignOut(this.auth);
    }
    this.state.logout();
  }

  get isConfigured(): boolean {
    return isFirebaseConfigured;
  }

  private initializeAuth(): Auth | null {
    if (!isFirebaseConfigured) {
      return null;
    }
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return getAuth(app);
  }

  private syncUser(user: FirebaseUser | null): void {
    if (!user) {
      this.state.logout();
      return;
    }

    const provider =
      user.providerData[0]?.providerId === "facebook.com"
        ? "facebook"
        : "google";
    this.state.login({
      id: user.uid,
      name: user.displayName ?? "Reader",
      email: user.email ?? "",
      avatar: user.photoURL ?? "https://i.pravatar.cc/80",
      provider,
    });
  }
}
