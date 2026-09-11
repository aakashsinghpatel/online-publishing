import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { DataService } from "../../core/services/data.service";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { ArticleCardComponent } from "../../shared/components/article-card/article-card.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ArticleCardComponent, EmptyStateComponent],
  templateUrl: "./tag-results.component.html",
  styleUrls: ["./tag-results.component.scss"],
})
export class TagResultsComponent {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  readonly tag = toSignal(
    this.route.paramMap.pipe(map((params) => params.get("tag") ?? "")),
    { initialValue: "" },
  );
  readonly articles = computed(() =>
    this.data
      .articles()
      .filter(
        (article) =>
          article.status === "published" &&
          article.tags.some(
            (tag) => tag.toLowerCase() === this.tag().toLowerCase(),
          ),
      ),
  );
}
