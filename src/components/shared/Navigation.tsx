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
  new Page("Schedule", "/schedule"),
  new Page("Tracks", "/tracks"),
  new Page("Mentors", "/mentors"),
  new Page("Sponsors", "/sponsors"),
  new Page("Prizes", "/prizes"),
  new Page("Info", "/info"),
];
