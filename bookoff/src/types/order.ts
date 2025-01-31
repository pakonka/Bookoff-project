// Define the interfaces for the order-related data

 export interface ShippingMethod {
    shipping_method_id: number;  // ID of the shipping method
    method_name: string;         // Name of the shipping method
  }
  
 export interface Discount {
    discount_code: string;       // Code for the discount
    discount_percentage: number; // Discount percentage
  }
  
export  interface Payment {
    payment_id:number;
    payment_status: string;      // Payment status (e.g., 'Paid', 'No Payment')
    payment_date: string;        // Date when the payment was made
    payment_method: string;      // Method used for payment (e.g., 'credit_card', 'paypal')
    amount: number;      // Amount of payment
  }
  
  export interface OrderItem {
    order_item_id: number;
    product_id: number;
    product_name: string;
    price_at_purchase: number;
    quantity: number;
    discount_code?: number;
    image_url: string;
  }
  
  export interface Order {
    order_id: number;
    user_id: number;
    customer_name: string;
    order_date: string; // Or Date if you're working with a Date object
    shipping_address: string;
    shipping_method_id: number;
    method_name: string; // Assuming the method name is included in the result
    shipping_method: string;
    discount_code?: string;
    discount_percentage?: number;
    order_status: string;
    total_amount: number;
    total_price: number;
    payment_status: string;
    payment_date: string | null; // Or Date, depending on your data format
    payment_method: string;
    payment_amount: number;
    order_items: OrderItem[];
  }
  

  