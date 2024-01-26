import { defineStore } from 'pinia';

const HOST = import.meta.env.VITE_ADMIN_PANEL_URL;

export const useCategoryStore = defineStore('category', {
    state: () => ({
        allCategories: [],
        isEntityCreated: 'pending',
        isEntityUpdated: 'pending',
        isEntityDeleted: 'pending',
    }),

    actions: {
        async getAllCategories() {
            this.allCategories = [];
            const data = await fetch(`${HOST}/categories/allEntities`);
            const dataJson = await data.json();
            this.allCategories = dataJson.data;
        },
        async postCategory(name, parentCategory) {
            this.isEntityCreated = 'pending';
            const result = await fetch(`${HOST}/categories/entity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, parentCategory: parentCategory ? parentCategory : 'root'}),
            });
            if (result.status == 200)
                this.isEntityCreated = 'fulfilled';
            else this.isEntityCreated = 'rejected';
            console.log(await result.json());
        },
        async patchCategory(oldCategory, newName, newParentCategory) {
            const result = await fetch(`${HOST}/categories/entity?partitionKey=${oldCategory.partitionKey}&rowKey=${oldCategory.rowKey}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName ? newName : oldCategory.name, 
                    parentCategory: newParentCategory ? newParentCategory : oldCategory.parentCategory
                }),
            });

            if (result.status == 200)
                this.isEntityUpdated = 'fulfilled';
            else
                this.isEntityUpdated = 'rejected';
        },
        async deleteCategory(partitionKey, rowKey) {
            this.isEntityDeleted = 'pending';
            const result = await fetch(`${HOST}/categories/entity?partitionKey=${partitionKey}&rowKey=${rowKey}`, {
                method: 'DELETE',
            });
            if (result.status == 200)
                this.isEntityDeleted = 'fulfilled';
            else
                this.isEntityDeleted = 'rejected';
        },
    }
});
