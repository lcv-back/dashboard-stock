import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockPrice {
    symbol: string;
    price: number;
    change?: number;
    changePercent?: number;
    volume?: number;
}

interface StockState {
    prices: { [key: string]: StockPrice };
    loading: boolean;
    error: string | null;
    selectedSymbol: string | null;
}

const initialState: StockState = {
    prices: {},
    loading: false,
    error: null,
    selectedSymbol: null,
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        updateStockPrice: (state, action: PayloadAction<StockPrice>) => {
            const { symbol, price } = action.payload;
            const currentPrice = state.prices[symbol]?.price || price;
            const change = price - currentPrice;
            const changePercent = (change / currentPrice) * 100;

            state.prices[symbol] = {
                ...state.prices[symbol],
                ...action.payload,
                change,
                changePercent,
            };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setSelectedSymbol: (state, action: PayloadAction<string | null>) => {
            state.selectedSymbol = action.payload;
        },
    },
});

export const { updateStockPrice, setLoading, setError, setSelectedSymbol } = stockSlice.actions;

export default stockSlice.reducer; 