import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MarketIndicator {
    name: string;
    value: number;
    change: number;
    changePercent: number;
}

const mockData: MarketIndicator[] = [
    { name: 'VN-Index', value: 1234.56, change: 12.34, changePercent: 1.01 },
    { name: 'HNX-Index', value: 234.56, change: -2.34, changePercent: -0.99 },
    { name: 'S&P 500', value: 4567.89, change: 45.67, changePercent: 1.01 },
    { name: 'Dow Jones', value: 34567.89, change: -123.45, changePercent: -0.36 },
    { name: 'Nasdaq', value: 12345.67, change: 234.56, changePercent: 1.94 },
];

const MarketIndicators: React.FC = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Market Indicators
            </Typography>
            <List>
                {mockData.map((indicator) => (
                    <ListItem key={indicator.name} divider>
                        <ListItemText
                            primary={indicator.name}
                            secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" component="span">
                                        {indicator.value.toFixed(2)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {indicator.change >= 0 ? (
                                            <TrendingUpIcon color="success" fontSize="small" />
                                        ) : (
                                            <TrendingDownIcon color="error" fontSize="small" />
                                        )}
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            color={indicator.change >= 0 ? 'success.main' : 'error.main'}
                                        >
                                            {Math.abs(indicator.change).toFixed(2)} ({indicator.changePercent.toFixed(2)}%)
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MarketIndicators; 