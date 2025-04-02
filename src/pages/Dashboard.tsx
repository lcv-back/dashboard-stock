import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { TrendingUp, TrendingDown, Visibility } from '@mui/icons-material';
import { RootState } from '../store';
import stockService from '../services/stockService';
import { setSelectedSymbol } from '../store/slices/stockSlice';

const WATCHLIST_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { prices } = useSelector((state: RootState) => state.stock);

    useEffect(() => {
        // Connect to WebSocket
        stockService.connect();

        // Subscribe to watchlist symbols
        WATCHLIST_SYMBOLS.forEach(symbol => {
            stockService.subscribe(symbol);
        });

        // Cleanup on unmount
        return () => {
            WATCHLIST_SYMBOLS.forEach(symbol => {
                stockService.unsubscribe(symbol);
            });
            stockService.disconnect();
        };
    }, []);

    const handleViewDetails = (symbol: string) => {
        dispatch(setSelectedSymbol(symbol));
        navigate(`/stock/${symbol}`);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Stock Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Change</TableCell>
                                    <TableCell align="right">Change %</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {WATCHLIST_SYMBOLS.map((symbol) => {
                                    const stock = prices[symbol];
                                    return (
                                        <TableRow key={symbol}>
                                            <TableCell component="th" scope="row">
                                                {symbol}
                                            </TableCell>
                                            <TableCell align="right">
                                                ${stock?.price?.toFixed(2) || 'N/A'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    {stock?.change ? (
                                                        <>
                                                            {stock.change > 0 ? (
                                                                <TrendingUp color="success" sx={{ mr: 0.5 }} />
                                                            ) : (
                                                                <TrendingDown color="error" sx={{ mr: 0.5 }} />
                                                            )}
                                                            ${Math.abs(stock.change).toFixed(2)}
                                                        </>
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                {stock?.changePercent ? `${stock.changePercent.toFixed(2)}%` : 'N/A'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleViewDetails(symbol)}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 