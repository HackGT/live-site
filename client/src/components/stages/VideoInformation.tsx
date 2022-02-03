class VideoInformation {
  type: string;
  url: string;
  status: string;
  eventName: string;

  constructor(type: string, url: string, status: string, eventName: string) {
    this.type = type;
    this.url = url;
    this.status = status;
    this.eventName = eventName;
  }
}

export default VideoInformation;
