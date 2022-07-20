const { MONGO_CLIENT_EVENTS } = require("mongodb");
const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const Movie = require("./utils");

const app = async (yargsObj) => {
  const collection = await connection();
  try {
  if (yargsObj.create) {
    console.log("Created");
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    await newMovie.add(collection);
    //add a movie from the terminal into an object and save in database

  } else if (yargsObj.read) {
    const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    console.log(await movie.list(collection));
    //list items from database
  
  } else if (yargsObj.update) {
    const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year)
    console.log(await movie.update(collection));
    //update one database entry

  } else if (yargsObj.delete) {
    const movie = new Movie(yargsObj.title);
    console.log(await movie.delete(collection));
    // const query = { title: yargsObj.title }
    // const result = await collection.deleteOne(query);
    // if (result.deletedCount === 1) {
    //   console.log("Deleted one doc");
    // } else {
    //   console.log("Nothing deleted");
    // }
    //delete one database entry
  
  } else {
    console.log("Incorrect command");
  }
  await client.close();
  } catch (error) {
    console.log(error);
  }
}
app(yargs.argv);