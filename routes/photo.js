const express = require("express");
const router = express.Router();

const {
  createPhoto,
  getAllPhotos,
  getPhoto,
  media,
  getPhotoById,
  removeProduct,
} = require("../controllers/photo");
const {
  isSignedIn,
  isAdmin,
  isAuthenticated,
  getUserById,
} = require("../controllers/auth");

// all params
router.param("userId", getUserById);
router.param("photoId", getPhotoById);

// all routes
router.post(
  "/photo/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createPhoto
);

router.get("/photos", getAllPhotos);

router.get("/photo/:photoId", media, getPhoto); //get product image

// router.get("/product/:productId", getProduct);
// router.get("/product/photo/:productId", media, getProduct); //get product image

// router.put(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateProduct
// );

router.delete(
  "/photo/:photoId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

module.exports = router;
