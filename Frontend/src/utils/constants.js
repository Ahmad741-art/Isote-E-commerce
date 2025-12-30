export const CATEGORIES = [
  'Clothing',
  'Outerwear',
  'Knitwear',
  'Tailoring',
  'Accessories',
  'Footwear',
  'Bags',
  'Jewelry',
  'Home',
];

export const GENDERS = ['Women', 'Men', 'Unisex'];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 15, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 25, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 45, days: '1 business day' },
];

export const ORDER_STATUS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};
