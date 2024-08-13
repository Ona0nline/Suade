import requests

def process_payment(token, amount_in_cents):
    headers = {
        'X-Auth-Secret-Key': 'sk_test_4817016d4BRbBvOdbaa4afabf5df'
    }
    data = {
        'token': token,
        'amountInCents': amount_in_cents,
        'currency': 'ZAR'
    }
    response = requests.post('https://online.yoco.com/v1/charges/', headers=headers, json=data)
    return response.json()
