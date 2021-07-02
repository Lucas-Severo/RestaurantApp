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

export default function TabOptions({handleChange, value}) {
    const classes = useStyles();

    return (
        <Paper
            className={classes.tabs}
            elevation={0}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, value) => handleChange(event, value)}
              variant="scrollable"
              aria-label="disabled tabs example"
            >
              <TabDefaultWhite label="Pratos Quentes"/>
              <TabDefaultWhite label="Pratos Frios"/>
              <TabDefaultWhite label="Sopa" />
              <TabDefaultWhite label="Fritos" />
              <TabDefaultWhite label="Sobremesa" />
            </Tabs>
            <DividerWhite light/>
        </Paper>
    )
}