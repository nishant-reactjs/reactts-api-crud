import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ProductData } from '../../types/product';
import { getCancelToken } from '../../services/http';
import { productService } from '../../services/Product';

export const getAllProduct = createAsyncThunk(
	'getall/products',
	async({ limit, skip }: { limit: number, skip: number }, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.getAll({ limit, skip }, source);

			return { products: res.data.products, totalPage: res.data.total };
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const getOneProduct = createAsyncThunk(
	'getOne/products',
	async(id: string, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.getOne(id, source);
			return res.data;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const filterProduct = createAsyncThunk(
	'filter/products',
	async({ limit, skip, searchInput }: { limit: number, skip: number, searchInput: string }, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.filter({ limit, skip, searchInput }, source);
			return { products: res.data.products, totalPage: res.data.total };
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const addProduct = createAsyncThunk(
	'add/product',
	async(formData: ProductData, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.addProduct(formData, source);
			return res.data;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'delete/product',
	async(id: number, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.deleteProduct(id, source);
			return res.data;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);


export const getAllCategory = createAsyncThunk(
	'getAllCategory/products',
	async(_, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await productService.getAllCategory(source);
			// console.log(res);
			return res;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);
