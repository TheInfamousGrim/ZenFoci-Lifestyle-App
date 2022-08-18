function getShoppingList() {
    if (JSON.parse(localStorage.getItem('shopping-list')) !== null) {
        // remove all the elements from the list
        $('#display-shopping-list').html('');
        const shoppingList = localStorage
            .getItem('shopping-list')
            .replace(/","/g, '')
            .replace(/[\[\]']+/g, '')
            .replace(/["]/g, '')
            .replace(/[,]/g, '')
            .replace(/\\/g, '');

        shoppingList.replaceAll('[\\]g', '');

        $('#display-shopping-list').append(shoppingList).html();
        const displayedShoppingList = $('.display-shopping-list');
        displayedShoppingList.children().addClass('collection-item shopping-list-item');
    }
}

getShoppingList();
