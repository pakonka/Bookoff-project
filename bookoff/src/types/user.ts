export interface User {
    user_id: number;
    user_name: string;
    email: string;
    first_name: string;
    last_name: string | null;
    phone: string | null;
    address: string;
    city: string;
    country: string | null;
    postal_code: string;
    created_at: string; // Or Date type depending on your date format
    is_active: boolean;
    occupation: string | null;
    gender: 'male' | 'female' | 'other' | null;
    role_name: string | null;
    role_description: string | null;
    permissions: string; // A comma-separated list of permission names
    user_avatar: string;
    user_point: number;
  }
  
  