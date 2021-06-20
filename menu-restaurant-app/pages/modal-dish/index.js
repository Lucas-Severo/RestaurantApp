import { makeStyles } from '@material-ui/core/styles';
import { 
    Avatar,
    Button,
    Container,
    Modal,
    Card,
    CardContent
} from '@material-ui/core';
import { Close } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalLayout: {
      backgroundColor: '#252836FA',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      width: 500,
      height: 400,
    },
    headerModal: {
      backgroundColor: '#EA7C69',
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16
    },
    headerModalInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& button': {
        color: 'white',
        fontSize: 15
      }
    },
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 15,
      height: '100%'
    },
    modalDetail: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingTop: 20,
      fontSize: 18
    },
    dishImage: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin: '0 auto'
    }
}))

export default function ModalDish({selectedItem, openModal, handleClose}) {
    const classes = useStyles();

    return (
        <Modal
        disableScrollLock
        disableAutoFocus
        disableEnforceFocus
        disablePortal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.center}>
        <div className={classes.modalLayout}>
          <Card 
            elevation={0}
            square
            className={classes.headerModal}>
            <CardContent className={classes.headerModalInner}>
              Detalhes do prato
              <Button 
                variant="contained" 
                disableElevation 
                color="primary"
                onClick={handleClose}>
                <Close/>
              </Button>
            </CardContent>
          </Card>
          <Container maxWidth="sm" className={classes.modalContainer}>
            <Avatar 
              alt="Remy Sharp" 
              src={selectedItem.image}
              className={classes.dishImage}/>
            <div className={classes.modalDetail}>
              <label>{selectedItem.description}</label>
              <label>Price: {selectedItem.price}</label>
              <label>Available quantity: {selectedItem.available}</label>
            </div>
            <Button variant="outlined" disableElevation color="primary">
              Adicionar
            </Button>
          </Container>
        </div>
      </Modal>
    )
}