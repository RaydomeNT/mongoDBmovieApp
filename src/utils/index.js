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
    return await collection.find( this ).toArray();
  } 

  }


module.exports = Movie;
