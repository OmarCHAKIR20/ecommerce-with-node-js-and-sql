const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  /* res.sendFile(path.join(rootDir ,'views','shop.html')) for normal html */
  Product.fetchAll()
  .then(([rows , fieldData])=>{
   
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Products",
      path: "/",
    });
  })
  .catch(err=>{
    console.log(err)
  });
  
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows , fieldData])=>{
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "My shop",
      path: "/products",
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
         if (cartProductData) {
             cartProducts.push({ productData : product , qty : cartProductData.qty })
         }
      }
      res.render("shop/cart", 
      { path: "/cart",
       pageTitle: "Your cart",
       products : cartProducts
       });
    })
  })
  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([product])=>{
    res.render("shop/product-detail", {
      prod: product[0],
      pageTitle: "Product Detail",
      path: "/products",
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

exports.postCartDeleteProduct =(req , res , next)=>{
   const prodId = req.body.productId;
   Product.findById(prodId , product =>{
     Cart.deleteProduct(prodId , product.price);
     res.redirect("/cart");
   })
}
