export enum DisplayType {
  WEB = "web",
  MOBILE = "mobile",
}

export type BlockFormValues = {
  hexathon: string;
  title: string;
  content: string;
  slug: string;
  display: DisplayType;
};
