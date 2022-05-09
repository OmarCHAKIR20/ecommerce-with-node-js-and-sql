const fs = require("fs");
const path = require("path");
const db = require("../util/database")


const Cart = require("./cart")
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);



module.exports = class Product {
  constructor(id, title, price, image, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
     return db.execute(
      'INSERT INTO products (title , price ,  imageUrl , description ) VALUES(? , ? , ? , ? )' ,
      [this.title ,this.price,this.image, this.description,]
     );
  }

  static fetchAll() {
      return db.execute("SELECT * FROM PRODUCTS");
  }

  static findById(id) {
     return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }

  static deleteById(id){
    
  }
};
