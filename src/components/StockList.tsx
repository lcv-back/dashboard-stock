import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
}

const mockData: Stock[] = [
    { symbol: 'VNM', name: 'Vinamilk', price: 123.45, change: 2.34, changePercent: 1.93, volume: 1234567 },
    { symbol: 'VIC', name: 'Vingroup', price: 234.56, change: -3.45, changePercent: -1.45, volume: 2345678 },
    { symbol: 'FPT', name: 'FPT Corporation', price: 345.67, change: 4.56, changePercent: 1.34, volume: 3456789 },
    { symbol: 'TCB', name: 'Techcombank', price: 456.78, change: -5.67, changePercent: -1.23, volume: 4567890 },
    { symbol: 'VHM', name: 'Vinhomes', price: 567.89, change: 6.78, changePercent: 1.21, volume: 5678901 },
];

const StockList: React.FC = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Top Stocks
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Change</TableCell>
                            <TableCell align="right">Change %</TableCell>
                            <TableCell align="right">Volume</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.map((stock) => (
                            <TableRow key={stock.symbol}>
                                <TableCell component="th" scope="row">
                                    {stock.symbol}
                                </TableCell>
                                <TableCell>{stock.name}</TableCell>
                                <TableCell align="right">{stock.price.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                        {stock.change >= 0 ? (
                                            <TrendingUpIcon color="success" fontSize="small" />
                                        ) : (
                                            <TrendingDownIcon color="error" fontSize="small" />
                                        )}
                                        <Typography
                                            component="span"
                                            color={stock.change >= 0 ? 'success.main' : 'error.main'}
                                        >
                                            {Math.abs(stock.change).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        component="span"
                                        color={stock.changePercent >= 0 ? 'success.main' : 'error.main'}
                                    >
                                        {stock.changePercent.toFixed(2)}%
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{stock.volume.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StockList; 