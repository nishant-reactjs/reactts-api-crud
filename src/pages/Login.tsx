import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	Card,
	Container,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Helmet } from 'react-helmet';
import { userLogin } from '../redux/auth/thunk';

interface Form {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { token, isLoading, error } = useAppSelector((state) => state.user);

	const [form, setForm] = useState<Form>({ username: '', password: '' });
	const [errorMessage, setErrorMessage] = useState<Form>({
		username: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.username || !form.password) {
			setErrorMessage({
				username: 'Please enter username',
				password: 'Please enter password',
			});
			return;
		} else {
			setErrorMessage({ username: '', password: '' });
		}

		dispatch(userLogin(form));
	};

	useEffect(() => {
		if (token) {
			navigate('/products');
		}
	}, [token, error, isLoading, navigate]);

	return (
		<>
			<Helmet>
				<title>login</title>
			</Helmet>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Card
						sx={{
							p: 5,
							width: 1,
							maxWidth: 420,
						}}
					>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="username"
										value={form.username}
										onChange={handleChange}
										fullWidth
										label="Username"
										autoFocus
										error={
											!form.username &&
											errorMessage.username !== ''
										}
										helperText={
											!form.username &&
											errorMessage.username
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="password"
										value={form.password}
										onChange={handleChange}
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
										error={
											!form.password &&
											errorMessage.password !== ''
										}
										helperText={
											!form.password &&
											errorMessage.password
										}
									/>
								</Grid>
							</Grid>
							<LoadingButton
								type="submit"
								fullWidth
								variant="contained"
								loading={isLoading}
								sx={{ marginTop: 3, marginBottom: 3 }}
							>
								Login
							</LoadingButton>
							{error && (
								<span style={{ color: 'red' }}>{error}</span>
							)}
							<p>
								Don&apos;t have an account?
								<Link
									style={{ textDecoration: 'none' }}
									to="/signup"
								>
									Sign up
								</Link>
							</p>
						</Box>
					</Card>
				</Box>
			</Container>
		</>
	);
};

export default Login;
