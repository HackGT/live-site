export type Item = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    category: Category;
    totalAvailable: number;
    maxRequestQty: number; // max number of a specific item you can request at once
    price: number;
    hidden: boolean;
    returnRequired: boolean;
    approvalRequired: boolean;
    location: Location;
    qtyUnreserved: number;
    qtyInStock: number;
    qtyAvailableForApproval: number;
  };
  
  export type Category = {
    id: string;
    name: string;
  };
  
  export type Location = {
    id: string;
    name: string;
    hidden: boolean;
  };
  
  export type ItemByLocation = {
    location: Location;
    categories: ItemByCat[];
  };
  
  export type ItemByCat = {
    category: Category;
    items: Item[];
  };
  
  export interface RequestedItem {
    id: number;
    user: string;
    name: string;
    qtyRequested: number;
    category: Category;
    location: Location;
    status: string;
    cancelled: boolean;
  }
  
  export const SUBMITTED = "SUBMITTED";
  export const APPROVED = "APPROVED";
  export const DENIED = "DENIED";
  export const ABANDONED = "ABANDONED";
  export const CANCELLED = "CANCELLED";
  export const READY_FOR_PICKUP = "READY_FOR_PICKUP";
  export const FULFILLED = "FULFILLED";
  export const RETURNED = "RETURNED";
  export const LOST = "LOST";
  export const DAMAGED = "DAMAGED";
  
  export type DetailedItemQuantities = {
    [key: string]: number;
  } & {
    total: number;
  };
  
  export type ItemWithStatistics = {
    item: Item;
    detailedQuantities: DetailedItemQuantities;
  };
  