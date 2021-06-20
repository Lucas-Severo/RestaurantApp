import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Drawer } from '@material-ui/core';

const drawerWidth = 100
const buttonColor = '#EA7C69'
const buttonColorSecondary = '#543C3B'
const buttonColorSecondaryHover = '#382D2C'
const buttonColorHover = '#E96E5A'

const useStyles = makeStyles((theme) => ({
    backgroundDefault: {
      background: '#252836'
    },
    drawerPaper: {
      background: '#1F1D2B',
      width: drawerWidth,
      alignItems: 'center'
    },
    buttonColorSecondary: {
      background: buttonColorSecondary
    },
    buttonColorSecondaryHover: {
      '&:hover': {
        background: buttonColorSecondaryHover
      }
    },
    buttonColorPrimary: {
      background: buttonColor
    },
    buttonColorPrimaryHover: {
      '&:hover': {
        background: buttonColorHover
      }
    },
    buttonHome: {
      width: 50,
      height: 50,
      marginTop: 23
    },
    smallIcon: {
      width: 20,
      height: 20
    },
    mediumIcon: {
      width: 25,
      height: 25
    },
  }))

export default function DrawerLeft() {
    const classes = useStyles();

    return (
        <Drawer 
            anchor={"left"} 
            variant="permanent"
            open 
            classes={{
            paper: classes.drawerPaper
        }}>
            <Button 
                variant="contained"
                disableElevation={true} 
                className={`${classes.buttonColorSecondary} ${classes.buttonColorSecondaryHover} ${classes.buttonHome}`}>
                <Avatar 
                variant="square" 
                src="/images/logo.png"
                className={classes.mediumIcon}/>
            </Button>
            <Button 
                variant="contained" 
                disableElevation={true}
                className={`${classes.buttonColorPrimary} ${classes.buttonColorPrimaryHover} ${classes.buttonHome}`}>
                <Avatar 
                variant="square" 
                className={classes.smallIcon}
                src="/images/home.png"/>
            </Button>
            <Button
                disableElevation={true}
                className={classes.backgroundDefault, classes.buttonHome}>
                <Avatar
                variant="square"
                className={classes.smallIcon}
                src="/images/orders.png"/>
            </Button>
        </Drawer>
    )
}