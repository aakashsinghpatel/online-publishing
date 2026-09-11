import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { DataService } from "../../core/services/data.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: "./authors.component.html",
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  private readonly data = inject(DataService);
  readonly q = signal("");
  readonly authors = this.data.authors;
  readonly filtered = computed(() =>
    this.authors().filter((author) =>
      author.name.toLowerCase().includes(this.q().trim().toLowerCase()),
    ),
  );
  articleCount(id: string): number {
    return this.data
      .articles()
      .filter(
        (article) => article.authorId === id && article.status === "published",
      ).length;
  }
}
