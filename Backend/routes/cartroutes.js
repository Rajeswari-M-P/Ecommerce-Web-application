// routes/cartRoutes.js
const express = require('express');
const Cart = require('../../models/cart');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        await cart.update(req.body);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        await cart.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
