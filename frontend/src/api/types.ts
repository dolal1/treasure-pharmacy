export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  maps_embed_url: string;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  category: string;
  category_name: string;
  short_description: string;
  description: string;
  price: string;
  image: string | null;
}

export interface ServiceCategory {
  id: number;
  slug: string;
  name: string;
  blurb: string;
  services: Service[];
}

export interface ContentBlock {
  key: string;
  text: string;
  image: string | null;
}

export interface BookingPayload {
  full_name: string;
  email: string;
  phone: string;
  service: string;
  branch: number | null;
  home_address?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}

export interface BookingResponse extends BookingPayload {
  reference: string;
  status: string;
  created_at: string;
}
