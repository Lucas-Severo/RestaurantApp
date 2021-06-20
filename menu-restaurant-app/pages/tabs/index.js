import {
    Paper, 
    Tabs, 
    Tab,
    Divider
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    tabs: {
      backgroundColor: 'transparent',
      color: 'white'
    }
  }))

const TabDefaultWhite = withStyles({
    root: {
      color: 'white',
      fontWeight: '400',
      minWidth: 100
    }
})(Tab)

const DividerWhite = withStyles({
    root: {
        backgroundColor: '#d3d3d3'
    },
    light: {
        backgroundColor: '#727272'
    }
})(Divider)

export default function TabOptions() {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
        <Paper
            className={classes.tabs}
            elevation={0}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="scrollable"
              aria-label="disabled tabs example"
            >
              <TabDefaultWhite label="Hot Dishes"/>
              <TabDefaultWhite label="Cold Dishes"/>
              <TabDefaultWhite label="Soup" />
              <TabDefaultWhite label="Brill" />
              <TabDefaultWhite label="Soup" />
              <TabDefaultWhite label="Dessert" />
            </Tabs>
            <DividerWhite light/>
        </Paper>
    )
}