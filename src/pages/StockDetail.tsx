import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Divider } from '@mui/material';
import StockChart from '../components/StockChart';

interface StockDetail {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
    description: string;
}

const mockData: StockDetail = {
    symbol: 'VNM',
    name: 'Vinamilk',
    price: 123.45,
    change: 2.34,
    changePercent: 1.93,
    volume: 1234567,
    marketCap: 1234567890,
    peRatio: 15.67,
    dividendYield: 2.34,
    description: 'Vinamilk là công ty sản xuất và kinh doanh sữa và các sản phẩm từ sữa hàng đầu tại Việt Nam.',
};

const StockDetail: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    {mockData.name} ({mockData.symbol})
                </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                    <StockChart />
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>
                        Stock Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h4" color={mockData.change >= 0 ? 'success.main' : 'error.main'}>
                            {mockData.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                variant="body1"
                                color={mockData.change >= 0 ? 'success.main' : 'error.main'}
                            >
                                {mockData.change >= 0 ? '+' : ''}{mockData.change.toFixed(2)}
                            </Typography>
                            <Typography
                                variant="body1"
                                color={mockData.changePercent >= 0 ? 'success.main' : 'error.main'}
                            >
                                ({mockData.changePercent.toFixed(2)}%)
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                Volume
                            </Typography>
                            <Typography variant="body1">
                                {mockData.volume.toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                Market Cap
                            </Typography>
                            <Typography variant="body1">
                                ${(mockData.marketCap / 1000000000).toFixed(2)}B
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                P/E Ratio
                            </Typography>
                            <Typography variant="body1">
                                {mockData.peRatio.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                Dividend Yield
                            </Typography>
                            <Typography variant="body1">
                                {mockData.dividendYield.toFixed(2)}%
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Company Description
                    </Typography>
                    <Typography variant="body1">
                        {mockData.description}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default StockDetail; 