import * as AzureTableService from '../Services/Table/AzureTableService.js';
import * as AzureContainerService from '../Services/Blob/AzureContainerService.js';


export const setup = async () => {
    await AzureTableService.createTableIfNotExists('categories');
    await AzureTableService.createTableIfNotExists('goods');
    
    await AzureContainerService.createContainerIfNotExists('images', "blob");
}
