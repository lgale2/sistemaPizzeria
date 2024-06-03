import Product from "../models/product.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductId = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = await Product.findByPk(id);
    if (!productId)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(productId);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveProduct = async (req, res) => {
  try {
    const product = {
      Name: req.body.Name,
      Price: req.body.Price,
      Unit: req.body.Unit,
      Tax: req.body.Tax,
    };

    const saveProd = await Product.create(product);
    res.status(200).json({ message: "Saved product! " + product.Name });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = await Product.findByPk(id);
    if (!productId)
      return res.status(404).json({ message: "Product not found" });
    await Product.update(req.body, { where: { Code: id } });
    res.status(200).json({ message: "Updated product!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = await Product.findByPk(id);
    if (!productId)
      return res.status(404).json({ message: "Product not found" });
    await Product.destroy({ where: { Code: id } });
    res.status(200).json({ message: "Deleted Product!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
