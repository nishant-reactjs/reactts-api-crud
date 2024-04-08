import React, { Suspense } from 'react';
import { useAppSelector } from '../redux/store';
import { RouteType, routes } from './route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RouteProvider: React.FC = () => {
	const { isLoggedIn } = useAppSelector((state) => state.user);

	const generateRoutes = (routes: RouteType[], isLoggedIn: boolean) => {
		return routes.map((route, index) => {
			const { path, component: Component, children } = route;

			if (children) {
				const nestedRoutes = generateRoutes(children, isLoggedIn);

				return (
					<Route key={index} path={path} element={<Component />}>
						{nestedRoutes}
					</Route>
				);
			}
			return <Route key={index} path={path} element={<Component />} />;
		});
	};

	return (
		<>
			<BrowserRouter>
				<Suspense>
					<Routes>{generateRoutes(routes, isLoggedIn)}</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
};

export default RouteProvider;
