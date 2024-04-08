import React, { FC } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivateRoutes: FC = () => {
	const location = useLocation();
	const Token = useAppSelector((state) => state.user.token);

	return Token ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
			state={{ previousPath: location.pathname }}
		/>
	);
};

export default PrivateRoutes;
