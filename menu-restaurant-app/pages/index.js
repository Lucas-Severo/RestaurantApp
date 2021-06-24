import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import DrawerLeft from './drawer-left';
import TabOptions from './tabs';
import Dishes from './dishes';
import ModalDish from './modal-dish';
import OrderDrawer from './drawer-order';

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
  const [value, setValue] = useState(0)

  useEffect(async () => {
    await buscarPratos()
  }, [value])

  async function buscarPratos() {
      const response = await fetch("http://localhost:1337/dishes?categoria="+categories[value])
      const dishes = await response.json()
      renderImages(dishes)
      setDishes(dishes)
  }

  function renderImages(dishes) {
    dishes = dishes.map(dish => renderImage(dish))
  }

  function renderImage(object) {
    object.image = `http://localhost:1337${object.image[0].url}`
  }

  const orders = [{
    id: 1,
    image: '/images/image4.png',
    description: 'Spicy seasoned seafood noodles',
    price: '$5',
    totalPrice: '$10',
    quantity: 2
  },
  {
    id: 2,
    image: '/images/image4.png',
    description: 'Spicy seasoned seafood noodles',
    price: '$5',
    totalPrice: '$10',
    quantity: 2
  },
  {
    id: 3,
    image: '/images/image4.png',
    description: 'Spicy seasoned seafood noodles',
    price: '$5',
    totalPrice: '$10',
    quantity: 2
  },
  {
    id: 4,
    image: '/images/image4.png',
    description: 'Spicy seasoned seafood noodles',
    price: '$5',
    totalPrice: '$10',
    quantity: 2
  },
  {
    id: 5,
    image: '/images/image4.png',
    description: 'Spicy seasoned seafood noodles',
    price: '$5',
    totalPrice: '$10',
    quantity: 2
  }]

  const handleOpen = (dishIndex) => {
    setSelectedItem(dishes[dishIndex])
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await buscarPratos()
  };

  return (
    <div className={classes.scrollHide}>
      <Head>
        <title>Restaurante</title>
        <meta name="description" content="App de restaurante" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" classes={{root: classes.root}} className={classes.appBar}>
          <DrawerLeft/>

          {/* Meio */}
          
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

          <OrderDrawer orders={orders}/>
      </Container>

      <ModalDish 
        selectedItem={selectedItem}
        handleOpen={handleOpen}
        handleClose={handleClose}
        openModal={openModal}/>
    </div>
  )
}