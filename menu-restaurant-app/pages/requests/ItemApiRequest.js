class ItemApiRequest {

    async atualizarItem(item) {
        return fetch(`http://localhost:1337/dishes/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    }

}

export default new ItemApiRequest()