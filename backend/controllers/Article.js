const Article = require("../models/Article");

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles", error });
  }
};

// Récupérer un article par nom
exports.getArticleByName = async (req, res) => {
  const { name } = req.query;
  try {
    const article = await Article.findOne({ name });
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche de l'article", error });
  }
};

// Ajouter un nouvel article
exports.createArticle = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  try {
    const newArticle = new Article({ name, description, imageUrl });
    const savedArticle = await newArticle.save();
    res.status(201).json({ message: "Article ajouté avec succès", article: savedArticle });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'article", error });
  }
};
