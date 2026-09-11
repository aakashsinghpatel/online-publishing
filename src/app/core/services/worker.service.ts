import { Injectable } from "@angular/core";
import { SearchDocument } from "../models/models";

@Injectable({ providedIn: "root" })
export class WorkerService {
  private worker?: Worker;
  private requestId = 0;
  private pending = new Map<number, (ids: string[]) => void>();

  search(documents: SearchDocument[], query: string): Promise<string[]> {
    if (typeof Worker === "undefined") {
      const normalized = query.trim().toLowerCase();
      return Promise.resolve(
        documents
          .filter(
            (document) => !normalized || document.text.includes(normalized),
          )
          .map((document) => document.id),
      );
    }

    this.worker ??= this.createWorker();
    const id = ++this.requestId;
    return new Promise((resolve) => {
      this.pending.set(id, resolve);
      this.worker!.postMessage({ id, documents, query });
    });
  }

  private createWorker(): Worker {
    const worker = new Worker(
      new URL("../../workers/search.worker", import.meta.url),
      { type: "module" },
    );
    worker.onmessage = ({
      data,
    }: MessageEvent<{ id: number; ids: string[] }>) => {
      const resolve = this.pending.get(data.id);
      if (resolve) {
        resolve(data.ids);
        this.pending.delete(data.id);
      }
    };
    return worker;
  }
}
