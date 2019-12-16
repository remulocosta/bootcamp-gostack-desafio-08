import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

function Main({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function LoandProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    LoandProducts();
  }, []);

  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <Container>
      <>
        <FlatList
          horizontal
          data={products}
          extraData={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Product key={item.id}>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <AddButton onPress={() => handleAddProduct(item.id)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" color="#FFF" size={20} />
                  <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
                </ProductAmount>
                <AddButtonText>ADICIONAR</AddButtonText>
              </AddButton>
            </Product>
          )}
        />
      </>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Main Page',
};

Main.propTypes = {
  amount: PropTypes.shape().isRequired,
  addToCartRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
