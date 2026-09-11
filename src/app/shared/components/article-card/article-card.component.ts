import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TagListComponent } from "../tag-list/tag-list.component";
import { Article } from "../../../core/models/models";


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-article-card",
  standalone: true,
  imports: [RouterLink, DatePipe, TagListComponent],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  readonly article = input.required<Article>();
}
