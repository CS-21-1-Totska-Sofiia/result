import AzureStorageQueue from '@azure/storage-queue';


export const send = async (entityData) => {
    console.log(entityData);
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
    const queueName = 'convert-messages';
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(entityData));
    console.log(
        `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
      );
}