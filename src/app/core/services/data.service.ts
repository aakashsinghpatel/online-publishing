import { Injectable, signal } from "@angular/core";
import { Article, Author, Comment } from "../models/models";

const authors: Author[] = [
  {
    id: "a1",
    name: "Maya Chen",
    bio: "Product designer and curious observer writing about technology, work and culture.",
    avatar: "https://i.pravatar.cc/160?img=47",
  },
  {
    id: "a2",
    name: "Daniel Brooks",
    bio: "Engineer, weekend photographer and long-form storyteller.",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    id: "a3",
    name: "Priya Shah",
    bio: "Writes practical guides on creativity, leadership and modern careers.",
    avatar: "https://i.pravatar.cc/160?img=32",
  },
];

const seed: Article[] = [
  {
    id: "1",
    title: "Designing Calm Interfaces",
    description:
      "A practical look at reducing visual noise without making an interface feel empty.",
    content:
      "<p>Good interfaces do not compete for attention. They establish hierarchy, make the next action obvious, and leave room for the reader to breathe.</p><p>Start with a small set of visual priorities. Give the primary action a clear position, keep supporting actions quiet, and use spacing as a design tool rather than decoration.</p><p>The result is an interface that feels considered rather than crowded.</p>",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
    authorId: "a1",
    authorName: "Maya Chen",
    publishedAt: "2026-08-20",
    featured: true,
    popular: 92,
    tags: ["Design", "UX", "Product"],
    status: "published",
  },
  {
    id: "2",
    title: "The Small Systems That Make Teams Faster",
    description:
      "Why simple, repeatable engineering habits often outperform complicated processes.",
    content:
      "<p>Fast teams are rarely fast because everyone works harder. They are fast because the system around the team removes friction.</p><p>Clear ownership, small pull requests, predictable reviews and lightweight documentation compound over time.</p><p>The goal is not process for its own sake. The goal is fewer decisions that have to be rediscovered every week.</p>",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    authorId: "a2",
    authorName: "Daniel Brooks",
    publishedAt: "2026-08-17",
    featured: true,
    popular: 81,
    tags: ["Engineering", "Teams", "Productivity"],
    status: "published",
  },
  {
    id: "3",
    title: "A Better Way to Learn Difficult Things",
    description:
      "Turn vague learning goals into small loops you can actually finish.",
    content:
      "<p>Learning becomes easier when the feedback loop is short. Pick one narrow outcome, practice it, explain it, and test yourself before moving on.</p><p>Keep notes that answer questions rather than notes that merely collect information. Over time, these small loops become a durable system.</p>",
    thumbnail:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    authorId: "a3",
    authorName: "Priya Shah",
    publishedAt: "2026-08-11",
    featured: false,
    popular: 76,
    tags: ["Learning", "Career"],
    status: "published",
  },
  {
    id: "4",
    title: "Why Constraints Improve Creativity",
    description:
      "Constraints can narrow the search space and make creative work more deliberate.",
    content:
      "<p>A blank page offers unlimited possibilities, which can make starting surprisingly difficult. A useful constraint gives the mind a boundary to push against.</p><p>Try setting a time limit, a word limit or a fixed audience. Constraints do not remove creativity; they focus it.</p>",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    authorId: "a1",
    authorName: "Maya Chen",
    publishedAt: "2026-08-05",
    featured: false,
    popular: 64,
    tags: ["Creativity", "Writing"],
    status: "published",
  },
];

@Injectable({ providedIn: "root" })
export class DataService {
  private readonly articlesState = signal<Article[]>(this.loadArticles());
  private readonly commentsState = signal<Comment[]>(
    this.load("inkly_comments", []),
  );

  readonly articles = this.articlesState.asReadonly();
  readonly authors = signal(authors).asReadonly();
  readonly comments = this.commentsState.asReadonly();

  saveArticle(article: Article): void {
    this.articlesState.update((list) => {
      const index = list.findIndex((item) => item.id === article.id);
      return index >= 0
        ? list.map((item) => (item.id === article.id ? article : item))
        : [article, ...list];
    });
    this.persistArticles();
  }

  addComment(comment: Comment): void {
    this.commentsState.update((list) => [...list, comment]);
    this.persistComments();
  }

  likeComment(id: string): void {
    this.commentsState.update((list) =>
      list.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
    this.persistComments();
  }

  private loadArticles(): Article[] {
    const articles = this.load<Article[]>("inkly_articles", seed);
    const now = Date.now();
    let changed = false;
    const normalized = articles.map((article) => {
      if (
        article.status === "scheduled" &&
        article.scheduledFor &&
        new Date(article.scheduledFor).getTime() <= now
      ) {
        changed = true;
        return { ...article, status: "published" as const };
      }
      return article;
    });
    if (changed)
      localStorage.setItem("inkly_articles", JSON.stringify(normalized));
    return normalized;
  }

  private load<T>(key: string, fallback: T): T {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
    } catch {
      return fallback;
    }
  }

  private persistArticles(): void {
    localStorage.setItem(
      "inkly_articles",
      JSON.stringify(this.articlesState()),
    );
  }

  private persistComments(): void {
    localStorage.setItem(
      "inkly_comments",
      JSON.stringify(this.commentsState()),
    );
  }
}
