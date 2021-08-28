class EventInformation {
    url: string;
    title: string;
    tags: string[];
    description: string;

    constructor(url: string, title:string, tags: string[], description: string) {
        this.url = url;
        this.title = title;
        this.tags = tags;
        this.description = description;
    }
}

export default EventInformation