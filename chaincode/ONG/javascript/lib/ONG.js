/*
 * SPDX-License-Identifier: Apache-2.0
 peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n ONG -c '{"Args":["createCar","2","2","2","2","2"]}'
 
peer chaincode install -n ONG -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/ONG/javascript
peer chaincode instantiate -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n ONG -l node -v 1.0 -c '{"Args":["initLedger"]}' -P 'AND ('\''Org1MSP.peer'\'')'
peer chaincode query -C mychannel -n ONG -c '{"Args":["queryCar","CAR1"]}'
fabric-ca-client identity add user1 --json '{"secret": "user1pw", "type": "client", "affiliation": "org1", "max_enrollments": 1, "attrs": [{"name": "hf.Revoker", "value": "true"}]}'

 https://stackoverflow.com/questions/50144119/fabric-docker-image-version-of-1-1-0-alpha-does-not-match-this-newer-version-of
 sudo bash -m down
 sudo bash generate -o etcdraft
 sudo bash -m up
  */
'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {
    //transform
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                id_sending :'1',
                id_receiving:'1',
                amountr:'10',
                date:'24/01/202020',
                type: '1',
            },
            
        ];

        for (let i = 0; i < cars.length; i++) {
//            cars[i].docType = 'car';
            await ctx.stub.putState('DONATION' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryDonationBySender(ctx, id_sender) {
        const donationAsBytes = await ctx.stub.getState(donation); // get the car from chaincode state
        if (!donationAsBytes || donationAsBytes.length === 0) {
            throw new Error(`${donation} does not exist`);
        }
        console.log(donationAsBytes.toString());
        return donationAsBytes.toString();
    }

    async queryDonationByReceiver(ctx, donation) {
        const donationAsBytes = await ctx.stub.getState(donation); // get the car from chaincode state
        if (!donationAsBytes || donationAsBytes.length === 0) {
            throw new Error(`${donation} does not exist`);
        }
        console.log(donationAsBytes.toString());
        return donationAsBytes.toString();
    }

 
//Transform
    async createDonation(ctx, key,id_sending, id_receiving, amount, date, type) {
        console.info('============= START : Create Car ===========');

        const donation = {
            id_sending,
            id_receiving,
            amount,
            date,
            type,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(donation)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllDonations(ctx) {
        const startKey = 'DONATION0';
        const endKey = 'DONATION999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
//WIll be the change status of donation
   /* async changeStatusDonation(ctx, idDonation, newStatus) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }*/

}

module.exports = FabCar;
