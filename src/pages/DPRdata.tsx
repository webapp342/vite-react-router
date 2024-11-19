import React from "react";
import SavingAccount from "./SavingAccount.tsx";

const updatedData = [
  {
    assetLogo: "https://assets.coingecko.com/coins/images/35404/standard/icon_%281%29.png?1708499119",
    assetName: "tsTON",
    dpr: "68.42%",
    available: "$62.15K",
    category: "Crypto",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCTON--big.svg",
    assetName: "stTON",
    dpr: "72.03%",
    available: "$45.10K",
    category: "Crypto",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCSTETH--big.svg",
    assetName: "stETH",
    dpr: "75.64%",
    available: "$72.25K",
    category: "Crypto",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg",
    assetName: "ETH1!",
    dpr: "79.25%",
    available: "$20.45K",
    category: "Crypto",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/country/JP--big.svg",
    assetName: "USD/JPY",
    dpr: "82.86%",
    available: "$35.10K",
    category: "Forex",
    secondaryLogo: "https://s3-symbol-logo.tradingview.com/country/US--big.svg", // İkinci logo eklendi
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/country/GB--big.svg",
    assetName: "USD/GBP",
    dpr: "86.48%",
    available: "$35.10K",
    category: "Forex",
    secondaryLogo: "https://s3-symbol-logo.tradingview.com/country/US--big.svg", // İkinci logo eklendi
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/country/TR--big.svg",
    assetName: "USD/TRY",
    dpr: "90.09%",
    available: "$72.25K",
    category: "Forex",
    secondaryLogo: "https://s3-symbol-logo.tradingview.com/country/US--big.svg", // İkinci logo eklendi
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/country/EU--big.svg",
    assetName: "USD/EUR",
    dpr: "93.70%",
    available: "$62.15K",
    category: "Forex",
    secondaryLogo: "https://s3-symbol-logo.tradingview.com/country/US--big.svg", // İkinci logo eklendi
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/tesla--big.svg",
    assetName: "TSLA",
    dpr: "97.31%",
    available: "$45.10K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/apple--big.svg",
    assetName: "APPL",
    dpr: "100.92%",
    available: "$72.25K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/amazon--big.svg",
    assetName: "AMZN",
    dpr: "104.53%",
    available: "$20.45K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/alphabet--big.svg",
    assetName: "GOOGL",
    dpr: "108.14%",
    available: "$35.10K",
    category: "Stocks",
  },



  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/coinbase--big.svg",
    assetName: "COIN",
    dpr: "97.31%",
    available: "$45.10K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/palantir--big.svg",
    assetName: "PLTR",
    dpr: "100.92%",
    available: "$72.25K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/microstrategy--big.svg",
    assetName: "MSTR",
    dpr: "104.53%",
    available: "$20.45K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/meta-platforms--big.svg",
    assetName: "META",
    dpr: "108.14%",
    available: "$35.10K",
    category: "Stocks",
  },



  


  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/advanced-micro-devices--big.svg",
    assetName: "AMD",
    dpr: "97.31%",
    available: "$45.10K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/microsoft--big.svg",
    assetName: "MSFT",
    dpr: "100.92%",
    available: "$72.25K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/netflix--big.svg",
    assetName: "NFLX",
    dpr: "104.53%",
    available: "$20.45K",
    category: "Stocks",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/nike--big.svg",
    assetName: "NKE",
    dpr: "108.14%",
    available: "$35.10K",
    category: "Stocks",
  },


  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/spdr-sandp500-etf-tr--big.svg",
    assetName: "SPY",
    dpr: "111.70%",
    available: "$35.10K",
    category: "ETF",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/vanguard--big.svg",
    assetName: "VOO",
    dpr: "115.32%",
    available: "$72.25K",
    category: "ETF",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/ishares--big.svg",
    assetName: "IVV",
    dpr: "118.93%",
    available: "$62.15K",
    category: "ETF",
  },
  {
    assetLogo: "https://s3-symbol-logo.tradingview.com/sector/technology--big.svg",
    assetName: "XLK",
    dpr: "118.93%",
    available: "$62.15K",
    category: "ETF",
  }, 
  {
    assetLogo: "  https://s3-symbol-logo.tradingview.com/invesco--big.svg",
    assetName: "RSP",
    dpr: "118.93%",
    available: "$62.15K",
    category: "ETF",
  }, 
];


// Uygulama bileşeni
const App: React.FC = () => {
  return <SavingAccount data={updatedData} />;
};

export default App;
