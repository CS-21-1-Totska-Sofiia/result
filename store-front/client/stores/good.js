import { defineStore } from 'pinia';

export const useGoodStore = defineStore('good', {
    state: () => ({
        goods: [],
        currentGood: {},
        fetchedCurrent: false,
    }),

    actions: {
        async getGoods(category) {
            this.fetched = false;
            this.goods = [];
            const data = await fetch(`${API_URL}/goods/${category}`);
            const goods = await data.json();
            for (let i = 0; i < goods.length; i++) {
                console.log(goods[i]);
                goods[i].urlMinObj = await this.getImg(goods[i].thumbImgUrl);
            }
            this.goods = goods;
            this.fetched = true;
        },
        async getImg(url) {
            try {
                console.log(url.replace("azurite", "localhost"));
                const resp = await fetch(url.replace("azurite", "localhost"));
                const blob = await resp.blob();
                return URL.createObjectURL(blob);
            }
            catch {
                return "";
            }
        },
        async getOneGood(partitionKey, rowKey) {
            this.fetchedCurrent = false;
            this.currentGood = {};

            const data = await fetch(`${API_URL}/goods/${partitionKey}/${rowKey}`);
            this.currentGood = await data.json();
            this.currentGood.urlObj = await this.getImg(this.currentGood.imgUrl);

            this.fetchedCurrent = true;
        }
    }
});