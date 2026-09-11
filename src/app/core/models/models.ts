export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  parentId?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  authorId: string;
  authorName: string;
  publishedAt: string;
  featured: boolean;
  popular: number;
  tags: string[];
  status: "published" | "draft" | "scheduled";
  scheduledFor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "google" | "facebook" | "demo";
}

export interface SearchDocument {
  id: string;
  text: string;
}
