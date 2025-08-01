def get_share_price(symbol):
    """Returns the current price of a share for a given symbol.

    Args:
        symbol: str, the stock symbol.

    Returns:
        float, the current price of the share.  Returns None if the symbol is unknown.

    Raises:
        ValueError: If the symbol is invalid.
    """
    #Test implementation
    prices = {"AAPL": 150.0, "TSLA": 1000.0, "GOOGL": 2500.0}
    if symbol in prices:
        return prices[symbol]
    else:
        return None

class Account:
    def __init__(self, initial_deposit=0.0):
        self.balance = initial_deposit
        self.holdings = {}
        self.transactions = []
        self.initial_deposit = initial_deposit

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.transactions.append({"type": "deposit", "amount": amount})
        else:
            raise ValueError("Amount must be positive.")

    def withdraw(self, amount):
        if amount > 0 and self.balance - amount >= 0:
            self.balance -= amount
            self.transactions.append({"type": "withdrawal", "amount": -amount})
        else:
            raise ValueError("Insufficient funds.")

    def buy(self, symbol, quantity, price):
        if quantity > 0 and price > 0 and self.balance >= quantity * price:
            self.balance -= quantity * price
            self.holdings[symbol] = self.holdings.get(symbol, 0) + quantity
            self.transactions.append({"type": "buy", "symbol": symbol, "quantity": quantity, "price": price, "amount": -quantity * price})
        else:
            raise ValueError("Cannot afford purchase or invalid quantity/price.")

    def sell(self, symbol, quantity, price):
        if quantity > 0 and price > 0 and self.holdings.get(symbol, 0) >= quantity:
            self.balance += quantity * price
            self.holdings[symbol] -= quantity
            if self.holdings[symbol] == 0:
                del self.holdings[symbol]
            self.transactions.append({"type": "sell", "symbol": symbol, "quantity": -quantity, "price": price, "amount": quantity * price})
        else:
            raise ValueError("Insufficient shares or invalid quantity/price.")

    def get_portfolio_value(self):
        value = self.balance
        for symbol, quantity in self.holdings.items():
            price = get_share_price(symbol)
            if price is not None:
                value += quantity * price
        return value

    def get_profit_loss(self):
        return self.get_portfolio_value() - self.initial_deposit

    def get_holdings(self):
        return self.holdings

    def get_transactions(self):
        return self.transactions