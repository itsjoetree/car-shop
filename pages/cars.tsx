import { Box, Card, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

const APP_COLOR = "#5D3FD3"
const BODY_TEXT = "Select one of our vehicles to learn more about them!"

type CarPreview = {
    id: string,
    imgName: string,
    make: string,
    model: string,
    year: number
}

const CarPreview = (props: CarPreview) => {
    return <Link href={"/cars/" + props.id}>
    <Card sx={{display: "flex",
        width: 200,
        height: 200,
        maxWidth: 200,
        maxHeight: 200,
        border: `3px solid ${APP_COLOR}`,
        p: 5,
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover": {opacity: 0.7}

    }}>
        <Box sx={{alignSelf: "center"}}>
            <Image width={200} height={200} alt="car" src={"/images/" + props.imgName} />
            <Typography sx={{color: APP_COLOR, textAlign: "center", fontWeight: "bold", fontSize: 12}}>{props.make} {props.model} {props.year}</Typography>
        </Box>
    </Card></Link>
}

const cars: CarPreview[] = [
    {id: "1", make: "Chevy", model: "Malibu", year: 2010, imgName: "malibu2010.webp"},
    {id: "2", make: "Chevy", model: "Trailblazer", year: 2022, imgName: "tailblazer2022.png"},
    {id: "3", make: "Tesla", model: "Model S", year: 2022, imgName: "tesla2022.webp"}
]

const Cars: NextPage = () => {
  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} className={styles.container}>
      <Head>
        <title>Cars Inventory - Car Shop</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h2" component="h1">Cars</Typography>

      <Box sx={{maxWidth: 500}}>
        <Typography sx={{textAlign: "center"}}>
          {BODY_TEXT}
        </Typography>
      </Box>

      <Typography sx={{mt: "1em"}} variant="h4" component="h2">Inventory</Typography>

        <Grid container>
            {
                cars.map(c => <Grid sx={{display: "flex", justifyContent: "center", alignItems: "center", mb: 2}} key={c.id} item md={4} xs={12}>
                    <CarPreview
                        id={c.id}
                        make={c.make}
                        model={c.model}
                        year={c.year}
                        imgName={c.imgName}
                    />
                </Grid>)
            }
        </Grid>
    </Container>
  )
}

export default Cars
