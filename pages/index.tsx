import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AddCardIcon from '@mui/icons-material/AddCard'
import PhoneIcon from '@mui/icons-material/Phone'
import ExploreInventoryButton from '../components/ExploreInventoryButton'
import type { NextPage } from 'next'
import { ReactNode } from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { EnergySavingsLeaf } from '@mui/icons-material'
import { APP_COLOR } from './_app'

const BODY_TEXT = "We're a local shop that has a vast inventory for you to explore, find your new vehicle today!"

const coreValues: CoreValue[] = [
  {
    title: "Certified Pre-Owned",
    body: "With our selection there will be no worries when it comes to quality. Each vehicle goes through a rigorous quality assurance process.",
    icon: <EnergySavingsLeaf fontSize="large" />
  },
  {
    title: "Expedited Process",
    body: "Find a listing that you are interested in? Give us a call and we will get you in the same day.",
    icon: <PhoneIcon fontSize="large" />
  },
  {
    title: "Generous Return Policy",
    body: "If you are not satisfied with your purchase in the first 30 days we will offer a full refund if vehicle is in the same condition as purchased!",
    icon: <AddCardIcon fontSize="large" />
  },
]

const CARD_STYLES = {
  height: "100%",
  p: 2,
  mr: 2,
  ml: 2,
  backgroundColor: APP_COLOR,
  color: "white"
}

type CoreValue = {
  title: string,
  body: string,
  icon: ReactNode,
}

const CoreValuesCard = (props: CoreValue) => {
  return (<Card sx={CARD_STYLES}>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {props.icon}
    </Box>

    <Typography sx={{ mt: "1em" }} variant="h6">{props.title}</Typography>

    <Typography>
      {props.body}
    </Typography>
  </Card>)
}

const Home: NextPage = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className={styles.container}>
      <Head>
        <title>Home - Car Shop</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h2" component="h1">Car Shop</Typography>

      <Box sx={{ maxWidth: 500 }}>
        <Typography sx={{ textAlign: "center" }}>
          {BODY_TEXT}
        </Typography>
      </Box>

      <ExploreInventoryButton sx={{ mt: "1em" }} />

      <Grid sx={{ mt: "1em" }} container>
        {
          coreValues.map(cv => <Grid key={cv.title} sx={{ mb: 2 }} item md={4} sm={12} xs={12}>
            <CoreValuesCard
              title={cv.title}
              body={cv.body}
              icon={cv.icon}
            />
          </Grid>)
        }
      </Grid>

      <Typography sx={{ textAlign: "center" }} variant="h4" component="h2">
        ready to explore?
      </Typography>

      <ExploreInventoryButton sx={{ mt: "1em", mb: "1em" }} />
    </Container>
  )
}

export default Home
