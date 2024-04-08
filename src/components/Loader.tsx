import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '50vh',
				}}
			>
				<CircularProgress />
			</div>
		</>
	);
};

export default Loader;
