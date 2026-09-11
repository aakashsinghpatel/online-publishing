import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { DataService } from "../../core/services/data.service";
import { ArticleCardComponent } from "../../shared/components/article-card/article-card.component";
import { CommentSectionComponent } from "../comments/comment-section.component";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    ArticleCardComponent,
    CommentSectionComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.scss"],
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  // private readonly articleId = toSignal(
  //   this.route.paramMap.pipe(map((params) => params.get("id"))),
  //   { initialValue: null },
  // );

 protected readonly articleId = input<string|null>(null, {alias: 'id'});

  readonly article = computed(() =>
    this.data
      .articles()
      .find(
        (item) => item.id === this.articleId() && item.status === "published",
      ),
  );
  readonly author = computed(() =>
    this.data.authors().find((item) => item.id === this.article()?.authorId),
  );
  readonly authorArticles = computed(() =>
    this.data
      .articles()
      .filter(
        (item) =>
          item.status === "published" &&
          item.authorId === this.article()?.authorId &&
          item.id !== this.articleId(),
      )
      .slice(0, 3),
  );
  readonly related = computed(() =>
    this.data
      .articles()
      .filter(
        (item) =>
          item.status === "published" &&
          item.id !== this.articleId() &&
          item.tags.some((tag) => this.article()?.tags.includes(tag)),
      )
      .slice(0, 3),
  );
}
