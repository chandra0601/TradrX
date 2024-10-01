import React from 'react'

const DiscriptionData = ({ Type }) => {
    return (
        <div>
            {Type == 'Scalping' ? <p>
                Scalping is a web application that functions as an intermediary platform between investors and the stock market. Its primary purpose is to facilitate the buying and selling of stocks for investors. The term Scalping refers to a trading strategy in which traders buy and sell stocks quickly, seeking to make small profits on each trade. Scalping offers various convenient features for investors to buy and sell stocks.
            </p> : Type == 'Option' ? <p>
                Unlock the potential of options trading with the revolutionary Option Strategy Application. Designed to simplify and automate the execution of option strategies, our application empowers traders with convenience and efficiency.Automated Option Strategies: Say goodbye to manual execution and let our application handle it for you. With 20 pre-built option strategies at your fingertips, you can easily select and execute the strategies that align with your trading goals and risk appetite.
            </p> : <p>
                The Candlestick Pattern Application is a powerful tool designed for market research and trading analysis through the observation of chart and candlestick patterns. This application employs historical price data to identify various candlestick patterns, such as doji, hammer, engulfing, and more, within different timeframes.The applications main objective is to assist traders and researchers in gaining insights into market trends, potential reversals, and momentum shifts. It automatically detects and highlights candlestick patterns on price charts, enabling users to quickly spot key formations that often signify significant price movements.
            </p>
            }
            <h4>Profile</h4>
            <p>Profile contains all your personal information which you enter while signing up an account including Mobile number, Email address and selected Broker. You can also change your account password on Profile page.</p>
            <h4>Broker Credentials</h4>
            In order to buy or sell stocks using the Trading web application, users can fill in the necessary broker credentials to facilitate the transaction.
            <p>1. User can select a broker.</p>
            <p>2. User can fill in the broker username.</p>
            <p>3. User can fill App api key.</p>
            <p>4. Then continue trading.</p>

            <h4>Add Script Parameter</h4>
            {/* {Type == 'Scalping' ? } */}
            <p>Scalping: <br />
                Add script parameter refers to a set of instructions or rules that are used to automate the process of placing trades on the stock market.
                Scalping applications typically offer a range of convenient features customised specifically for scalping trades. Following are the scalping types this application provides.
                <p>Single script:</p>
                In a single script, users can choose a measurement type (percentage or points) to set their booking and re-entry points. If users opt for the percentage measurement, users establish these points based on a percentage of the asset's price. With the point measurement, they use fixed points.

                <p> Fixed price:</p>
                In the fixed price feature, users can set the specific price at which they want to buy or sell an asset. Additionally, they have the option to set an entry range around that fixed price. If the market price falls within that range, the software will automatically execute the trade.
                One directional:
                <p>In a One directional</p>
                <p>In a One directional, users can choose a measurement type (percentage or points) to set their Fixed point and Target points.</p>
                <p> When using this strategy, if a user sets a Fixed point and Target point, the software will continuously average the position according to the Target point. However, if the market price reaches the Fixed point, the software will exit all positions at that specific point.</p>
                <p>Following are the steps on how to add script:</p>
                1. User can select market options then their respective Instrument(if any). Following further
                options like Symbol type, Expiry date, Option type, Strike price and so on. <br />
                2. User can select buy or sell option as per the preference of user. <br />
                3. Then user can set the value of booking and re-entry point in percentage or points.<br />
                4. Enter the quantity of stocks users are willing to buy or sell in any particular trade.<br />
                5. Select Trade execution which has two options, Paper trade and Live trade. (Paper trade is basically is the trading without investing and risking real money. And live trade is trading with investing real money in the stock market).<br />
                6. Then user can set lowest price and highest price between which user is expecting to Hold or Exit the trade.</p><br />
            <h4>Update Script Parameter</h4>
            <p>Update script is a feature that allows users to modify or change the information they previously filled in.
                <br />
                1. User can change script details as per user’s requirements. <br />
                2. Update it by clicking on the Submit button.</p>
            <h4>Discontinue Trading</h4>
            <p>The option allows the user to select a specific trading symbol and stop the trading activity associated with it. When a user discontinues any particular script then the opened positions of that script will be closed.<br />
                1. User can select the trade symbol that user is tring to discontinue.<br />
                2. User can click on Submit button and the trade will be discontinued.</p>
            <h4>Continue Trading</h4>
            <p>This option allows users to resume trading that has been previously discontinued.
                <br />
                1. User can select the trade symbol that user is tring to continue. <br />
                2. User can click on Submit button and the trade will be continued.</p>
            <h4>Square Off</h4>
            <p>This feature allows users to permanently delete any particular trade from the software.</p>
            <h4>Trading Report</h4>
            <p>Scalping web application has a feature that allows users to generate a report of all the trading they have done.</p>
            <h4>Trading History</h4>
            <p>Trading history shows the history of all the trade including entry and exit price of the trade, the profit and loss and also cumulative profit and loss.</p>
            <h4>Trade Response</h4>
            <p>This feature provides you with clear responses from your broker, confirming the completion or status of your trade.</p>
        </div>
    )
}

export default DiscriptionData