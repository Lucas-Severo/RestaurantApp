import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dishesContainer: {
        paddingTop: 20
    },
    dishesTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    darkBackground: {
        backgroundColor: '#1F1D2B'
    },
    lightBackground: {
        backgroundColor: '#252836'
    },
    dishCard: {
      marginRight: 15,
      width: 240,
      height: 280,
      display: 'flex',
      alignItems: 'flex-end',
      cursor: 'pointer'
    },
    dishLayout: {
      width: '100%',
      height: '80%',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      color: 'white'
    },
    dishName: {
      fontWeight: 'bold'
    },
    dishImage: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      top: -55,
      marginBottom: -20,
      margin: '0 auto'
    }
}))


export default function Dishes({dishes, onClick}) {
    const classes = useStyles();

    return (
        <div className={classes.dishesContainer}>
            <label className={classes.dishesTitle}>
                Choose Dishes ({dishes.length})
            </label>

            <Box display="flex" flexWrap="wrap">
                {
                dishes.map((dish, index) => (
                    <Card 
                    key={dish.id}
                    elevation={0}
                    className={`${classes.lightBackground} ${classes.dishCard}`}
                    onClick={() => onClick(index)}
                    >
                        <CardContent className={`${classes.darkBackground} ${classes.dishLayout}`}>
                            <Avatar 
                            alt="Remy Sharp" 
                            src={dish.image}
                            className={classes.dishImage}/>
                            <label className={classes.dishName}>{dish.description}</label>
                            <label>{dish.price}</label>
                            <label>{dish.available} Bowls available</label>
                        </CardContent>
                    </Card>
                ))
                }
            </Box>
        </div>
    )
}