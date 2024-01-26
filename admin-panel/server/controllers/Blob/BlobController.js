import * as AzureBlobService from '../../Services/Blob/AzureBlobService.js';
import * as AzureContainerService from '../../Services/Blob/AzureContainerService.js';

export const create = async (req, res) => {
    const uploadedFiles = req.files;
    const urls = [];
    try {
        for (let i = 0; i < uploadedFiles.length; i++) {
            const url = await AzureBlobService.upload(uploadedFiles[i].buffer, uploadedFiles[i].size, uploadedFiles[i].originalname);
            urls.push({url});
        }
        res.status(200).json(urls);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "error"});
    }
}

export const deleteBlob = async (req, res) => {
    const url = req.body.url;
    console.log(url);
    try {
        await AzureBlobService.deleteBlob(url);
        res.status(200).json({msg: "Deleted blob"});
    } catch (error) {
        res.status(500).json({msg: "Failed to delete blob"});
    }
}
