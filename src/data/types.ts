export interface ACProject {
  title: string;
  description: string;
  info: string;
  article: Article;
  client: string;
  year: number;
  services: string[];
  hero: string;
  leading: (string | string[])[];
  quote: Quote;
  lazy: (string | string[])[]
}

interface Article {
  title: string[];
  img: string;
}

interface Quote {
  text: string;
  author: QuoteAuthor;
}

interface QuoteAuthor {
  name: string;
  position: string;
}