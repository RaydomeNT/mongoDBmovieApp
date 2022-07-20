class Movie {
  constructor(title, actor = "Not specified", year = "Unknown") {
    this.title = title;
    this.actor = actor;
    this.year = year;
  }
  async add(collection) {
    await collection.insertOne(this);
    //need to save 'this' into database
  }

  async list(collection) {
    if (this.title !== "Not specified") {
      return await collection.find({ title: this.title }).toArray();
    } else if (this.actor !== "Not specified") {
      return await collection.find({ actor: this.actor}).toArray();
    } else if (this.year !== "Not specified") {
      return await collection.find({year: this.year}).toArray();
    } else {
   return await collection.findOne().toArray();
    }
  }

  async update(collection) {
    const response = await collection.updateOne(
      { title: this.title },
      // { $set: { actor: this.actor } },
      // { title: this.title },
      { $set: { year: this.year }},
      // { title: this.title },
      // { $set: { title: this.title }}
    );
    if (response.modifiedCount > 0) {
      return "Updated";
    } else {
      return "Not updated";
    }
  }

  async delete(collection) {
    const response = await collection.deleteOne({ title: this.title });
    if (response.deletedCount > 0) {
      return "Deleted";
    } else {
      return "Nothing to delete";
    };
  };
};

module.exports = Movie;