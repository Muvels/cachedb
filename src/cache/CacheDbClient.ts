import SqlLiteClient from './SqlLiteClient';

class CacheDbClient {
	SqlService: SqlLiteClient;
	private constructor(SqlLiteClient: SqlLiteClient) {
		this.SqlService = SqlLiteClient;
	}

	public static async initalize(
		config?: SqlLiteClient
	): Promise<CacheDbClient> {
		const instance = new CacheDbClient(await SqlLiteClient.initalize(config));
		return instance;
	}

	private createTable(config: createTable): void {}
}

interface createTable {
	name: string;
	columns: string[];
}
