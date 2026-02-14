const Category = require("../models/category.model");

async function getCategories() {
    const category = new Category();
    const categories = await category.list();

    const categoriesKeyboard = categories.map((item) => {
        return [{ text: item.topicTitle, callback_data: item.id }];
    });

    return categoriesKeyboard;
}

module.exports = getCategories;
