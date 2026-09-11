import { DatePipe, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { DataService } from "../../core/services/data.service";
import { AppStateService } from "../../core/state/app-state.service";
import { Comment } from "../../core/models/models";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-comment-section",
  standalone: true,
  imports: [DatePipe, NgTemplateOutlet],
  templateUrl: "./comment-section.component.html",
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent {
  readonly articleId = input.required<string>();
  readonly state = inject(AppStateService);
  private readonly data = inject(DataService);
  readonly commentSort = signal<"new" | "old" | "liked">("new");
  readonly newComment = signal("");
  readonly replyTo = signal<string | null>(null);
  readonly replyText = signal("");

  readonly articleComments = computed(() =>
    this.data
      .comments()
      .filter((comment) => comment.articleId === this.articleId()),
  );
  readonly sortedComments = computed(() => {
    const comments = [...this.articleComments()];
    switch (this.commentSort()) {
      case "old":
        return comments.sort((a, b) => a.date.localeCompare(b.date));
      case "liked":
        return comments.sort((a, b) => b.likes - a.likes);
      default:
        return comments.sort((a, b) => b.date.localeCompare(a.date));
    }
  });
  readonly rootComments = computed(() =>
    this.sortedComments().filter((comment) => !comment.parentId),
  );

  repliesFor(parentId: string): Comment[] {
    return this.sortedComments().filter(
      (comment) => comment.parentId === parentId,
    );
  }

  add(parentId?: string): void {
    const text = (parentId ? this.replyText() : this.newComment()).trim();
    const user = this.state.user();
    if (!text || !user) return;

    this.data.addComment({
      id: crypto.randomUUID(),
      articleId: this.articleId(),
      author: user.name,
      text,
      date: new Date().toISOString(),
      likes: 0,
      parentId,
    });

    this.newComment.set("");
    this.replyText.set("");
    this.replyTo.set(null);
  }

  like(id: string): void {
    this.data.likeComment(id);
  }
}
