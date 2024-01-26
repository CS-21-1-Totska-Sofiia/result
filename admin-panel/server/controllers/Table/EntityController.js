import * as AzureEntityService from '../../Services/Table/AzureEntityService.js';
import * as AzureQueueService from '../../Services/Queue/AzureQueueService.js';
import { generateKey } from '../../utils/generateKeys.js';


export const getAll = async (req, res) => {
    const tableName = req.params.tableName;


    const result = [];

    try {
        const entitiesIter = AzureEntityService.getAll(tableName);
        for await (const entity of entitiesIter) {
            result.push(entity);
        }
        res.status(200).json({data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error"});
    }
}


export const createEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const dataObj = req.body;

    let partitionKey = '';
    if (tableName == 'categories')
        partitionKey = 'category';
    else if (tableName == 'goods')
        partitionKey = dataObj.category;

    let rowKey = generateKey()
    try {
        await AzureEntityService.create(tableName, partitionKey, rowKey, dataObj);
        if (tableName == 'goods') {
            AzureQueueService.send({partitionKey, rowKey, imgUrl: dataObj.imgUrl});
        }
        res.status(200).json({msg: "Created entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to create entity"});
    }
}

export const editEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;
    const newDataObj = req.body;
    
    try {
        const oldEntity = await AzureEntityService.getOne(tableName, partitionKey, rowKey);
        if (tableName == 'goods' && oldEntity.category != newDataObj.category) {
            await AzureEntityService.deleteEntity(tableName, partitionKey, rowKey);
            const newPartitionKey = newDataObj.category;
            const newRowKey = generateKey();
            await AzureEntityService.create(tableName, newPartitionKey, newRowKey, newDataObj);
            AzureQueueService.send({partitionKey: newPartitionKey, rowKey: newRowKey, imgUrl: newDataObj.imgUrl});
        }
        else {
            await AzureEntityService.update(tableName, partitionKey, rowKey, newDataObj, false);
            if (tableName == 'goods')
                AzureQueueService.send({partitionKey, rowKey, imgUrl: newDataObj.imgUrl});
        }
        res.status(200).json({msg: "Updated entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to update entity"});
    }
}

export const deleteEntity = async (req, res) => {
    const tableName = req.params.tableName;
    const partitionKey = req.query.partitionKey;
    const rowKey = req.query.rowKey;

    try {
        await AzureEntityService.deleteEntity(tableName, partitionKey, rowKey);
        res.status(200).json({msg: "Deleted entity"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to delete entity"});
    }
}