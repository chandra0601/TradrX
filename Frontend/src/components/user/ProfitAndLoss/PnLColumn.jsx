    //option strategy
    export const columns4 = ()=> [
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
            name: "Targettype",
            label: "Target Type",
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
            name: "Strike price",
            label: "Strike price",
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
            name: "STG",
            label: "Strategy",
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
            }
        },

    ];

    export const columns5 = ()=> [
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
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Strategy",
            label: "Strategy",
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
            }
        },
        
    ];




    //pattern table
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
            label: "Stoploss",
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
        {
            name: "PnL",
            label: "PnL",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];
    export const columns3 = ()=> [
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
            name: "Symbol",
            label: "Symbol",
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
            name: "TimeFrame",
            label: "Time Frame",
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
            }
        },
    ];


   
    //scalping data table
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
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
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
            name: "PnL",
            label: "PnL",
            options: {
                filter: true,
                sort: true,
            }
        },


    ];
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
            label: "Stoploss",
            options: {
                filter: true,
                sort: true,
            }
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
            name: "PnL",
            label: "PnL",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];
