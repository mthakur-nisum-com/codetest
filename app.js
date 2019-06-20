import express from 'express';
import { nextSetUpConfig, handle } from './config/appSetUp';
import appConfig from './config/config';
import dbInstance from './database';
import bodyParser from 'body-parser';
class App {
    constructor() {
        this.appStatus = null;
        this.app = null;
        this.dbInstance = new dbInstance();
    }
    async initalizeApp() {
        try {
            const result = await nextSetUpConfig();
            this.appStatus = result.nextSetUpConfig;
            this.nextApp = result.nextApp;
        }
        catch (e) {
            console.error('error while initializing application');
            throw new Error("couldn't initialize the server");
        }
    }
    async initializePort() {
        const { appPort } = appConfig;
        const port = process.env.port || appPort;
        const { app, dbInstance} = this;
        try {
            await app.listen(port);
            await dbInstance.createConnection();
            await dbInstance.connectToDatabase();
            console.log(`listening to port ${port}`);
        }
        catch (e) {
            console.error('something went wrong');
            throw new Error('something went wrong');
        }
    }
    fomratTransactionRecords(records) {
        const resultSet = [];
        records.forEach(({ transactionId, transactionAmount, transactiontype, transactionDoneBy, userId}) => {
            resultSet.push({
                transactionId: transactionId,
                transactionAmount: transactionAmount,
                transactiontype: transactiontype,
                transactionDoneBy: transactionDoneBy,
                userId: userId
            })
        });
        return resultSet;

    }
    initalizeRoute() {
        const { app, dbInstance } = this;
        app.get('/users', async (req, res) => {
            try {
                const result = await dbInstance.findRecords('users');
                const userList = [];
                if (result.length) {
                    result.forEach(({ id, userName, userId }) => userList.push({ id: id, userName: userName, userId: userId }))
                }
                res.json({ userList: userList });
            }
            catch (e) {
                console.log('error while getting records');
                res.sendStatus(500).send({ error: 'unable to process request at this time' });
            }
        });
        app.get('/transactionTypes', async (req, res) => {
            try {
                const result = await dbInstance.findRecords('transactionTypes');
                const resultSet = [];
                if (result.length) {
                    result.forEach(({ transactionTypeId, transactiontype }) => resultSet.push({ id: transactionTypeId, transactiontype: transactiontype }));
                }
                res.json({ transactionTypeList: resultSet });
            } catch (e) {
                console.log('error while getting records');
                res.sendStatus(500).send({ error: 'unable to process request at this time' });
            }
        });
        app.get('/transactions', async (req, res) => {
            try {
                const result = await dbInstance.findRecords('transactions');
                let transactions = [];
                if (result.length) {
                    transactions = this.fomratTransactionRecords(result);
                    res.send({ transactions: transactions } )
                }

            } catch (e) {
                res.sendStatus(500);
            }
        });
        app.post('/transactions', async (req, res) => {

            const { body: { transactionAmount, transactionType: { transactiontype }, userId, userName } } = req;
            try {
                
                let result = await dbInstance.findRecords('transactions');
                let transactionObj = {
                    transactionId: ++result.length,
                    transactionAmount: transactionAmount,
                    transactiontype: transactiontype,
                    transactionDoneBy: userName,
                    userId: userId
                };
                result = await dbInstance.insertRecords('transactions', transactionObj);
                if (result.insertedCount) {
                    result = await dbInstance.findRecords('transactions');
                    let transactions = [];
                    if (result.length) {
                        transactions = this.fomratTransactionRecords(result);
                        res.send({ transactions: transactions });
                    }
                    
                }
               
            } catch (e) {
                res.sendStatus(500).send({ error: 'unable to process request' });
            }
            
        });
        app.get('*',(req, res) => handle(req, res));
        
    }
    async startApplication() {
        try {
            await this.initalizeApp();
            if (this.appStatus) {
                this.app = express();
                this.app.use(bodyParser());
                await this.initializePort();
                this.initalizeRoute();
            }
        }
        catch (e) {
            console.log('something went wrong');
        }
        
    }
}

const myApp = new App();
myApp.startApplication();