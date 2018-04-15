#!/usr/bin/env python3
# Simple script to enter fake random data.

import json, random, string
from urllib import request, parse

#URL='http://34.240.11.31/api/txn'
URL='http://localhost:8080/api/txn'

NUM_REQ=30

COUNTRIES = ['AU', 'IT', 'FR', 'IE', 'US', 'DE', 'SY', 'CF', 'CN', 'RU', 'DK', 'EG', 'BR']
CURRENCY = ['EUR', 'GBP', 'USD', 'CNY', 'AUD', 'CHF', 'BRL']


def build_rnd_req():
    userid = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    country = random.choice(COUNTRIES)
    currency_from = random.choice(CURRENCY)
    while True:
        currency_to = random.choice(CURRENCY)
        if (currency_to != currency_from):
            break;   
    
    return {"userId": userid, 
        "currencyFrom": currency_from, 
        "currencyTo": currency_to, 
        "amountSell": round(random.uniform(1, 100), 2),
        "amountBuy": round(random.uniform(1, 100), 2), 
        "rate": round(random.uniform(1, 5), 3), 
        "originatingCountry": country}
    
    
if __name__=='__main__':
    for _ in range(NUM_REQ):
        payload = str(json.dumps(build_rnd_req())).encode('utf-8')
        #print(payload)
        req = request.Request(URL, data=payload)
        req.add_header('Content-Type', 'application/json')
        response = request.urlopen(req)
        print(response.read().decode())
