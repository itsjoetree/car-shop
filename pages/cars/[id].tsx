import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import ExploreInventoryButton from '../../components/ExploreInventoryButton'
import axios from 'axios'
import { Box, Button, Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Star, StarHalf, StarOutline } from '@mui/icons-material'
import { ICar } from '../../models/Car'
import { ReactNode } from 'react'
import type { GetStaticPaths } from 'next'
import { APP_COLOR } from '../_app'

/** Used to format currency of this page. */
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/** Used to format numbers of this page. */
const numericFormatter = new Intl.NumberFormat('en-US')

type RatingBarProps = {
    rating: number
}

const RatingBar = ({ rating }: RatingBarProps) => {

    const getStars = (): ReactNode[] => {
        const parsedRating = rating.toString()
        const nums = parsedRating.split('.')

        const stars = new Array(parseInt(nums[0])).fill(<Star fontSize="medium" sx={{ color: APP_COLOR }} />);

        if (nums.length > 1 && parseInt(nums[1]) >= 5) stars.push(<StarHalf fontSize="medium" sx={{ color: APP_COLOR }} />)

        const remainder = 5 - stars.length
        if (remainder > 0) stars.push(new Array(remainder).fill(<StarOutline fontSize="medium" sx={{ color: APP_COLOR }} />))

        return stars
    }

    return (
        <Box>
            {
                getStars().map((star, i) => <React.Fragment key={i}>{star}</React.Fragment>)
            }
        </Box>
    )
}

type CarPreview = {
    id: string,
    imgName: string,
    make: string,
    model: string,
    year: string
}

const CarPreview = (props: CarPreview) => {
    return <Link href={"/cars/" + props.id}>
        <Card sx={{
            display: "flex",
            width: 200,
            height: 200,
            maxWidth: 200,
            maxHeight: 200,
            border: `3px solid ${APP_COLOR}`,
            p: 5,
            borderRadius: "50%",
            cursor: "pointer",
            "&:hover": { opacity: 0.7 }
        }}>
            <Box sx={{ alignSelf: "center" }}>
                <Image width={200} height={200} alt="car" src={"/images/" + props.imgName} />
                <Typography sx={{ color: APP_COLOR, textAlign: "center", fontWeight: "bold", fontSize: 12 }}>{props.make} {props.model} {props.year}</Typography>
            </Box>
        </Card></Link>
}

type CarDetailsLIProps = {
    name: string,
    value: number | string
}

const currencyFormattedProps = ["Price"]
const numericFormattedProps = ["Mileage"]

const CarDetailLI = ({ name, value }: CarDetailsLIProps) => {

    if (typeof value === "number" && currencyFormattedProps.indexOf(name) !== -1) value = currencyFormatter.format(value)
    else if (typeof value === "number" && numericFormattedProps.indexOf(name) !== -1) value = numericFormatter.format(value)

    return (
        <ListItem sx={{ p: 0 }}>
            <Box sx={{ mr: 1 }}>
                <ListItemText sx={{ color: APP_COLOR }}>
                    <Typography sx={{ fontWeight: "bolder" }}>{name}:</Typography>
                </ListItemText>
            </Box>

            <Box>
                <ListItemText>{value}</ListItemText>
            </Box>
        </ListItem>
    )
}

type CarDetailsProps = {
    car: ICar
}

const CarDetails = ({ car }: CarDetailsProps) => {
    const carIdentifier = `${car.make} ${car.model} ${car.year}`

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className={styles.container}>
            <Head>
                <title>Details - Car Shop</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Typography variant="h2" component="h1">
                {carIdentifier}
            </Typography>

            <Grid sx={{ alignItems: "center", justifyContent: "center" }} container>
                <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} item md={4} xs={12}>
                    <Image alt={`${car.make} ${car.model} ${car.year}`} height={250} width={250} src={"/images/" + car.imgName} />
                    <RatingBar rating={car.rating} />
                    <Typography sx={{ color: APP_COLOR, fontSize: 12, fontWeight: "bold" }}>Overall Rating</Typography>
                </Grid>

                <Grid sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} item md={4} xs={12}>
                    <List>
                        {
                            Object.entries(car)
                                .filter(kvp => ["make", "model", "color", "year", "price", "mileage"].indexOf(kvp[0]) != -1)
                                .map(kvp => <CarDetailLI
                                    key={kvp[0]}
                                    name={kvp[0].charAt(0).toUpperCase() + kvp[0].slice(1)}
                                    value={kvp[1]}
                                />)
                        }
                    </List>

                    <Button sx={{ backgroundColor: APP_COLOR, color: "white", mt: "1em", width: "10rem", "&:hover": { backgroundColor: "#5139ac" } }} href="tel:000-000-0000">Inquire</Button>
                </Grid>
            </Grid>

            <Typography sx={{ textAlign: "center", mt: "1em" }} variant="h4" component="h2">
                explore other options?
            </Typography>

            <ExploreInventoryButton sx={{ mt: "1em", mb: "1em" }} />
        </Container>
    )
}

export async function getStaticProps({ params }: any) {
    try {
        const response = await axios.get(process.env.HOST + "/api/cars/" + params.id)
        const car: ICar = response.data

        return {
            props: {
                car
            }
        }
    }
    catch (err) {
        return {
            notFound: true
        }
    }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    return {
        paths: [
            { params: { id: "62ce31038bcb31677dd29710" } },
            { params: { id: "62ce31028bcb31677dd2970e" } },
            { params: { id: "62ce31038bcb31677dd2970f" } }
        ],
        fallback: false
    }
}


export default CarDetails
