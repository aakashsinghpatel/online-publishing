import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "authors",
    loadComponent: () =>
      import("./features/authors/authors.component").then(
        (m) => m.AuthorsComponent,
      ),
  },
  {
    path: "article/:id",
    loadComponent: () =>
      import("./features/articles/article-detail.component").then(
        (m) => m.ArticleDetailComponent,
      ),
  },
  {
    path: "write",
    loadComponent: () =>
      import("./features/editor/editor.component").then(
        (m) => m.EditorComponent,
      ),
  },
  {
    path: "tags/:tag",
    loadComponent: () =>
      import("./features/tags/tag-results.component").then(
        (m) => m.TagResultsComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
