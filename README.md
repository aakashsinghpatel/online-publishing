# Inkly 🖋️

A modern Angular-based **Online Publishing Platform** for creating,
publishing, discovering, and discussing articles.

Inkly is developed against the supplied Angular assignment and focuses
on a clean, responsive, maintainable frontend architecture while
demonstrating modern Angular concepts such as **standalone components,
Signals, RxJS, lazy loading, Web Workers, Service Workers/PWA support,
SCSS, and unit testing**.


------------------------------------------------------------------------

## 📌 Project Overview

Inkly provides two primary experiences:

-   **Readers** can explore articles, search and sort the feed, browse
    authors and tags, read article details, and participate through
    comments and threaded replies.
-   **Authors** can create articles using a rich-text editor, save
    drafts, add tags and media, and schedule articles for future
    publication.

The application uses a browser-based persistence layer for the
assignment/demo environment, so it can operate without a custom backend
API. Application state is maintained through Angular Signals and
persisted with `localStorage`.

The architecture keeps the data layer isolated so that a real
backend/API can be introduced later without changing the core feature
boundaries.

------------------------------------------------------------------------

## 🔗 Project Links

-   **GitHub Repository:** `https://github.com/aakashsinghpatel/online-publishing`
-   **Live Application:** `DEPLOYED_APPLICATION_URL`
-   **Local Application:** `http://localhost:4200`

------------------------------------------------------------------------

## ✨ Key Features

### 🔐 Social Authentication

-   Firebase Authentication integration.
-   Google sign-in.
-   Facebook sign-in.
-   Firebase authentication state synchronization.
-   Application-level user state managed through Angular Signals.
-   Sign-out support.
-   Firebase configuration kept outside the feature implementation.

> Firebase Web App configuration must be supplied before Google/Facebook
> authentication can be used.

### 📰 Home / Article Feed

-   Featured articles section.
-   Article cards containing:
    -   Title
    -   Thumbnail
    -   Description
    -   Author
    -   Publication date
    -   Tags
-   Pagination.
-   Sorting by:
    -   Latest
    -   Most popular
    -   Editor's pick
-   Keyword and author search.
-   Search processing delegated to a Web Worker.
-   Empty-state handling.

### 👤 Authors

-   Author directory.
-   Author profile image.
-   Author biography.
-   Article count.
-   Search authors by name.

### 📖 Article Details

-   Full article content.
-   Author information.
-   Publication date.
-   Tags.
-   Related articles.
-   Other articles from the same author.
-   Article comments.
-   Threaded replies.

### 💬 Comments

-   Add comments to an article.
-   Reply to existing comments.
-   Threaded comment presentation.
-   Sort comments by:
    -   Newest
    -   Oldest
    -   Most liked
-   Like comments.
-   Comments persisted locally for the demo environment.

### ✍️ Create New Post

-   Rich-text editor using **Quill / ngx-quill**.
-   Formatting support such as:
    -   Bold
    -   Italic
    -   Underline
    -   Headings
    -   Lists
    -   Links
    -   Images
    -   Video embeds
-   Article title and description.
-   Tags.
-   Featured article flag.
-   Save as draft.
-   Publish immediately.
-   Schedule publication for a future date/time.

### 🏷️ Tags

-   Add tags while creating an article.
-   Popular tags.
-   Browse articles by tag.
-   Tag-based article result page.
-   Reusable tag-list component.

### 📡 Offline / PWA Support

Angular Service Worker support is included for production builds.

The service worker provides:

-   Application-shell caching.
-   Static resource caching.
-   Cached production bundles.
-   Offline loading of previously cached application resources.
-   Versioned application updates.
-   Web App Manifest.
-   Standalone/PWA display metadata.

The application continues to use its local browser persistence layer
while offline.


------------------------------------------------------------------------

## 🧩 Angular Architecture

The project follows a feature-oriented Angular architecture.

### Core

Contains application-wide functionality:

-   Models/interfaces.
-   Authentication service.
-   Data service.
-   Worker service.
-   Application state service.
-   Firebase configuration.

### Features

Functional areas are isolated into focused feature components:

-   Home
-   Authentication
-   Authors
-   Articles
-   Comments
-   Editor
-   Tags

Each feature owns its UI and feature-specific behavior instead of
placing application logic into a single large component.

### Shared Components

Shared components are created only where functionality is genuinely
reusable.

Examples include:

-   `ArticleCardComponent`
-   `TagListComponent`
-   `EmptyStateComponent`

These components are consumed by multiple feature areas where
appropriate rather than existing only to avoid empty folders.

------------------------------------------------------------------------

## 🧠 State Management

The application uses **Angular Signals** for reactive state.

### Signals are used for

-   Current authenticated user.
-   Login state.
-   Articles.
-   Authors.
-   Comments.
-   UI-derived state.
-   Article filtering and derived values.

### Computed state

`computed()` is used where a value can be derived from existing
application state instead of being stored separately.

This avoids unnecessary duplicated state.

### RxJS

RxJS remains part of the application where stream-based behavior is
appropriate.

The architecture avoids introducing a heavy external state-management
library because the assignment does not require one.

The goal is to keep state management simple and understandable while
still demonstrating reactive Angular patterns.

------------------------------------------------------------------------

## ⚙️ Dependency Injection

Modern Angular dependency injection is used through:

``` ts
inject(...)
```

Services are provided at the appropriate application scope using
Angular's dependency-injection system.

Examples include:

-   `AuthService`
-   `DataService`
-   `WorkerService`
-   `AppStateService`

This keeps infrastructure concerns outside presentation components.

------------------------------------------------------------------------

## 🚀 Routing & Performance

Angular Router is used with lazy-loaded standalone components.

Routes are loaded using:

``` ts
loadComponent(...)
```

This provides route-level code splitting and avoids loading every
feature during the initial application startup.

Additional performance practices include:

-   `ChangeDetectionStrategy.OnPush`
-   Angular Signals
-   Computed state
-   Lazy route loading
-   Efficient list rendering
-   Lazy image loading
-   Web Worker processing
-   Production build optimization
-   Hashed production bundles
-   Service Worker caching
-   Limited initial bundle budget

------------------------------------------------------------------------

## 🧵 Web Worker

The assignment explicitly requires a Web Worker.

Inkly uses a dedicated worker for article search processing.

### Flow

``` text
Home Component
      ↓
WorkerService
      ↓
Search Worker
      ↓
Search / filter article documents
      ↓
Matching article IDs
      ↓
Angular application
```

This keeps search processing away from the main browser UI thread.

A fallback implementation is also available when the browser does not
support Web Workers.

------------------------------------------------------------------------

## 📡 Service Worker / PWA

The project uses Angular's official Service Worker implementation.

Production registration is handled through:

``` ts
provideServiceWorker('ngsw-worker.js', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000'
})
```

The application is intentionally configured so the Service Worker is
enabled for production builds rather than interfering with the normal
development workflow.

The Angular Service Worker uses `ngsw-config.json` to define
application-shell and static-resource caching behavior.

------------------------------------------------------------------------

## 🎨 Styling

The project uses **SCSS** as its CSS preprocessor.

Styling follows a component-oriented approach:

-   Component-level SCSS.
-   Shared global styles only for application-wide primitives.
-   Responsive layouts.
-   Reusable visual patterns.
-   Minimal unnecessary global selectors.

The UI is intentionally kept clean and content-focused rather than using
excessive visual effects.

------------------------------------------------------------------------

## 📝 Rich Text Editing

The article editor uses:

-   **ngx-quill**
-   **Quill 2**

The editor provides rich formatting and content authoring capabilities
required by the assignment.

The editor is integrated as an Angular component rather than
implementing a custom contenteditable editor.

------------------------------------------------------------------------

## 🔥 Firebase

Firebase is used specifically for social authentication.

The project contains a Firebase configuration placeholder:

``` ts
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};
```

### Configure Firebase

1.  Create/open a Firebase project.
2.  Register a Web App.
3.  Enable Authentication.
4.  Enable:
    -   Google
    -   Facebook
5.  Add the generated Web App configuration to:

``` text
src/app/core/config/firebase.config.ts
```

6.  Add the required authorized domains/provider configuration in
    Firebase Console.

Do not commit private credentials or environment-specific secrets.

------------------------------------------------------------------------

## 💾 Data Persistence

The assignment does not define a backend API.

Therefore, the current implementation uses browser `localStorage` for
demo persistence.

Persisted application data includes:

-   Articles
-   Comments
-   Current application user

The `DataService` provides the data boundary so that the persistence
implementation can later be replaced with HTTP/API calls.

This approach keeps the assignment independently runnable without
requiring a backend deployment.

------------------------------------------------------------------------

## 🧪 Unit Testing

Unit tests use:

-   Angular TestBed
-   Vitest

Tests are included for:

-   `EditorComponent`
-   `DataService`

Run tests with:

``` bash
npm test
```

------------------------------------------------------------------------

## 🛠️ Technology Stack

  Technology               Version / Usage
  ------------------------ ---------------------------------
  Angular                  22.1.x
  Angular CLI              22.1.x
  Angular Build            22.1.x
  TypeScript               6.0.x
  Node.js                  24.x
  RxJS                     7.8.x
  Firebase                 12.18.x
  ngx-quill                31.x
  Quill                    2.x
  Vitest                   4.x
  SCSS                     Application styling
  Angular Service Worker   PWA / offline application shell
  Web Worker               Article search processing
  Browser localStorage     Demo persistence

------------------------------------------------------------------------

## 📋 Assignment Requirements Covered

The implementation addresses the functional requirements defined in the
supplied assignment:

-   Social authentication using Firebase.
-   Article feed.
-   Article pagination.
-   Article sorting.
-   Article search.
-   Featured articles.
-   Author directory.
-   Author search.
-   Article details.
-   Author biography.
-   Other articles by the author.
-   Related articles.
-   Comments.
-   Threaded comments/replies.
-   Comment sorting.
-   Comment likes.
-   Rich-text article editor.
-   Images, videos and links in articles.
-   Draft articles.
-   Scheduled publishing.
-   Tags.
-   Popular tags.
-   Browse articles by tags.

### Technical / deliverable requirements addressed

-   Modern Angular architecture.
-   Standalone components.
-   State management using Signals.
-   RxJS usage where appropriate.
-   Web Worker.
-   SCSS/CSS preprocessing.
-   Runtime performance optimizations.
-   Unit tests for a main component and service.
-   Production build configuration.
-   Service Worker / PWA support.
-   Responsive UI.
-   No `node_modules` committed to the project ZIP.

------------------------------------------------------------------------

## ⚡ Performance Considerations

The application applies performance techniques that are relevant to the
assignment rather than adding optimizations only for demonstration.

Implemented techniques include:

-   Lazy-loaded routes.
-   Standalone components.
-   `OnPush` change detection.
-   Signals and computed state.
-   Web Worker for search processing.
-   Lazy-loaded images.
-   Production output hashing.
-   Bundle-size budget.
-   Service Worker caching.
-   Avoidance of unnecessary global application state.

------------------------------------------------------------------------

## 📱 Responsive UI

The interface is designed for:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

The layout adapts navigation, article cards, editor sections, comments
and content areas to smaller viewports.

------------------------------------------------------------------------

## ⚙️ Requirements

### Recommended environment

``` text
Node.js 24.x
npm 10.x+
Modern browser
```

Check your versions:

``` bash
node --version
npm --version
```

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone GITHUB_REPOSITORY_URL
```

### 2. Open the project

``` bash
cd online-publishing-platform
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Run below cammnd to create environment file to local and update firebase credentials into 'src/environments/environment.local.ts'
```bash
npm run create-env

```

### 5. Start the development server

``` bash
npm start
```

Open:

``` text
http://localhost:4200
```

### 5. Run unit tests

``` bash
npm test
```

### 6. Create a production build

``` bash
npm run build
```

The production build is generated under:

``` text
dist/online-publishing-platform
```

------------------------------------------------------------------------

## 📡 Testing the Service Worker

Angular Service Worker support is intended for production builds.

After:

``` bash
npm run build
```

serve the generated `dist/online-publishing-platform` directory through
a static HTTP server.

Then:

1.  Open the application in a Chromium-based browser.
2.  Open DevTools.
3.  Go to **Application → Service Workers**.
4.  Confirm that `ngsw-worker.js` is registered.
5.  Open **Cache Storage** and inspect the Angular application caches.
6.  Load the application once while online.
7.  Disable the network.
8.  Refresh and verify that the cached application shell remains
    available.

> Service Workers require a secure context such as HTTPS, with
> `localhost` being the standard development exception.

------------------------------------------------------------------------

## 🔑 Firebase Authentication Setup

Real Google/Facebook authentication requires Firebase configuration.

The repository intentionally does not contain project-specific Firebase
credentials.

Update:

``` text
src/app/core/config/firebase.config.ts
```

with the Firebase Web App configuration before testing social login.

------------------------------------------------------------------------

## 📦 Production Deployment

The application is a static Angular frontend and can be deployed to a
static hosting provider that supports:

-   HTTPS
-   SPA fallback/rewrite to `index.html`
-   Service Worker files served without being blocked by
    caching/security configuration

Examples include:

-   Firebase Hosting
-   Netlify
-   Vercel
-   GitHub Pages with suitable SPA routing configuration

For a production PWA deployment, HTTPS is required.

------------------------------------------------------------------------

## 📌 Assignment Deliverables

  -----------------------------------------------------------------------
  Deliverable                         Status
  ----------------------------------- -----------------------------------
  Fully functional web application    Implemented; final local
                                      build/runtime verification should
                                      be performed

  Unit test for main component        Included

  Unit test for service               Included

  GitHub repository                   Add repository URL

  Web Worker                          Implemented

  CSS preprocessor                    SCSS

  Deployed application                Add deployment URL

  README                              This document

  User credentials                    Add only if a demo authentication
                                      account is created

  Bonus features                      Tags and tag browsing implemented
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🔒 Security Notes

-   Firebase configuration is not populated with project-specific values
    in source control.
-   No `node_modules` directory is included.
-   No service-account/private Firebase credentials should be committed.
-   Authentication is delegated to Firebase rather than storing
    passwords locally.
-   Browser `localStorage` is used only for the assignment/demo data
    layer and should not be treated as secure server-side storage for
    production-sensitive information.

------------------------------------------------------------------------

## 🏁 Conclusion

Inkly demonstrates a complete Angular implementation of the Online
Publishing Platform assignment while keeping the architecture focused on
the documented requirements.

The project combines:

**Angular 22 + Standalone Components + Signals + RxJS + Firebase
Authentication + Quill + Web Worker + Service Worker/PWA + SCSS +
Vitest**

The implementation is designed to be understandable, maintainable and
suitable for demonstrating modern Angular development practices during
an assignment review or technical discussion.

------------------------------------------------------------------------

## 👨‍💻 Author

**Aakash Patel**
