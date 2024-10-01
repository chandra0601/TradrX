
export const getColumns = () => [
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
    {
        name: "Exchange",
        label: "Exchange",
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
    {
        name: "Token",
        label: "Token",
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

    {
        name: "ExpiryDate",
        label: "Expiry Date",
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
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "TaskTime",
        label: "Task Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },

]
export const getColumns1 = () => [
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
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirydate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
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

    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "strategytype",
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
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    },
    {
        name: "SL value",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
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
        label: "LotSize",
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
        label: "Strike value",
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

    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
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
        label: "PEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepth Higher",
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
        label: "CEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeep Lower",
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

    {
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },

]
export const getColumns2 = () => [
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
    {
        name: "Exchange",
        label: "Exchange",
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
    {
        name: "Token",
        label: "Token",
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

    {
        name: "Expiry Date",
        label: "Expiry Date",
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
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },

];


export const getColumns3 = () => [
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

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
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
        name: "TradeType",
        label: "Trade Type",
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
        label: "Stoploss",
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
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
export const getColumns6 = () => [
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

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
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
        label: "TradeType",
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
        label: "Stoploss",
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
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
// Option
export const getColumns4 = () => [
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
        label: "Strategy",
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
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "LotSize",
        label: "Lot Size",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Option Type",
        label: "Option Type",
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
        label: "Stoploss",
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
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Spot Price",
        label: "Spot Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Hashing",
        label: "Hashing",
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
]
export const getColumns7 = () => [
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
        label: "Strategy",
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
        name: "LotSize",
        label: "LotSize",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Option Type",
        label: "Option Type",
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
        label: "Stoploss",
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
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Spot Price",
        label: "Spot Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Hashing",
        label: "Hashing",
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
]
//Pattern
export const getColumns5 = () => [
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
        name: "SPattern",
        label: "Pattern Name",
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
        name: "TradeType",
        label: "Trade Type",
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
        label: "Stoploss",
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
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

]

export const getColumns8 = () => [
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
        name: "SPattern",
        label: "Pattern Name",
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
    {
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
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
        name: "Quantity",
        label: "Quantity",
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
        label: "Stoploss",
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
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

]


