class OrderItemApiRequest {

    async cadastrarOrderItem(orderItem) {
        return fetch(`http://localhost:1337/order-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItem)
        })
    }

}

export default new OrderItemApiRequest()