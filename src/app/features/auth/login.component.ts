import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly busy = signal(false);
  readonly error = signal("");

  async login(provider: "google" | "facebook"): Promise<void> {
    this.busy.set(true);
    this.error.set("");
    try {
      await this.auth.signIn(provider);
      await this.router.navigateByUrl("/");
    } catch (error) {
      this.error.set(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      this.busy.set(false);
    }
  }
}
