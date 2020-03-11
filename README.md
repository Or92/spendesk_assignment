### Installation:
```sh
    git clone https://github.com/Or92/spendesk_assignment.git
    cd spendesk_assignment
    npm i
    node index.js
```

> Because of the fact that I didnt have 4 hours to complete the assignment I focused about the card api, but we can go through everything together and I can explain.

### Tech that should be used:
* schema are known, hence we have to use SQL
* for demonstration purposes the data structure i used is as follows:
  > { organization: [ { org_id : [ user_id ]}], user:[ { user_id: { wallet: [], card: [] } } ] }

  > the initiate state of the data structure can be found in index.js and this is its value: 

    > {
    organization: [
        { '123': [2] },
    ],
    user: [{
        '2': {
            wallet: [{ id: 6, currency: 'EUR', balance: 0, }, { id: 5, currency: 'USD', balance: 100, },
            card: []
        }
    }],
}

### Docs (for the existing api):
base url: `http://localhost:1337`


#### HEADERS (should be attached to every request):
* UserId
* CompanyId
  
#### create card:
```
PATH: POST /card/create
```
```
PARAMS: 
wallet_id: string
currency: string ('USD', 'EUR', 'GBP')
```
##### response
```
{"data":{"uid":"7ab2a90a-38ff-4f1c-bcee-d21b4d6b733c","wallet_id":"5","currency":"USD","current_balance":0,"gid":"174423f3-2c70-4af2-8417-491a3d29d0c2","exp":"03/23","ccv":"971","user_id":"2","status":1}}
```

##### example
```
curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/create --data '{"wallet_id":"5", "currency":"USD"}' 
```

#### fund card:
```
PATH: POST /card/fund
```
```
PARAMS: 
wallet_id: string
card_id: string
amount: number
```
##### response
```
{"success":true}
```

##### example
```
curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/fund --data '{"wallet_id":"5", "card_id":"47d2b941-a7ea-40ad-89ad-ee409fd42545", "amount": 12}'
```

#### fund card:
```
PATH: POST /card/status
```
```
PARAMS: 
status: string ('BLOCK', 'ACTIVE')
card_id: string
```
##### response
```
{"success":true}
```

##### example
```
curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/status --data '{"status":"BLOCK", "card_id":"47d2b941-a7ea-40ad-89ad-ee409fd42545"}'
```

#### fund card:
```
PATH: GET /card
```

##### response
```
{"success":true,"data":[{"card_id":"47d2b941-a7ea-40ad-89ad-ee409fd42545","wallet_id":"5","currency":"USD","balance":12,"gid":"f96f0d95-2e57-4eee-aef7-ce5ead9df804","exp":"03/23","ccv":"5410","user_id":"2","status":"ACTIVE"},{"card_id":"3a972cda-35aa-49a9-8cf7-bbe6be84e0aa","wallet_id":"5","currency"
:"USD","balance":0,"gid":"07bc39e8-5bb0-4454-8c9a-8dd754972d5a","exp":"03/23","ccv":"298","user_id":"2","status":"ACTIVE"}]}
```

##### example
```
curl -X GET -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card
```