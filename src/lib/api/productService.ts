import { apiClient } from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  artisanName?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  // Get all products
  async getProducts(params?: { category?: string; search?: string; sort?: string }) {
    // Add a tiny cache-busting param so the server returns fresh body (avoids 304 responses)
    const requestParams = {
      ...params,
      _t: Date.now(),
    } as any;

    const response = await apiClient.get<Product[]>('/products', { params: requestParams });
    return response.data || [];
  },

  // Get single product by ID
  async getProductById(id: string) {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Create product (admin only)
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await apiClient.post<Product>('/products', productData);
    return response.data;
  },

  // Update product (admin only)
  async updateProduct(id: string, productData: Partial<Product>) {
    const response = await apiClient.patch<Product>(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (admin only)
  async deleteProduct(id: string) {
    await apiClient.delete(`/products/${id}`);
  },

  // Get featured products
  async getFeaturedProducts() {
    const response = await apiClient.get<Product[]>('/products/featured');
    return response.data;
  },
};
