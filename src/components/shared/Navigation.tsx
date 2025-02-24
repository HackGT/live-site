class Page {
  name: string;
  link: string;
  privateRoute: boolean;

  constructor(name: string, link: string, privateRoute = false) {
    this.name = name;
    this.link = link;
    this.privateRoute = privateRoute;
  }
}

export const routes = [
  new Page("Home", "/"),
  // new Page("Schedule", "/schedule"),
  // new Page("Tracks & Challenges", "/tracks-challenges"),
  // new Page("Mentors", "/mentors"),
  // new Page("Swag", "/swag"),
  // new Page("Workshops", "/workshops"),
  // new Page("Accomodations", "/accomodations"),
  // new Page("Judging", "/judging"),
  // new Page("Sponsors", "/sponsor"),
  // new Page("Hardware", "/hardware"),
];
