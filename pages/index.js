import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'
import { useEffect, useState, Fragment } from "react";
import {MongoClient} from 'mongodb'

const Dummy_Data = [
    {
        id: 'm1',
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
        tilte: "Red Square",
        address: "Red Square, Moscow, Russia, 109012",
        descriptios: "Red Square is one of the oldest and largest squares in Moscow, the capital of Russia. Owing to its historical significance and the adjacent historical buildings, it is regarded as one of the most famous squares in Europe and the world."
    },
    {
        id: 'm2',
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        tilte: "Eiffel Tower",
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
        descriptios: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the towe"
    }
]
const Homepage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse huge list of highly active React Meetup"/>
            </Head>
            <MeetupList meetups= {props.meetups}/>
        </Fragment>
    )
}

// export const getServerSideProps = async(context) => {
//     const req = context.req;
//     const res = context.res
//     // fetch data from server
//     return {
//         props: {
//             meetups: Dummy_Data
//         }
//     }
// }

export const getStaticProps = async() => {
    // fetch data from an API

    const client = await MongoClient.connect('mongodb+srv://userName3:7830824227@cluster0.cmune.mongodb.net/meetup?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollection = db.collection('meetup')

    const meetups = await meetupCollection.find().toArray()
    
    client.close()
    return {
        props: {
            meetups : meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default Homepage;