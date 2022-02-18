class EventInformation {
  id: string;
  url: string;
  title: string;
  tags: string[];
  description: string;

  constructor(id: string, url: string, title: string, tags: string[], description: string) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.tags = tags;
    this.description = description;
  }
}

export default EventInformation;
