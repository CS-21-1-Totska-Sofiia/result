import AzureTables from '@azure/data-tables';


export const create = async (tableName, partitionKey, rowKey, data) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    await tableClient.createEntity({
        partitionKey,
        rowKey,
        ...data
    });
}

export const getAll = (tableName) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    return tableClient.listEntities();
}

export const getOne = async (tableName, partitionKey, rowKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    return await tableClient.getEntity(partitionKey, rowKey);
}

export const update = async (tableName, partitionKey, rowKey, newData, mergeMode=true) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    const entity = {
        partitionKey,
        rowKey,
        ...newData
    };
    await tableClient.updateEntity(entity, mergeMode ? "Merge" : "Replace");
}

export const deleteEntity = async (tableName, partitionKey, rowKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    await tableClient.deleteEntity(partitionKey, rowKey);
}