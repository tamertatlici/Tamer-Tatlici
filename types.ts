
export interface Dealer {
  city: string;
  fullName: string;
  phone: string;
  email: string;
  ownerName: string;
  address: string;
  floorModels: string[];
}

export interface GeminiInfo {
  summary: string;
  sources: {
    uri: string;
    title: string;
  }[];
}
