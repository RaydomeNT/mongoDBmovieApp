const { MONGO_CLIENT_EVENTS } = require("mongodb");
const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const Movie = require("./utils");

const app = async (yargsObj) => {
  const collection = await connection();
  if (yargsObj.create) {
    console.log("Created");
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    await newMovie.add(collection);
    //add a movie from the terminal into an object and save in database

  } else if (yargsObj.read) {
    console.log("Read");
    const query = { title: yargsObj.title, actor: yargsObj.actor, year: yargsObj.year }
    const options = {
      sort: { year: yargsObj.year -1},
      projection: { title: 1, actor: 1, year: 1 }
    };
    const collection = await collection.find(query, options);
    console.log(query);
    //list items from database
  
  } else if (yargsObj.update) {
    console.log("Updated");
    //update one database entry

  } else if (yargsObj.delete) {
    const query = { title: yargsObj.title }
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Deleted one doc");
    } else {
      console.log("Nothing deleted");
    }
    //delete one database entry
  
  } else {
    console.log("Incorrect command");
  }
  await client.close();
};

app(yargs.argv);