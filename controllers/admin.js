const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProdcut = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const product = new Product(null ,title, price, image, description);
  product.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>{
    console.log(err)
  });

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode,
    });
  });

  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImage = req.body.image;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedPrice,
    updatedImage,
    updatedDesc
  );

  updatedProduct.save();
  res.redirect("/admin/products");

};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "admin Products",
      path: "/admin/products",
    }); /* since we mentiened that all the views are in the view folder */
  });
};

exports.postDeleteProduct = (req , res , next)=>{
         const prodId = req.body.productId;
         Product.deleteById(prodId);
         res.redirect('/admin/products')
}
