import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from 'next/head'
const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content= {props.meetupData.description} />
      </Head>
      <MeetupDetail
        image= {props.meetupData.image}
        title= {props.meetupData.title}
        address= {props.meetupData.address}
        description= {props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://userName3:7830824227@cluster0.cmune.mongodb.net/meetup?retryWrites=true&w=majority')

  const db = client.db()

  const meetupCollection = db.collection('meetup');

  const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
  client.close()
  return {
    fallback: false,
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  
  const client = await MongoClient.connect('mongodb+srv://userName3:7830824227@cluster0.cmune.mongodb.net/meetup?retryWrites=true&w=majority')

  const db = client.db()

  const meetupCollection = db.collection('meetup');

  const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)})
   console.log(selectedMeetup)
  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      },
    },
  };
};

export default MeetupDetails;
