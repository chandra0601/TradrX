
// Technical Pattern Column
export const columns = ()=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1
        }
    },
    {
        name: "Pattern",
        label: "Pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trend before pattern",
        label: "Trend before pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Previous trend price",
        label: "Previous trend price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Start Time",
        label: "Start Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Start Price",
        label: "Start Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "End Time",
        label: "End Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "End Price",
        label: "End Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "After trend price",
        label: "After trend price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trend after pattern",
        label: "Trend after pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
];
export const columns1 =()=> [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1
        }
    },
    {
        name: "_id",
        label: "Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "open",
        label: "open",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "close",
        label: "close",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "high",
        label: "high",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "low",
        label: "low",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreOpen",
        label: "PreOpen",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreHigh",
        label: "PreHigh",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreLow",
        label: "PreLow",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreClose",
        label: "PreClose",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreOpen2",
        label: "PreOpen2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PreHigh2",
        label: "PreHigh2",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "PreLow2",
        label: "PreLow2",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "PreClose2",
        label: "PreClose2",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "PreOpen3",
        label: "PreOpen3",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "PreLow3",
        label: "PreLow3",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "PreClose3",
        label: "PreClose3",
        options: {
            filter: true,
            sort: true,
        }
    }, {
        name: "total",
        label: "total",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    }, {
        name: "body_length",
        label: "Body Length",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    }, {
        name: "upper_shadow",
        label: "Upper Shadow",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    }, {
        name: "lower_shadow",
        label: "Lower Shadow",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    }, {
        name: "Pattern",
        label: "Pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
];



// Last Pattern Column
export const columns2 = () => [
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
        name: "Date",
        label: "Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern",
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
        name: "pattern",
        label: "pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "start_pattern",
        label: "start pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "End_pattern",
        label: "End pattern",
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
];