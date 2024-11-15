const path = require('path');
const products = require('./products'); // Import the products module
const autoCatch = require('lib/auto-catch')


/**
 * Serve the root HTML file
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Add CORS headers

    const { offset = 0, limit = 25, tag } = req.query;

    try {
        const data = await products.list({
            offset: Number(offset),
            limit: Number(limit),
            tag,
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Get a specific product by ID
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Add CORS headers

    const { id } = req.params;

    try {
        const product = await products.get(id); // Use the correct module
        if (!product) {
            return next(); // Call next middleware if product not found
        }

        return res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createProduct (req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct, 
});
