import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper, Card, CardMedia } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../redux/product/thunk';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader';


const Details: React.FC = () => {

	const { id } = useParams() as { id: string };
	const dispatch = useAppDispatch();
	const { product, isLoading } = useAppSelector(state => state.product);

	useEffect(() => {
		dispatch(getOneProduct(id));
	}, [id]);

	return (
		<>
			<Helmet>
				<title>Product Detail</title>
			</Helmet>
			<Container sx={{ mt: 8 }}>
				{isLoading && product
					?
					<Loader />
					:
					<>
						<Typography variant="h4" gutterBottom>
							Product {id}
						</Typography>
						<Grid container sx={{ mt: 3 }} spacing={3}>
							<Grid item xs={12} sm={6}>
								<Paper elevation={3} style={{ padding: 20 }}>
									<Card>
										{typeof product.thumbnail === 'string' && (
											<CardMedia
												component="img"
												height="300"
												image={product.thumbnail}
												alt={product.thumbnail}
											/>
										)}
									</Card>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Paper elevation={3} style={{ padding: 20 }}>
									<Typography variant="h5" gutterBottom style={{ marginBottom: 20 }}>
										{product.title}
									</Typography>
									<Typography variant="body1" gutterBottom style={{ marginBottom: 20 }}>
										<strong>Description:</strong> {product.description}
									</Typography>
									<Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
										<strong>Price:</strong>{product.price}
									</Typography>
									<Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
										<strong>discountPercentage:</strong>{product.discountPercentage}
									</Typography>
									<Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
										<strong>rating:</strong>{product.rating}
									</Typography>
									<Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
										<strong>brand:</strong>{product.brand}
									</Typography>
									<Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
										<strong>category:</strong>{product.category}
									</Typography>
								</Paper>
							</Grid>
						</Grid>
					</>
				}
			</Container>
		</>
	);
};

export default Details;
