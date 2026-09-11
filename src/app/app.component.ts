import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppStateService } from "./core/state/app-state.service";
import { AuthService } from "./core/services/auth.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly state = inject(AppStateService);
  private readonly auth = inject(AuthService);

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
