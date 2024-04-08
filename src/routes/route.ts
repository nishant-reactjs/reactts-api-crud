import { lazy } from 'react';

import PrivateRoutes from './protectedRoute';

const Products = lazy(() => import('../pages/Products'));
const Login = lazy(() => import('../pages/Login'));
const Create = lazy(() => import('../pages/Create'));
const Update = lazy(() => import('../pages/Update'));
const Details = lazy(() => import('../pages/Details'));

export interface RouteType {
	path: string;
	isPrivate?: boolean;
	component: React.FC;
	children?: RouteType[];
}

export const routes: RouteType[] = [
	{
		path: '/',
		component: PrivateRoutes,
		isPrivate: true,
		children: [
			{
				path: 'products',
				component: Products,
				isPrivate: true,
			},
			{
				path: 'add-product',
				component: Create,
				isPrivate: false,
			},
		],
	},
	{
		path: '/',
		component: Login,
		isPrivate: false,
		children: [
			{
				path: 'login',
				component: Login,
				isPrivate: false,
			},
			{
				path: 'update/:id',
				component: Update,
				isPrivate: false,
			},
			{
				path: 'details/:id',
				component: Details,
				isPrivate: false,
			},
		],
	},
];
