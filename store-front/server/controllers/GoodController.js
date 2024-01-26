import * as AzureEntityService from '../services/AzureEntityService.js';

export const getByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const entitiesIter = AzureEntityService.getByPartitionKey('goods', category);
        const entities = [];
        for await (const entity of entitiesIter) {
            entities.push(entity);
        }
        res.status(200).json(entities);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to get categories"});
    }
}

export const getOne = async (req, res) => {
    try {
        const partitionKey = req.params.partitionKey;
        const rowKey = req.params.rowKey;
        const entity = await AzureEntityService.getOne('goods', partitionKey, rowKey);
        res.status(200).json(entity);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to get categories"});
    }
}