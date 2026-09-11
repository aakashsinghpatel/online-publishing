import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { DataService } from "../../core/services/data.service";
import { WorkerService } from "../../core/services/worker.service";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { ArticleCardComponent } from "../../shared/components/article-card/article-card.component";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { debounce, debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, DatePipe, ArticleCardComponent, EmptyStateComponent],
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
 
  private readonly data = inject(DataService);
  private readonly worker = inject(WorkerService);
  private readonly destroyRef = inject(DestroyRef);
  readonly query = signal("");
  private debounceQuery  = toObservable(this.query).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntilDestroyed(this.destroyRef)
  )

   ngOnInit() {
    this.debounceQuery.subscribe(query=>{
      this.onSearch(query);
    })
  }
  readonly sort = signal<"latest" | "popular" | "editor">("latest");
  readonly page = signal(1);
  readonly pageSize = 4;
  private readonly searchIds = signal<string[] | null>(null);
  private searchSequence = 0;

  readonly articles = this.data.articles;
  readonly featured = computed(() =>
    this.articles()
      .filter((article) => article.featured && article.status === "published")
      .slice(0, 2),
  );
  readonly filtered = computed(() => {
    const ids = this.searchIds();
    let result = this.articles().filter(
      (article) =>
        article.status === "published" && (!ids || ids.includes(article.id)),
    );
    if (this.sort() === "popular")
      return [...result].sort((a, b) => b.popular - a.popular);
    if (this.sort() === "editor")
      return result.filter((article) => article.featured);
    return [...result].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
  });
  readonly paged = computed(() =>
    this.filtered().slice(
      (this.page() - 1) * this.pageSize,
      this.page() * this.pageSize,
    ),
  );
  readonly pageNumbers = computed(() =>
    Array.from(
      {
        length: Math.max(1, Math.ceil(this.filtered().length / this.pageSize)),
      },
      (_, index) => index + 1,
    ),
  );
  readonly popularTags = computed(() => {
    const counts = new Map<string, number>();
    for (const article of this.articles().filter(
      (item) => item.status === "published",
    )) {
      for (const tag of article.tags)
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  });


  async onSearch(value: string): Promise<void> {
    this.query.set(value);
    this.page.set(1);
    const sequence = ++this.searchSequence;
    const documents = this.articles()
      .filter((article) => article.status === "published")
      .map((article) => ({
        id: article.id,
        text: `${article.title} ${article.description} ${article.authorName} ${article.tags.join(" ")}`.toLowerCase(),
      }));
    const ids = await this.worker.search(documents, value);
    if (sequence === this.searchSequence) this.searchIds.set(ids);
  }
}
