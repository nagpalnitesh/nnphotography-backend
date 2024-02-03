const Product = require("../models/photo");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //filesystem

exports.getPhotoById = (req, res, next, id) => {
  Product.findById(id)
    .exec()
    .then((photo) => {
      if (!photo) {
        return res.status(400).json({
          error: "Photo not found",
        });
      }
      req.photo = photo;
      next();
    })
    .catch((err) => console.log(err));
};

exports.createPhoto = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with the image",
      });
    }
    // destructure the fields
    fields.name = fields.name.toString();
    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        error: `Please include all fields`,
      });
    }

    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 100 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size exceeds maximum",
        });
      }

      product.photo.data = fs.readFileSync(file.photo[0].filepath);
      product.photo.contentType = file.photo[0].mimetype;
    }
    // save the product to DB
    product
      .save()
      .then((saveProduct) => {
        if (!saveProduct) {
          return res.status(400).json({
            error: "Not able to save this product",
          });
        }
        res.json({ saveProduct });
      })
      .catch((err) => console.log(err));
  });
};

exports.media = (req, res, next) => {
  if (req.photo.photo.data) {
    res.set("Content-Type", req.photo.photo.contentType);
    return res.send(req.photo.photo.data);
  }
  next;
};

exports.getPhoto = (req, res) => {
  req.photo = undefined;
  return res.json(req.photo);
};

exports.getAllPhotos = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? parseInt(req.query.sort) : "_id";
  Product.find()
    .select("-photo")
    .sort([[sortBy, "desc"]])
    .limit(limit)
    .exec()
    .then((photos) => {
      if (!photos) {
        return res.status(400).json({
          error: "No photos found",
        });
      }
      res.json({ photos });
    })
    .catch((err) => console.log(err));
};

exports.removeProduct = (req, res) => {
  const product = req.photo;
  Product.deleteOne()
    .then((removeProduct) => {
      if (!removeProduct) {
        return res.status(400).json({
          error: `Unable to delete ${product.name} product`,
        });
      }
      res.json({
        message: `${product.name} is successfully deleted`,
      });
    })
    .catch((err) => console.log(err));
};
