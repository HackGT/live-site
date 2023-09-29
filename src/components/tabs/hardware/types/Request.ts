import { User } from "firebase/auth";

import { Item, Location } from "./Hardware";

export type RequestStatus =
  | "SUBMITTED"
  | "APPROVED"
  | "DENIED"
  | "ABANDONED"
  | "CANCELLED"
  | "READY_FOR_PICKUP"
  | "FULFILLED"
  | "RETURNED"
  | "LOST"
  | "DAMAGED";

export interface Request {
  id: string;
  user: User;
  item: Item;
  status: RequestStatus;
  location: Location;
  quantity: number;
  createdAt: number;
  updatedAt: string;
}
