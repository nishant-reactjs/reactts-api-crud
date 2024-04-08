import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { addProduct, deleteProduct, filterProduct, getAllCategory, getAllProduct, getOneProduct } from './thunk';

const initProduct = {
	title: '',
	description: '',
	price: '',
	discountPercentage: '',
	rating: '',
	stock: '',
	brand: '',
	category: '',
	thumbnail: null
};
const initialState: Product = { products: [], category: [],  product: initProduct, isLoading: false, error: '', total: 0 };

const ProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {

	},
	extraReducers(builder) {
		builder
			// ALL PRODUCT
			.addCase(getAllProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getAllProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.products;
				state.total = action.payload.totalPage;
				state.error = '';
			})
			.addCase(getAllProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			})

			// FILTER PRODUCT
			.addCase(filterProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(filterProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.products;
				state.total = action.payload.totalPage;
				state.error = '';
			})
			.addCase(filterProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			})

			// GET ONE PRODUCT
			.addCase(getOneProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getOneProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.product = action.payload;
				state.error = '';
			})
			.addCase(getOneProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			})

			// ADD PRODUCT
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.product = action.payload;
				state.error = '';
			})
			.addCase(addProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			})

			// DELETE PRODUCT
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.product = action.payload;
				state.error = '';
				alert('Product deleted.');
			})
			.addCase(deleteProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			})

			// GET CATEGORY
			.addCase(getAllCategory.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getAllCategory.fulfilled, (state) => {
				state.isLoading = false;
				// state.category = action.payload;
				state.error = '';
			})
			.addCase(getAllCategory.rejected, (state) => {
				state.isLoading = false;
				state.error = 'action';
			});
	}
});



export default ProductSlice.reducer;
