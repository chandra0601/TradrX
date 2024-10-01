export const columns =()=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "ScalpType",
        label: "ScalpType",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "Exchange",
    //     label: "Exchange",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "Token",
    //     label: "Token",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "Booking Point",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    // {
    //     name: "ExpiryDate",
    //     label: "Expiry Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    // {
    //     name: "SSDate",
    //     label: "SS Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "SEDate",
        label: "SE Date",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    // {
    //     name: "TaskStatus",
    //     label: "Task Status",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "TaskTime",
    //     label: "Task Time",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "TradeCount",
    //     label: "Trade Count",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
];

export const columns1 =()=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "STG",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    
    // {
    //     name: "Expirydate",
    //     label: "Expiry Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "Token",
    //     label: "Token",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
   
    
    {
        name: "strategytype",
        label: "Measurment Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target value",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        label: "stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot Size",
        label: "Lot Size",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Product Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Entry Time",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exit Time",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StrikeType",
        label: "Strike Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Depth of Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DeepStrike",
        label: "Deep Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
   
    // {
    //     name: "SSDate",
    //     label: "SS Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "SEDate",
        label: "SE Date",
        options: {
            filter: true,
            sort: true,
        }
    },
   
    {
        name: "LowerRange",
        label: "Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthLower",
        label: "CEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PEDepthLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepthHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeepLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    
    // {
    //     name: "TradeCount",
    //     label: "Trade Count",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
];

export const columns2 =()=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "TradePattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "Exchange",
    //     label: "Exchange",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "Token",
    //     label: "Token",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        label: "stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    
    // {
    //     name: "Expiry Date",
    //     label: "Expiry Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    
    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "SEDate",
    //     label: "SE Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "SSDate",
        label: "SS Date",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    // {
    //     name: "TradeCount",
    //     label: "Trade Count",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },

];

export const columns3 =(selectStrategyType)=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitPrice",
        label: "Exit Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: selectStrategyType == "Option Strategy" ? "LotSize" : selectStrategyType == "Scalping" ? "Quantity" : "Quantity",
        label: selectStrategyType == "Option Strategy" ? "LotSize" : selectStrategyType == "Scalping" ? "Quantity" : "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "SL",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PnL",
        label: "PnL",
        
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    }
    

];

export const columns4 =()=> [
    {
        name: "S.No",
        label: "S.No",

        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "ETime",
        label: "Entry Time",

        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PnL",

        label: "PnL",
        
        options: {
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
            filter: true,
            sort: true,
        }
    },


];

export const columns5 =(selectStrategyType)=> [
    {
        name: "S.No",
        label: "S.No",

        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: selectStrategyType == "Scalping" ? "EquityCurve" : "PnL",
        label: "Equity Curve",
        options: {
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
            filter: true,
            sort: true,
        }
    },


];

export const columns6 =()=> [
    {
        name: "S.No",
        label: "S.No",

        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "ETime",
        label: "Entry Time",

        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Drawdown",

        label: "Drawdown",
        options: {
            filter: true,
            sort: true,
            
        }
    },


];


export const columns7 =()=> [
    {
        name: "S.No",
        label: "S.No",

        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "Max Open Trade",
        label: "EMax Open Trade",

        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Max Profit",
        label: "Max Profit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Max Drawdown",
        label: "Max Drawdown",
        options: {
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
            filter: true,
            sort: true,
        }
    },
    {
        name: "profit at Max Draw Down",
        label: "profit at Max Draw Down",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Current Price",
        label: "Current Price",
        options: {
            filter: true,
            sort: true,
        }
    },


];

export const columns8 =()=> [
    {
        name: "S.No",
        label: "S.No",

        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "Current Runing loss",
        label: "Current Runing loss",

        options: {
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
            filter: true,
            sort: true,
        }
    },
    {
        name: "Current open Trade",

        label: "Current open Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Max Price of Trade Execution",
        label: "Max Price of Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Min Price of Trade Execution",
        label: "Min Price of Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Max Involved fund",
        label: "Max Involved fund",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Last trade open price",
        label: "Last trade open price",
        options: {
            filter: true,
            sort: true,
        }
    },
    



];