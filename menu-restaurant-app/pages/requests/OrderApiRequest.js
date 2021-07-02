class OrderApiRequest {

    async cadastrarPedido(pedido) {
        return await fetch(`http://localhost:1337/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
    }

}

export default new OrderApiRequest()