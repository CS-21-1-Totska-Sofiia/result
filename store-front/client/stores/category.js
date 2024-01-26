import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        allCategories: {},
        fetched: false,
        counter: 0,
    }),

    actions: {
        async getAllCategories() {
            this.counter++;
            this.allCategories = {};
            const data = await fetch(`${API_URL}/categories/`);
            const categories = await data.json();
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].parentCategory == 'root') {
                    if (!this.allCategories[categories[i].name])
                        this.allCategories[categories[i].name] = categories[i];
                    else if (Object.keys(this.allCategories[categories[i].name]).length > 0) {
                        for (const key in categories[i]) {
                            this.allCategories[categories[i].name][key] = categories[i][key];
                        } 
                    }
                }
                else {
                    if (!this.allCategories[categories[i].parentCategory]) this.allCategories[categories[i].parentCategory] = {children: {}};
                    this.allCategories[categories[i].parentCategory].children[categories[i].name] = categories[i];
                }
            }
            this.fetched = true;
        },
    }
});

// allCategories = {
//     laptops: {},
//     phones: {
//         iphone: {},
//         samsung: {}
//     },
// }