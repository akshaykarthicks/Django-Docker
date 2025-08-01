import unittest
from accounts import Account, get_share_price

class TestGetSharePrice(unittest.TestCase):
    def test_valid_symbol(self):
        self.assertEqual(get_share_price('AAPL'), 150.0)

    def test_invalid_symbol(self):
        self.assertIsNone(get_share_price('MSFT'))

    def test_invalid_symbol_type(self):
        with self.assertRaises(TypeError):
            get_share_price(123)

class TestAccount(unittest.TestCase):
    def test_deposit(self):
        account = Account()
        account.deposit(100)
        self.assertEqual(account.balance, 100)
        self.assertEqual(len(account.transactions), 1)
        self.assertEqual(account.transactions[0], {'type': 'deposit', 'amount': 100})

    def test_deposit_negative(self):
        account = Account()
        with self.assertRaises(ValueError):
            account.deposit(-100)

    def test_withdraw(self):
        account = Account(100)
        account.withdraw(50)
        self.assertEqual(account.balance, 50)
        self.assertEqual(len(account.transactions), 1)
        self.assertEqual(account.transactions[0], {'type': 'withdrawal', 'amount': -50})

    def test_withdraw_insufficient_funds(self):
        account = Account(100)
        with self.assertRaises(ValueError):
            account.withdraw(150)

    def test_buy(self):
        account = Account(15000)
        account.buy('AAPL', 100, 150)
        self.assertEqual(account.balance, 0)
        self.assertEqual(account.holdings['AAPL'], 100)
        self.assertEqual(len(account.transactions), 1)
        self.assertEqual(account.transactions[0], {'type': 'buy', 'symbol': 'AAPL', 'quantity': 100, 'price': 150, 'amount': -15000})

    def test_buy_insufficient_funds(self):
        account = Account(100)
        with self.assertRaises(ValueError):
            account.buy('AAPL', 100, 150)

    def test_sell(self):
        account = Account()
        account.holdings['AAPL'] = 100
        account.sell('AAPL', 50, 150)
        self.assertEqual(account.balance, 7500)
        self.assertEqual(account.holdings['AAPL'], 50)
        self.assertEqual(len(account.transactions), 1)
        self.assertEqual(account.transactions[0], {'type': 'sell', 'symbol': 'AAPL', 'quantity': -50, 'price': 150, 'amount': 7500})

    def test_sell_insufficient_shares(self):
        account = Account()
        account.holdings['AAPL'] = 50
        with self.assertRaises(ValueError):
            account.sell('AAPL', 100, 150)

    def test_get_portfolio_value(self):
        account = Account()
        account.holdings['AAPL'] = 100
        account.holdings['TSLA'] = 50
        self.assertEqual(account.get_portfolio_value(), 65000)

    def test_get_profit_loss(self):
        account = Account(1000)
        account.holdings['AAPL'] = 100
        account.holdings['TSLA'] = 50
        self.assertEqual(account.get_profit_loss(), 64000)

    def test_get_holdings(self):
        account = Account()
        account.holdings['AAPL'] = 100
        self.assertEqual(account.get_holdings(), {'AAPL': 100})

    def test_get_transactions(self):
        account = Account()
        account.deposit(100)
        self.assertEqual(account.get_transactions(), [{'type': 'deposit', 'amount': 100}])

if __name__ == '__main__':
    unittest.main()