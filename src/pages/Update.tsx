import React, { useEffect, useState } from 'react';
import {
	TextField,
	Button,
	Grid,
	Typography,
	Card,
	CardContent,
} from '@mui/material';
import { ProductData } from '../types/product';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addProduct, getOneProduct } from '../redux/product/thunk';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader';

const Update: React.FC = () => {
	const [formData, setFormData] = useState<ProductData>({
		title: '',
		description: '',
		price: '',
		discountPercentage: '',
		rating: '',
		stock: '',
		brand: '',
		category: '',
		thumbnail: null,
	});

	const { id } = useParams() as { id: string };
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoading, product } = useAppSelector((state) => state.product);

	useEffect(() => {
		dispatch(getOneProduct(id));
	}, [id]);

	useEffect(() => {
		if (product) {
			setFormData(product);
		}
	}, [product]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			const thumbnail = files[0];
			setFormData({
				...formData,
				thumbnail,
			});
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addProduct(formData))
			.unwrap()
			.then((res) => {
				if (res.title) {
					navigate('/products');
				}
			});
	};
	return (
		<div>
			<Helmet>
				<title>Update</title>
			</Helmet>
			{isLoading ? (
				<Loader />
			) : (
				<Card
					style={{ maxWidth: 1000, margin: 'auto', marginTop: 100 }}
				>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={12}>
									<Typography variant="h5" gutterBottom>
										Update Product
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Title"
										name="title"
										value={formData.title}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Description"
										name="description"
										value={formData.description}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Price"
										name="price"
										type="text"
										value={formData.price}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Discount Percentage"
										name="discountPercentage"
										type="text"
										value={formData.discountPercentage}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Rating"
										name="rating"
										value={formData.rating}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Stock"
										name="stock"
										value={formData.stock}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Brand"
										name="brand"
										value={formData.brand}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Category"
										name="category"
										value={formData.category}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<input
										id="contained-button-file"
										type="file"
										style={{ display: 'none' }}
										onChange={handleImageChange}
									/>
									<label htmlFor="contained-button-file">
										<Button
											variant="contained"
											component="span"
										>
											Upload Thumbnail
										</Button>
									</label>
								</Grid>
								<Grid item xs={12}>
									<LoadingButton
										loading={isLoading}
										type="submit"
										variant="contained"
										color="primary"
									>
										Submit
									</LoadingButton>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Update;
