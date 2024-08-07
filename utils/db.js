// utils/db.js
import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        this.uri = `mongodb://${host}:${port}`;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = this.client.db(database);
        this.isConnected = false;

        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.isConnected = true;
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            this.isConnected = false;
        }
    }

    isAlive() {
        return this.isConnected;
    }

    async nbUsers() {
        try {
            const usersCollection = this.db.collection('users');
            const count = await usersCollection.countDocuments();
            return count;
        } catch (err) {
            console.error('Error counting users:', err);
            return 0;
        }
    }

    async nbFiles() {
        try {
            const filesCollection = this.db.collection('files');
            const count = await filesCollection.countDocuments();
            return count;
        } catch (err) {
            console.error('Error counting files:', err);
            return 0;
        }
    }
}

const dbClient = new DBClient();
export default dbClient;
