export interface Book {
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  dateRead: string;
  year: number | null;
  link: string;
}

function decodeEntities(str: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (m) => entities[m] || m);
}

function extractTag(xml: string, tag: string): string {
  const cdataMatch = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  );
  if (cdataMatch) return decodeEntities(cdataMatch[1].trim());

  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decodeEntities(match[1].trim()) : "";
}

export async function fetchGoodreadsBooks(
  userId: string,
  shelf: string = "read"
): Promise<{ books: Book[]; userName: string }> {
  const url = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch Goodreads RSS: ${res.status}`);
  }

  const xml = await res.text();

  // Extract user name from channel title (format: "{name}'s bookshelf: read")
  const channelXml = xml.split("<item>")[0];
  const channelTitle = extractTag(channelXml, "title");
  const nameMatch = channelTitle.match(/^(.+?)(?:'s|&#39;s|\u2019s)\s+bookshelf/i);
  const userName = nameMatch ? nameMatch[1].trim() : "";

  const items = xml.split("<item>").slice(1);

  const books = items.map((item) => {
    const title = extractTag(item, "title");
    const authorName = extractTag(item, "author_name");
    const imageUrl = extractTag(item, "book_large_image_url") ||
      extractTag(item, "book_medium_image_url") ||
      extractTag(item, "book_image_url");
    const rating = parseInt(extractTag(item, "user_rating")) || 0;
    const dateRead = extractTag(item, "user_read_at");
    const link = extractTag(item, "link");

    return {
      title,
      author: authorName,
      imageUrl,
      rating,
      dateRead: dateRead ? formatDate(dateRead) : "",
      year: dateRead ? parseYear(dateRead) : null,
      link,
    };
  });

  return { books, userName };
}

function parseYear(dateStr: string): number | null {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.getFullYear();
  } catch {
    return null;
  }
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
