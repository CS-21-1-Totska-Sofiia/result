import Jimp from 'jimp';
import * as AzureQueueService from './Services/AzureQueueService.js';
import * as AzureBlobService from './Services/AzureBlobService.js';
import * as AzureEntityService from './Services/AzureEntityService.js';

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();


const thumbnailSize = 64;

AzureQueueService.createQueueIfNotExists(process.env.QUEUE_NAME);

while (true) {
    const response = await AzureQueueService.getMessage(process.env.QUEUE_NAME);
    if (response.receivedMessageItems.length == 1) {
        let dataJson = JSON.parse(response.receivedMessageItems[0].messageText);
        const blobName = dataJson.imgUrl.split('/').pop();
        console.log(blobName);
        const fname = await AzureBlobService.download(blobName);


        const outputImagePath = `./static/${fname}`;
        const targetSize = 64; 

        await Jimp.read(fname)
            .then(image => image.resize(targetSize, targetSize).writeAsync(outputImagePath))
            .catch(err => console.error(err));

        const imageBuffer = fs.readFileSync(outputImagePath);

        const newUrl = await AzureBlobService.upload(imageBuffer, imageBuffer.length, 'thumbnail'+blobName);
        await AzureEntityService.update('goods', dataJson.partitionKey, dataJson.rowKey, {thumbImgUrl: newUrl});
        await AzureQueueService.deleteMessage(process.env.QUEUE_NAME, response.receivedMessageItems[0].messageId, response.receivedMessageItems[0].popReceipt);
        fs.unlinkSync(fname, (err) => { 
            if (err)
                console.log(err)
        });
        fs.unlinkSync(outputImagePath, (err) => { 
            if (err)
                console.log(err)
        });
    }
}
