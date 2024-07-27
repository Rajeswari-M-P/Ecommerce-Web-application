import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { CartContext } from './CartContext';

const { Meta } = Card;

const Products = () => {
  const Productscard = [
    {
      productid: 1,
      name: 'Stylish Men\'s Casual Shoes',
      image: 'https://images.meesho.com/images/products/122265515/f4wy1_512.webp',
      details: 'Comfortable and stylish casual shoes for men.',
      price: 100,
    },
    {
      productid: 2,
      name: 'Ladies Embroidered Net Gown',
      image: 'https://images.meesho.com/images/products/243911072/spblc_512.webp',
      details: 'Beautiful embroidered net gown for special occasions.',
      price: 200,
    },
    {
      productid: 3,
      name: 'Elegant Saree',
      image: 'https://images.meesho.com/images/products/323146229/kgvzb_512.jpg',
      details: 'Elegant wooden double bed with a sturdy design.',
      price: 300,
    },
    {
      productid: 4,
      name: 'Samsung Refrigerator',
      image: 'https://5.imimg.com/data5/SELLER/Default/2020/8/CI/PL/PE/23082129/rf28n9780sg-tl-french-door-samsung-refrigerator.jpg',
      details: 'High-capacity Samsung refrigerator with advanced features.',
      price: 400,
    },
    {
      productid: 5,
      name: 'Stylish Casual Slippers',
      image: 'https://images.meesho.com/images/products/225131598/blbqv_512.jpg',
      details: 'Comfortable and stylish casual shoes for men.',
      price: 100,
    },
    {
      productid: 6,
      name: 'Charming bracelets',
      image: 'https://images.meesho.com/images/products/286233273/jiwri_512.jpg',
      details: 'Beautiful embroidered net gown for special occasions.',
      price: 200,
    },
    {
      productid: 7,
      name: 'Namyaa Hair Removal Cream',
      image: 'https://images.meesho.com/images/products/151174339/rbvul_512.jpg',
      details: 'Elegant wooden double bed with a sturdy design.',
      price: 300,
    },
    {
      productid: 8,
      name: 'Stylish bag for Women',
      image: 'https://images.meesho.com/images/products/212797287/lkojv_512.jpg',
      details: 'High-capacity Samsung refrigerator with advanced features.',
      price: 400,
    },
  ];




  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {Productscard.map((product) => (
          <Col key={product.productid} xs={24} sm={12} md={6} lg={6}>
            <Card
              hoverable
              style={{ marginBottom: 20 }}
              cover={<img alt={product.name} src={product.image} style={{ height: '300px', objectFit: 'cover' }} />}
            >
              <Meta title={product.name} description={`$${product.price}`} />
              <div style={{ marginTop: 10 }}>{product.details}</div>
              <div style={{ marginTop: 10 }}>
                <Button type="primary" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
