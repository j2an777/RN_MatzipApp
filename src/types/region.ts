type SameName = {
  region: string[];
  keyword: string;
  selected_region: string;
};

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: SameName;
};

type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

interface RegionResponse {
  meta: Meta;
  documents: RegionInfo[];
}

export type { SameName, Meta, RegionInfo, RegionResponse };
