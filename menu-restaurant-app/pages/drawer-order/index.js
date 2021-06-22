import { makeStyles } from '@material-ui/core/styles';
import { 
    Avatar,
    Button, 
    Drawer,
    Card,
    CardContent,
    Box,
    Divider
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const orderWidth = 350
const useStyles = makeStyles((theme) => ({
    orderDrawer: {
      background: '#1F1D2B',
      width: orderWidth
    },
    titleOrder: {
      color: '#FFF',
      padding: theme.spacing(2, 2),
      fontWeight: 'bold',
      fontSize: 18
    },
    orderCard: {
      width: '100%',
      display: 'flex',
      backgroundColor: '#1F1D2B',
      margin: theme.spacing(1)
    },
    orderLayout: {
      display: 'flex',
      width: '100%'
    },
    ordersColumns: {
      marginTop: 40
    },
    orderColumn: {
      color: '#FFF',
      padding: theme.spacing(2),
      fontWeight: 600,
      '&:nth-child(1)': {
        paddingRight: theme.spacing(19.4)
      }
    },
    orderInfo: {
      display: 'flex',
      width: '80%'
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
    },
    textEllipsis: {
      width: 130,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    itemImage: {
      marginRight: 8
    },
    itemQuantity: {
      backgroundColor: '#2D303E',
      border: '1px solid #393C49',
      width: 40,
      height: 40,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFF'
    },
    itemDescription: {
      color: '#FFF'
    },
    itemPrice: {
      color: '#ABBBC2'
    },
    priceTotal: {
      color: 'white',
      padding: theme.spacing('12px', 0, '12px', 0)
    },
    totalItem: {
      width: '15%',
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4
    },
    deleteIcon: {
      width: 40,
      height: 40,
      color: '#FF7CA3',
      border: '1px solid #FF7CA3',
      padding: 5,
      borderRadius: 5,
      cursor: 'pointer'
    },
    orderItemPayment: {
      position: 'fixed',
      backgroundColor: '#1F1D2B',
      height: 130,
      width: orderWidth,
      bottom: 0
    },
    orderItemPaymentLayout: {
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    },
    flexItem: {
      display: 'flex'
    },
    spaceBetween: {
      justifyContent: 'space-between'
    },
    textGray: {
      color: '#ABBBC2'
    },
    textWhite: {
      color: '#FFF'
    },
    buttonConfirmPayment: {
      color: '#FFF'
    }
}))

export default function OrderDrawer({orders}) {
    const classes = useStyles();

    return (
        <Drawer 
          anchor={"right"} 
          variant="permanent"
          open 
          classes={{
            paper: classes.orderDrawer
          }}>
            <label className={classes.titleOrder}>Order #1111</label>

            <div className={classes.ordersColumns}>
              <label className={classes.orderColumn}>Item</label>
              <label className={classes.orderColumn}>Qtd</label>
              <label className={classes.orderColumn}>Price</label>
            </div>

            <Box display="flex" flexWrap="wrap" paddingBottom={16}>
              {
                orders.map((order, index) => (
                  <Card 
                    key={order.id}
                    variant="outlined"
                    className={`${classes.orderCard}`}
                    >
                        <CardContent className={`${classes.orderLayout}`}>
                            <div className={classes.orderInfo}>
                              <Avatar
                              src={order.image}
                              className={classes.itemImage}/>
                              <div className={classes.info}>
                                <label className={`${classes.textEllipsis} ${classes.itemDescription}`}>{order.description}</label>
                                <label className={classes.itemPrice}>{order.price}</label>
                              </div>
                            </div>
                            <div className={classes.itemQuantity}>
                              <label>{order.quantity}</label>
                            </div>
                            <div className={classes.totalItem}>
                                <label className={classes.priceTotal}>{order.totalPrice}</label>
                                <DeleteOutlineIcon className={classes.deleteIcon}/>
                            </div>
                        </CardContent>
                  </Card>
                ))}
            </Box>
            
            <Card className={classes.orderItemPayment}>
              <Divider/>
                <CardContent className={`${classes.orderItemPaymentLayout}`}>
                  <div className={`${classes.flexItem} ${classes.spaceBetween}`}>
                    <label className={classes.textGray}>Discount</label>
                    <label className={classes.textWhite}>$0</label>
                  </div>
                  <div className={`${classes.flexItem} ${classes.spaceBetween}`}>
                    <label className={classes.textGray}>Sub Total</label>
                    <label className={classes.textWhite}>$ 21,03</label>
                  </div>
                  <Button className={classes.buttonConfirmPayment} variant="contained" color="primary">
                    Continue to Payment
                  </Button>
              </CardContent>
            </Card>
        </Drawer>
    )
}