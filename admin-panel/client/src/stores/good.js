import { defineStore } from 'pinia';

const HOST = import.meta.env.VITE_ADMIN_PANEL_URL;

export const useGoodStore = defineStore('good', {
    state: () => ({
        allGoods: {},
        isEntityCreated: 'pending',
        isEntityUpdated: 'pending',
        isEntityDeleted: 'pending',
    }),

    actions: {
        async getAllGoods() {
            this.allGoods = [];
            const data = await fetch(`${HOST}/goods/allEntities`);
            const dataJson = await data.json();
            this.allGoods = dataJson.data;
        },
        async postGood(name, price, category, imgFormData) {
            this.isEntityCreated = 'pending';
            const imgRes = await fetch(`${HOST}/upload`, {method: 'POST', body: imgFormData});
            let imgUrl = (await imgRes.json())[0].url;

            const result = await fetch(`${HOST}/goods/entity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, price, category: category.name, imgUrl}),
            });

            if (result.status == 200) this.isEntityCreated = 'fulfilled';
            else this.isEntityCreated = 'rejected';

            this.allGoods.push((await result.json()).createdEntity);

        },
        async patchGood(oldGood, newName, newPrice, newCategory, newImgFormData) {
            let imgUrl = undefined;
            if (newImgFormData != null) {
                const imgRes = await fetch(`${HOST}/upload`, {method: 'POST', body: newImgFormData});
                imgUrl = (await imgRes.json())[0].url;
            }
            this.isEntityUpdated = 'pending';
            const result = await fetch(`${HOST}/goods/entity?partitionKey=${oldGood.partitionKey}&rowKey=${oldGood.rowKey}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName ? newName : oldGood.name, 
                    price: newPrice ? newPrice : oldGood.price, 
                    category: newCategory ? newCategory.name : oldGood.category,
                    imgUrl: imgUrl ? imgUrl : oldGood.imgUrl
                }),
            });
            if (result.status == 200)
                this.isEntityUpdated = 'fulfilled';
            else
                this.isEntityUpdated = 'rejected';
        },
        async deleteGood(good) {
            this.isEntityDeleted = 'pending';
            
            const imgRes = await fetch(`${HOST}/deleteBlob`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: good.imgUrl
                })
            });

            if (imgRes.status == 200) {
                const result = await fetch(`${HOST}/goods/entity?partitionKey=${good.partitionKey}&rowKey=${good.rowKey}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (result.status == 200)
                    this.isEntityDeleted = 'fulfilled';
                else 
                    this.isEntityDeleted = 'rejected';
            }
            else {
                this.isEntityDeleted = 'rejected';
            }
    },
    }
});
