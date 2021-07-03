import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect } from 'react';
import DrawerLeft from './drawer-left';
import TabOptions from './tabs';
import Dishes from './dishes';
import ModalDish from './modal-dish';
import OrderDrawer from './drawer-order';
import ItemApiRequest from './requests/ItemApiRequest';
import OrderApiRequest from './requests/OrderApiRequest';
import OrderItemApiRequest from './requests/OrderItemApiRequest';

const drawerWidth = 100
const orderWidth = 350
const categories = ['HOT_DISHES', 'COLD_DISHES', 'SOUP', 'BRILL', 'DESSERT']

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#252836',
    border: 0,
    color: 'white',
    minHeight: '100vh',
    height: '100%',
    padding: '0 30px 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  label: {
    textTransform: 'capitalize',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth+orderWidth}px)`,
    marginLeft: drawerWidth
  },
  paddingTB20: {
    paddingTop: 20,
    paddingBottom: 20
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
}))

export default function Home() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [dishes, setDishes] = useState([])
  const [orderDishes, setOrderDishes] = useState([])
  const [orderDishesFromState, setOrderDishesFromState] = useState([])
  const [value, setValue] = useState(0)
  const [showAlertEmptyOrders, setShowAlertEmptyOrders] = useState(false)
  const [showAlertSuccessfulOrder, setShowAlertSuccessfulOrder] = useState(false)
  const [showNotAvailableQuantity, setShowNotAvailableQuantity] = useState(false)

  useEffect(async () => {
    await getItemsFromLocalStorage()
  }, [])

  useEffect(async () => {
    await buscarPratos()
  }, [orderDishesFromState])

  useEffect(async () => {
    await buscarPratos()
  }, [value])

  async function getItemsFromLocalStorage() {
    const response = localStorage.getItem('item')
    const items = JSON.parse(response)
    if (items) {
      setOrderDishes(items)
      setOrderDishesFromState(items) 
    }
  }

  async function buscarPratos() {
      const response = await fetch("http://localhost:1337/dishes?categoria="+categories[value])
      const dishes = await response.json()

      for (let dish of dishes) {
        for (let orderDish of orderDishes) {
          if (dish.id === orderDish.id) {
            dish.available -= orderDish.quantity
            break
          }
        }
      }

      renderImages(dishes)
      setDishes(dishes)
  }

  function renderImages(dishes) {
    dishes = dishes.map(dish => renderImage(dish))
  }

  function renderImage(object) {
    object.imageRendered = `http://localhost:1337${object.image[0].url}`
  }

  const handleOpen = (dishIndex) => {
    setSelectedItem(dishes[dishIndex])
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddItem = async(item) => {
    const dish = getDishByItem(item)

    if (dish.available > 0) {
      let itemAlreadyAdded = false
      for (let dish of orderDishes) {
        if (dish.id === item.id) {
          ++dish.quantity
          dish.totalPrice = (dish.quantity * dish.price)
          itemAlreadyAdded = true
          break
        }
      }

      --dish.available

      if (!itemAlreadyAdded) {
        item.quantity = 1
        item.totalPrice = (item.quantity * item.price)
        item.available = dish.available
        item.totalAvailable = dish.available
        orderDishes.push(item)
      }

      setOrderDishes([...orderDishes])
      setDishes([...dishes])

      localStorage.setItem('item', JSON.stringify(orderDishes))
    } else {
      setShowNotAvailableQuantity(true)
    }
  }

  const getDishByItem = (item) => {
    for (let dish of dishes) {
      if (dish.id === item.id) {
        return dish
      }
    }
  }

  const handleDeleteItem = (item) => {
    for (let index = 0; index < orderDishes.length; index++) {
      if (orderDishes[index].id === item.id) {
        for (let dish of dishes) {
          if (dish.id === item.id) {
            dish.available += orderDishes[index].quantity
            break
          }
        }

        orderDishes.splice(index, 1);
        setOrderDishes([...orderDishes])
        localStorage.setItem('item', JSON.stringify(orderDishes))
        break;
      }
    }
  }

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await buscarPratos()
  };

  const handleFinishOrder = async () => {
    const totalPrice = orderDishes.reduce((acc, prox) => {
      return acc + prox.totalPrice
    }, 0)

    if (orderDishes.length == 0) {
      setShowAlertEmptyOrders(true)
    } else {
      const order = {
        total: totalPrice,
        discount: 0,
        quantity: orderDishes.length
      }

      const orderCadastrado = await(await OrderApiRequest.cadastrarPedido(order)).json()
      
      Promise.all([
        cadastrarOrderItens(orderDishes, orderCadastrado),
        updateItems(orderDishes)
      ])

      setShowAlertSuccessfulOrder(true)
      setOrderDishes([])
    }

    localStorage.removeItem('item');
  }

  const handleCloseSnackbar = () => {
    setShowAlertEmptyOrders(false)
  }

  const handleCloseSnackbarSucessfulOrder = () => {
    setShowAlertSuccessfulOrder(false)
  }

  const handleCloseSnackbarNotAvailableQuantity = () => {
    setShowNotAvailableQuantity(false)
  }

  const cadastrarOrderItens = async (orderItens, order) => {
    for (let orderItem of orderItens) {
      const item = {
        dish: orderItem.id,
        order: order.id,
        quantity: orderItem.quantity
      }

      OrderItemApiRequest.cadastrarOrderItem(item)
    }
  }

  const updateItems = async (items) => {
    for (let item of items) {
      updateItem(item)
    }
  }

  const updateItem = async (item) => {
    ItemApiRequest.atualizarItem(item)
  }

  const incrementItem = (order) => {
    const dish = getDishByItem(order)
  
    if ((order.totalAvailable - order.quantity) >= 0) {
      for (let dish of orderDishes) {
        if (dish.id === order.id) {
          ++dish.quantity
          dish.totalPrice = (dish.quantity * dish.price)
          break
        }
      }

      if (dish) {
        --dish.available
      }

      setOrderDishes([...orderDishes])
      setDishes([...dishes])

      localStorage.setItem('item', JSON.stringify(orderDishes))
    } else {
      setShowNotAvailableQuantity(true)
    }
  }

  const decrementItem = (order) => {
    const dish = getDishByItem(order)

    if (order.quantity > 1) {
      for (let dish of orderDishes) {
        if (dish.id === order.id) {
          --dish.quantity
          dish.totalPrice = (dish.quantity * dish.price)
          break
        }
      }

      if (dish) {
        ++dish.available
      }

      setOrderDishes([...orderDishes])
      setDishes([...dishes])

      localStorage.setItem('item', JSON.stringify(orderDishes))
    }
  }

  return (
    <div>
      <Head>
        <title>Restaurante</title>
        <meta name="description" content="App de restaurante" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl" classes={{root: classes.root}} className={classes.appBar}>
          <DrawerLeft/>
          
          <header className={`${classes.headerTitle} ${classes.paddingTB20}`}>
            <label className={classes.title}>
              Restaurante
            </label>
            <label className={classes.subTitle}>
              {new Date().toDateString()}
            </label>
          </header>

          <TabOptions handleChange={handleChange} value={value}/>

          <Dishes dishes={dishes} onClick={handleOpen}/>

          <OrderDrawer 
            orderDishes={orderDishes}
            handleDeleteItem={handleDeleteItem}
            handleFinishOrder={handleFinishOrder}
            incrementItem={incrementItem}
            decrementItem={decrementItem}/>
      </Container>

      <ModalDish 
        selectedItem={selectedItem}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleAddItem={handleAddItem}
        openModal={openModal}/>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showAlertEmptyOrders}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
      >
        <Alert
          color="error"
          severity="error">
          Selecione pelo menos um item para continuar
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showNotAvailableQuantity}
        onClose={handleCloseSnackbarNotAvailableQuantity}
        autoHideDuration={2000}
      >
        <Alert
          color="error"
          severity="error">
          O item não possui mais quantidade disponível
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showAlertSuccessfulOrder}
        onClose={handleCloseSnackbarSucessfulOrder}
        autoHideDuration={2000}
      >
        <Alert
          color="success"
          severity="success">
          Venda realizada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  )
}