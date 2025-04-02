import { store } from '../store';
import { updateStockPrice } from '../store/slices/stockSlice';

class StockService {
    private socket: WebSocket | null = null;
    private apiKey: string = process.env.REACT_APP_FINNHUB_API_KEY || '';
    private subscribedSymbols: Set<string> = new Set();

    connect() {
        this.socket = new WebSocket(`wss://ws.finnhub.io?token=${this.apiKey}`);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            // Resubscribe to previously subscribed symbols
            this.subscribedSymbols.forEach(symbol => {
                this.subscribe(symbol);
            });
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'trade') {
                const { s: symbol, p: price } = data.data[0];
                store.dispatch(updateStockPrice({ symbol, price }));
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            // Attempt to reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
        };
    }

    subscribe(symbol: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected');
            return;
        }

        this.socket.send(JSON.stringify({ type: 'subscribe', symbol }));
        this.subscribedSymbols.add(symbol);
    }

    unsubscribe(symbol: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        this.subscribedSymbols.delete(symbol);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            this.subscribedSymbols.clear();
        }
    }

    // REST API methods for historical data
    async getHistoricalData(symbol: string, resolution: string, from: number, to: number) {
        const response = await fetch(
            `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${this.apiKey}`
        );
        return response.json();
    }

    async getCompanyProfile(symbol: string) {
        const response = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${this.apiKey}`
        );
        return response.json();
    }

    async getQuote(symbol: string) {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.apiKey}`
        );
        return response.json();
    }
}

export default new StockService(); 