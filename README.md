# Stock Dashboard

A real-time stock market dashboard built with React, TypeScript, and Material-UI.

## Features

- Real-time stock price tracking
- Interactive stock charts
- Market indicators
- Stock list with detailed information
- Responsive design
- Dark mode support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alpha Vantage API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stock-dashboard.git
cd stock-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Alpha Vantage API key:
```
REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
REACT_APP_WS_URL=wss://your_websocket_url_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Usage

1. View the main dashboard to see market overview and top stocks
2. Click on any stock to view detailed information
3. Use the charts to analyze stock performance
4. Monitor market indicators for real-time updates

## Technologies Used

- React
- TypeScript
- Material-UI
- Redux Toolkit
- Chart.js
- Axios
- WebSocket

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
