import AzureTables, {odata} from '@azure/data-tables';

export const getAll = (tableName) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    return tableClient.listEntities();
}

export const getByPartitionKey = (tableName, partitionKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});

    return tableClient.listEntities({
        queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
    });
}

export const getOne = async (tableName, partitionKey, rowKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});

    return await tableClient.getEntity(partitionKey, rowKey);
}