import AzureTables from '@azure/data-tables';

export const update = async (tableName, partitionKey, rowKey, newData, mergeMode=true) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING, tableName, {allowInsecureConnection: true});
    const entity = {
        partitionKey,
        rowKey,
        ...newData
    };
    await tableClient.updateEntity(entity, mergeMode ? "Merge" : "Replace");
}