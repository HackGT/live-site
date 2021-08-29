class EventInformation {
    id: string;
    url: string;
    title: string;
    tags: string[];
    description: string;

    constructor(id: string, url: string, title:string, tags: string[], description: string) {
        this.url = url;
        this.title = title;
        this.tags = tags;
        this.description = description;
        this.id = id;
    }
}

export default EventInformation