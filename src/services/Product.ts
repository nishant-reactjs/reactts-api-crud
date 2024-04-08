import { CancelTokenSource } from 'axios';
import { HTTP } from './http';
import { Product, ProductData } from '../types/product';

class ProductService{
	getAll({ limit, skip }: {limit: number, skip:number}, cancelToken: CancelTokenSource){
		return HTTP.Get<Product>({
			route: `/products?limit=${limit}&skip=${skip}`,
			cancelToken,
		});
	}

	getOne(id: string, cancelToken: CancelTokenSource){
		return HTTP.Get<ProductData>({
			route: `/products/${id}`,
			cancelToken,
		});
	}

	filter({ limit, skip, searchInput }: { limit: number, skip: number, searchInput: string }, cancelToken: CancelTokenSource){
		return HTTP.Get<Product>({
			route: `products/search?q=${searchInput}&limit=${limit}&skip=${skip}`,
			cancelToken,
		});
	}

	addProduct(formData: ProductData, cancelToken: CancelTokenSource){
		// const form = new FormData;
		// form.append('title', formData.title);
		// form.append('description', formData.description);
		// form.append('price', formData.price);
		// form.append('discountPercentage', formData.discountPercentage);
		// form.append('rating', formData.rating);
		// form.append('stock', formData.stock);
		// form.append('brand', formData.brand);
		// form.append('category', formData.category);
		// form.append('thumbnail', 'formData.thumbnail as File');
		return HTTP.Post<ProductData>({
			route: '/products/add',
			cancelToken,
			body: formData
		});
	}

	deleteProduct(id:number, cancelToken: CancelTokenSource){
		return HTTP.Delete<ProductData>({
			route: `/products/${id}`,
			cancelToken
		});
	}

	getAllCategory(cancelToken: CancelTokenSource){
		return HTTP.Get<Product>({
			route: '/products/categories',
			cancelToken,
		});
	}
}

export const productService = new ProductService();
