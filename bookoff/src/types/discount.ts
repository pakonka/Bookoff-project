export interface Discount {
    discount_id: number;
    discount_code: string;
    discount_percentage: number;
    valid_from: string | null;
    valid_until: string | null;
    active: boolean;
    discount_type: string;
    required_quantity: number;
  }
  