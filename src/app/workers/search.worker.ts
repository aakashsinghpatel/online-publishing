addEventListener(
  "message",
  (
    event: MessageEvent<{
      id: number;
      documents: Array<{ id: string; text: string }>;
      query: string;
    }>,
  ) => {
    const { id, documents, query } = event.data;
    const normalized = query.trim().toLowerCase();
    const ids = documents
      .filter(
        (document) =>
          !normalized || document.text.toLowerCase().includes(normalized),
      )
      .map((document) => document.id);
    postMessage({ id, ids });
  },
);
