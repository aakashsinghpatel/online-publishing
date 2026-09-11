import { computed, Injectable, signal } from "@angular/core";
import { User } from "../models/models";

@Injectable({ providedIn: "root" })
export class AppStateService {
  readonly user = signal<User | null>(this.loadUser());
  readonly isLoggedIn = computed(() => this.user() !== null);

  login(user: User): void {
    this.user.set(user);
    localStorage.setItem("inkly_user", JSON.stringify(user));
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem("inkly_user");
  }

  private loadUser(): User | null {
    try {
      return JSON.parse(
        localStorage.getItem("inkly_user") ?? "null",
      ) as User | null;
    } catch {
      return null;
    }
  }
}
