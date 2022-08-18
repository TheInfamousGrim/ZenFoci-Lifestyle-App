function getShoppingList() {
    const shoppingList = localStorage
        .getItem('shopping-list')
        .replace(/","/g, '')
        .replace(/[\[\]']+/g, '')
        .replace(/["]/g, '')
        .replace(/[,]/g, '')
        .replace(/\\/g, '');

    shoppingList.replaceAll('[\\]g', '');

    console.log(shoppingList);
    $('#display-shopping-list').append(shoppingList).html();
    const displayedShoppingList = $('.display-shopping-list');
    displayedShoppingList.children().addClass('collection-item shopping-list-item');
}

getShoppingList();
