import AzureStorageBlob from '@azure/storage-blob';


export const createContainerIfNotExists = async (containerName, accessLevel="container") => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);

    const containerClient = blobClient.getContainerClient(containerName);

    await containerClient.createIfNotExists({access: accessLevel});
}

export const deleteContainer = async (name) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);

    const containerName = name;
    const containerClient = blobClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.delete();
}