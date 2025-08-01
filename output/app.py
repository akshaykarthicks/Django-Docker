import gradio as gr
from accounts import Account, get_share_price

account = Account(10000)

def deposit(amount):
    try:
        account.deposit(float(amount))
        return f"Deposited {amount}. New balance: {account.balance}"
    except ValueError as e:
        return str(e)

def withdraw(amount):
    try:
        account.withdraw(float(amount))
        return f"Withdrew {amount}. New balance: {account.balance}"
    except ValueError as e:
        return str(e)

def buy(symbol, quantity, price):
    try:
        account.buy(symbol, int(quantity), float(price))
        return f"Bought {quantity} shares of {symbol} at {price}. New balance: {account.balance}"
    except ValueError as e:
        return str(e)

def sell(symbol, quantity, price):
    try:
        account.sell(symbol, int(quantity), float(price))
        return f"Sold {quantity} shares of {symbol} at {price}. New balance: {account.balance}"
    except ValueError as e:
        return str(e)

def get_portfolio_value():
    return f"Portfolio Value: {account.get_portfolio_value()}"

def get_profit_loss():
    return f"Profit/Loss: {account.get_profit_loss()}"

def get_holdings():
    return f"Holdings: {account.get_holdings()}"

def get_transactions():
    return f"Transactions: {account.get_transactions()}"


with gr.Blocks() as demo:
    gr.Markdown("# Simple Trading Simulation")

    with gr.Tab("Deposit/Withdraw"):
        with gr.Row():
            deposit_amount = gr.Number(label="Deposit Amount")
            deposit_button = gr.Button("Deposit")
            deposit_output = gr.Textbox(label="Output")
        deposit_button.click(fn=deposit, inputs=deposit_amount, outputs=deposit_output)

        with gr.Row():
            withdraw_amount = gr.Number(label="Withdraw Amount")
            withdraw_button = gr.Button("Withdraw")
            withdraw_output = gr.Textbox(label="Output")
        withdraw_button.click(fn=withdraw, inputs=withdraw_amount, outputs=withdraw_output)

    with gr.Tab("Buy/Sell"):
        with gr.Row():
            symbol = gr.Textbox(label="Symbol (AAPL, TSLA, GOOGL)")
            quantity = gr.Number(label="Quantity")
            price = gr.Number(label="Price")
            buy_button = gr.Button("Buy")
            buy_output = gr.Textbox(label="Output")
        buy_button.click(fn=buy, inputs=[symbol, quantity, price], outputs=buy_output)

        with gr.Row():
            symbol_sell = gr.Textbox(label="Symbol (AAPL, TSLA, GOOGL)")
            quantity_sell = gr.Number(label="Quantity")
            price_sell = gr.Number(label="Price")
            sell_button = gr.Button("Sell")
            sell_output = gr.Textbox(label="Output")
        sell_button.click(fn=sell, inputs=[symbol_sell, quantity_sell, price_sell], outputs=sell_output)


    with gr.Tab("Reports"):
        portfolio_value = gr.Button("Portfolio Value")
        portfolio_output = gr.Textbox(label="Output")
        portfolio_value.click(fn=get_portfolio_value, outputs=portfolio_output)

        profit_loss = gr.Button("Profit/Loss")
        profit_loss_output = gr.Textbox(label="Output")
        profit_loss.click(fn=get_profit_loss, outputs=profit_loss_output)

        holdings = gr.Button("Holdings")
        holdings_output = gr.Textbox(label="Output")
        holdings.click(fn=get_holdings, outputs=holdings_output)

        transactions = gr.Button("Transactions")
        transactions_output = gr.Textbox(label="Output")
        transactions.click(fn=get_transactions, outputs=transactions_output)

demo.launch()