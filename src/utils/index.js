class Movie {
  constructor(title, actor = "Not specified", year = "Unknown") {
    this.title = title;
    this.actor = actor;
    this.year = year;
    //export multiple functions in a class so you don't have to export and imort each one
  }

  async add(collection) {
    await collection.insertOne(this);
    //need to save 'this' into database
  }

  async list(collection) {
    if (this.title !== "Not specified") {
      return await collection.find({ actor: this.actor}).toArray();
    } else {
   return await collection.find().toArray();
    }
  } //lists all movies with a specific actor, does not list movies an actor is in if more than one actor is listed in that movie.

  async date (collection) {
    if (this.title !== "Not specified") {
      return await collection.find({ year: this.year }).toArray();
    } else {
      return await collection.find().toArray();
    }
  } //search a year it will return all movies released in that year

  async search (collection) {
    if (this.title !== "Not specified") {
      return await collection.find({ title: this.title }).toArray();
    } else if (this.actor !== "Not specified") {
      return await collection.find({ actor: this.actor}).toArray();
    } else if (this.year !== "Not specified") {
      return await collection.find({ year: this.year }).toArray();
    } else {
   return await collection.find().toArray();
    }
  } // search title, actor and year and it returns that one movie

  async update(collection) {
    const response = await collection.updateMany(
      { title: this.title },
      { $set: { actor: this.actor, year: this.year } },
    );
    if (response.modifiedCount > 0) {
      return "Updated";
    } else {
      return "Not updated";
    }
  } // update by title to change actor/year, doesn't update the title

  async delete(collection) {
    const response = await collection.deleteOne({ title: this.title });
    if (response.deletedCount > 0) {
      return "Deleted";
    } else {
      return "Nothing to delete";
    }
  } //delete whole listing by title
};

module.exports = Movie;