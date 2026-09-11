import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from "@angular/router";
import { provideQuillConfig } from "ngx-quill/config";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideQuillConfig({}), 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
}).catch(console.error);
