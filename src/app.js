const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const Movie = require("./utils");

const app = async (yargsObj) => {
  const collection = await connection();
  if (yargsObj.create) {
    console.log("C");
    const newMovie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.year);
    await newMovie.add(collection);
    //add a movie from the terminal into an object and save in database
  } else if (yargsObj.read) {
    console.log("R");
    const results = await collection.find().toArray();
    console.log(results);
    //list items from database
  } else if (yargsObj.update) {
    console.log("U");
    //update one database entry
  } else if (yargsObj.delete) {
    console.log("D");
    //delete one database entry
  } else {
    console.log("Incorrect command");
  }
  await client.close();
};

app(yargs.argv);
