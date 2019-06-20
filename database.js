import { MongoClient } from 'mongodb';
import appConfig from './config/config';

const { dbName, dbUserName, dbPassword, dbPort } = appConfig;
const dbUrl = `mongodb://${dbUserName}:${dbPassword}@ds335957.mlab.com:${dbPort}/${dbName}`;


export default class {
    constructor() {
        this.dbInstance = null;
        this.database = null;
    }
    async createConnection() {
        try {
            this.dbInstance = await MongoClient.connect(dbUrl);
            if (this.dbInstance.isConnected()) {
                console.log('created connection successfully');
            }
        }
        catch (e) {
            console.log('error while creating connection',e);
            throw new Error('unable to create connection with database');
        }
    }
    async connectToDatabase() {
        try {
            this.database = await this.dbInstance.db(dbName);
            if (this.database) {
                console.log('connected to database successfully');
            }
        }
        catch (e) {
            throw new Error('unable to connect to database');
        }
    }
    async insertRecords(collectionName=null, query = {}) {
        try {
            const { database } = this;
            return await database.collection(collectionName).insertOne(query);
            
        } catch (e) {
            console.error(e);
            throw new Error('failed to insert record');
        }
    }
    async findRecords(tableName = null, query = {}) {
        const { database } = this;
        return database.collection(tableName).find(query).toArray();
    }
}

