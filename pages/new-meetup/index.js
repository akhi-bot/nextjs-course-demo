import NewMeetUpForm from '../../components/meetups/NewMeetupForm'
import {useRouter} from 'next/router'
import Head from 'next/head'
import { Fragment } from 'react'
const NewMeetUpPage = () => {
   const router =  useRouter()

    const addMeetUPHandler = async(enteredData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        console.log(data)
        router.push('/')
    }
    return (
        <Fragment>
            <Head>
                <title>Add a Meetup</title>
                <meta 
                name="description"
                content= "Add your own meetups and creating amazing networking opportunities."/>
            </Head>
            <NewMeetUpForm onAddMeetup = {addMeetUPHandler}/>
        </Fragment>
    ) 
}

export default NewMeetUpPage