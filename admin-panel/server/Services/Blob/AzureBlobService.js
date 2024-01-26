import AzureStorageBlob from '@azure/storage-blob';


export const upload = async (buffer, bufferSize, fileName) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
    
    const containerName = "images";

    const containerClient = blobClient.getContainerClient(containerName);

    const blobName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(buffer, bufferSize);

    return blockBlobClient.url;
}

export const deleteBlob = async (url) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
    
    const containerName = "images";
    const blobName = url.split('/').pop();
    console.log(blobName);

    const containerClient = blobClient.getContainerClient(containerName);
    await containerClient.deleteBlob(blobName);
}