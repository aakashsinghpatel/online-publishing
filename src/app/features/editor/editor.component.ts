import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { DataService } from '../../core/services/data.service';
import { AppStateService } from '../../core/state/app-state.service';
import { Article } from '../../core/models/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  readonly state = inject(AppStateService);
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  title = "";
  description = "";
  thumbnail =
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80";
  tagsText = "Writing";
  content = "";
  scheduledFor = "";

  readonly quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  save(requestedStatus: "draft" | "publish" = "publish"): void {
    const user = this.state.user();
    if (
      !user ||
      !this.title.trim() ||
      !this.description.trim() ||
      !this.content.trim()
    )
      return;

    const scheduled = requestedStatus === "publish" && !!this.scheduledFor;
    const status: Article["status"] =
      requestedStatus === "draft"
        ? "draft"
        : scheduled
          ? "scheduled"
          : "published";
    const article: Article = {
      id: crypto.randomUUID(),
      title: this.title.trim(),
      description: this.description.trim(),
      content: this.content,
      thumbnail: this.thumbnail.trim(),
      authorId: user.id,
      authorName: user.name,
      publishedAt: scheduled
        ? new Date(this.scheduledFor).toISOString()
        : new Date().toISOString(),
      featured: false,
      popular: 0,
      tags: this.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      scheduledFor: scheduled
        ? new Date(this.scheduledFor).toISOString()
        : undefined,
    };

    this.data.saveArticle(article);
    this.router.navigate(
      status === "published" ? ["/article", article.id] : ["/"],
    );
  }
}
