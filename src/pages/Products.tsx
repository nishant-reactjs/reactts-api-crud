import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteProduct, filterProduct } from '../redux/product/thunk';
import {
	AppBar,
	Box,
	Button,
	Grid,
	Pagination,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const itemPerPage = 5;

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { products, isLoading, total } = useAppSelector(
		(state) => state.product,
	);

	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [pagination, setPagination] = useState<{
		limit: number;
		skip: number;
	}>({ limit: itemPerPage, skip: 0 });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		page: number,
	) => {
		const skip = (page - 1) * itemPerPage;
		setPage(page);
		setPagination({ ...pagination, skip: skip });
	};

	useEffect(() => {
		dispatch(
			filterProduct({
				limit: pagination.limit,
				skip: pagination.skip,
				searchInput: search,
			}),
		);
	}, [dispatch, pagination.skip, pagination.limit, search]);

	const handleDelete = (id: number) => {
		dispatch(deleteProduct(id));
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'thumbnail',
			headerName: 'Image',
			width: 200,
			renderCell: (params) => (
				<img
					src={params.value}
					alt={params.value}
					style={{ width: '150px', height: '100px' }}
				/>
			),
		},
		{ field: 'title', headerName: 'Title', width: 170 },
		{ field: 'description', headerName: 'Description', width: 200 },
		{ field: 'category', headerName: 'Category', width: 180 },
		{ field: 'brand', headerName: 'Brand', type: 'string', width: 80 },
		{ field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
		{ field: 'price', headerName: 'Price', type: 'number', width: 70 },
		{
			field: 'discountPercentage',
			headerName: 'Discount %',
			type: 'number',
			width: 100,
		},
		{ field: 'rating', headerName: 'Rating', type: 'number', width: 90 },
		{
			field: '',
			headerName: 'Action',
			width: 250,
			renderCell: (params) => (
				<>
					<Link to={'/update/' + params.row.id}>
						<Button>Update</Button>
					</Link>
					<Button
						onClick={() => handleDelete(params.row.id)}
						color={'error'}
					>
						Delete
					</Button>
					<Link to={'/details/' + params.row.id}>
						<Button>Details</Button>
					</Link>
				</>
			),
		},
	];

	return (
		<>
			<Helmet>
				<title>Products</title>
			</Helmet>

			<AppBar position="static">
				<Typography
					variant="h6"
					noWrap
					height={45}
					component="div"
					sx={{
						flexGrow: 1,
						mt: 2,
						display: { xs: 'none', sm: 'block' },
					}}
				>
					Dashboard
				</Typography>
			</AppBar>

			<div style={{ marginTop: '20px' }}>
				<h2>Products</h2>
				<div
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Link to="/add-product">
						<Button variant="outlined" sx={{ ml: 5 }}>
							Add Product
						</Button>
					</Link>

					<Grid sx={{ mr: 5 }} container item xs={3}>
						<TextField
							fullWidth
							label="Search"
							name="search"
							value={search}
							onChange={handleChange}
						/>
					</Grid>
				</div>

				<Box sx={{ m: 1 }}>
					<>
						<DataGrid
							loading={isLoading}
							autoHeight
							rows={products}
							columns={columns}
							getRowHeight={() => 110}
							hideFooterPagination
						/>
						<div style={{ display: 'flex', justifyContent: 'end' }}>
							<Pagination
								count={Math.ceil(total / itemPerPage)}
								page={page}
								onChange={handlePageChange}
								variant="outlined"
								shape="rounded"
								style={{ marginTop: '1rem' }}
							/>
						</div>
					</>
				</Box>
			</div>
		</>
	);
};

export default Products;
