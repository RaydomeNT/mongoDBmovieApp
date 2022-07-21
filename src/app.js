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

  } else if (yargsObj.list) {
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    console.log(await newMovie.list(collection));
    //lists movies with specified actor

  } else if (yargsObj.date) {
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    console.log(await newMovie.date(collection));
    //lists movies from a specified year

  } else if (yargsObj.search) {
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    console.log(await newMovie.search(collection));
    //lists a movie from a full specified search
  
  } else if (yargsObj.update) {
    const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year)
    console.log(await movie.update(collection));
    //update one database entry

  } else if (yargsObj.delete) {
    const movie = new Movie(yargsObj.title);
    console.log(await movie.delete(collection));
    //First way of deleting
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