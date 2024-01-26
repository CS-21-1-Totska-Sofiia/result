import AzureTables from '@azure/data-tables';



export const createTableIfNotExists = async (tableName) => {
    const serviceClient = AzureTables.TableServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, {allowInsecureConnection: true});
    console.log(process.env.AZURE_CONNECTION_STRING);
    const tablesIter = serviceClient.listTables();
    const tables = [];
    for await (const table of tablesIter) {
        tables.push(table);
    }
    if (!tables.some(table => table.name === tableName))
    await serviceClient.createTable(tableName);
}

export const deleteTable = async (tableName) => {
    const serviceClient = AzureTables.TableServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, {allowInsecureConnection: true});
    await serviceClient.deleteTable(tableName);
}