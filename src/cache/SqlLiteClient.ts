//@ts-ignore
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

class SqlLiteClient {
	private module: any = null;
	private _database: any = null;

	// Here we introduce some Flags in order to keep track of some states.
	private debugMode: boolean = false;
	private databaseMode: databaseType = 'temporary';

	private constructor() {}

	public static async initalize(
		config?: SqlLiteClient
	): Promise<SqlLiteClient> {
		const instance = new SqlLiteClient();
		instance.debugMode = config?.debugMode ?? false;
		instance.databaseMode = config?.databaseMode ?? 'temporary';
		instance.initDatabase();
		return instance;
	}

	public get database(): any {
		return this._database;
	}

	private set database(value: any) {
		this._database = value;
	}

	private log(...args: any[]) {
		console.log(...args);
		// TODO: Change mainPre here to something dynamically and make it optional.
		// mainPre!.textContent += `${args.join(' ')}\n`;
	}

	private logError(...args: any[]) {
		console.error(...args);
		// TODO: Change mainPre here to something dynamically and make it optional.
		// mainPre!.textContent += `${args.join(' ')}\n`;
	}

	private async initDatabase(): Promise<void> {
		this.log('Attempting to start and initializing the WASM module');
		if (this.databaseMode === 'persistent') {
			// TODO: Introduce persistent database initialization.
			await this.initPersistentDatabase();
		} else {
			await this.initTemporaryDatabase();
		}
		this.log('Done initializing');
	}

	private async initPersistentDatabase(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	private async initTemporaryDatabase(): Promise<void> {
		this.module = await sqlite3InitModule({
			print: this.log,
			printErr: this.logError,
		})
			.then((sqlite3: any) => {
				return sqlite3;
			})
			.catch((err: any) => {
				throw Error(err);
			});
		this.database = new this.module.oo1.DB('/cacheDB.sqlite3', 'ct');
	}
}

type databaseType = 'persistent' | 'temporary';

interface SqlLiteClientType {
	databaseMode?: databaseType;
	enalbleLogging?: boolean;
}

export default SqlLiteClient;
