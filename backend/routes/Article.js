const express = require("express");
const router = express.Router();
const articleController = require("../controllers/Article");

// Route : Récupérer tous les articles
router.get("/", articleController.getAllArticles);

// Route : Récupérer un article par nom
router.get("/search", articleController.getArticleByName);
// Route : Ajouter un nouvel article
router.post("/", articleController.createArticle);
module.exports = router;
