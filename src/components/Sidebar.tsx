import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

const drawerWidth = 100;

interface FoodData {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): FoodData {
	return { name, calories, fat, carbs, protein };
}

const rows: FoodData[] = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const theme = createTheme({
	palette: {
		primary: {
			main: '#333',
		},
		secondary: {
			main: '#fff',
		},
	},
});

const styles = {
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#222',
		color: '#fff',
	},
	content: {
		flexGrow: 1,
		padding: '2px',
	},
	listItemText: {
		color: '#fff',
	},
} as const;

const Sidebar: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<div style={styles.root}>
				<AppBar position="fixed" style={styles.appBar}>
					<Toolbar>
						<Typography variant="h6" noWrap>
                            Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					style={styles.drawer}
					variant="permanent"
					anchor="left"
				>
					<Toolbar />
					<div>
						<List>
							<ListItem button>
								<ListItemText primary="Sidebar Item 1" />
							</ListItem>
							<ListItem button>
								<ListItemText primary="Sidebar Item 2" />
							</ListItem >
							<ListItem button>
								<ListItemText primary="Sidebar Item 3" />
							</ListItem>
						</List>
					</div>
				</Drawer>
				<main style={styles.content}>
					<Toolbar />
					<Typography paragraph>
                        Here goes your content. You can add more components as needed.
					</Typography>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Dessert (100g serving)</TableCell>
									<TableCell align="right">Calories</TableCell>
									<TableCell align="right">Fat&nbsp;(g)</TableCell>
									<TableCell align="right">Carbs&nbsp;(g)</TableCell>
									<TableCell align="right">Protein&nbsp;(g)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</main>
			</div>
		</ThemeProvider>
	);
};

export default Sidebar;
