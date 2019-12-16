import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import colors from '../../styles/colors';

import {
  Container,
  ContainerCart,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart({ products, total, removeFromCart, updateAmountRequest }) {
  // const Uproducts = [
  //   {
  //     id: 1,
  //     image:
  //       'https://static.netshoes.com.br/produtos/kit-3-pares-de-sapatenis-sapatofran-sw-masculino/56/HAP-0151-256/HAP-0151-256_detalhe2.jpg?ims=326x',
  //     title:
  //       'Kit 3 Pares de Sapatênis SapatoFran SW Masculino - Preto e Marrom',
  //     priceFormatted: 'R$ 123,00',
  //     amount: 2,
  //     subtotal: 'R$ 256,00',
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://static.netshoes.com.br/produtos/sapatenis-polo-joy-confortavel-masculino/78/FSO-0059-178/FSO-0059-178_detalhe2.jpg?ims=326x',
  //     title: 'Sapatênis Polo Joy Confortável Masculino - Preto e Amarelo',
  //     priceFormatted: 'R$ 122,00',
  //     amount: 2,
  //     subtotal: 'R$ 254,00',
  //   },
  // ];

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Container>
      <ContainerCart>
        {products.length ? (
          <>
            <Products>
              {products.map(product => (
                <Product key={product.id}>
                  <ProductInfo>
                    <ProductImage source={{ uri: product.image }} />
                    <ProductDetails>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductPrice>{product.priceFormatted}</ProductPrice>
                    </ProductDetails>
                    <ProductDelete onPress={() => removeFromCart(product.id)}>
                      <Icon
                        name="delete-forever"
                        size={24}
                        color={colors.primary}
                      />
                    </ProductDelete>
                  </ProductInfo>
                  <ProductControls>
                    <ProductControlButton onPress={() => decrement(product)}>
                      <Icon
                        name="remove-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductAmount value={String(product.amount)} />
                    <ProductControlButton onPress={() => increment(product)}>
                      <Icon
                        name="add-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                  </ProductControls>
                </Product>
              ))}
            </Products>
            <TotalContainer>
              <TotalText>TOTAL</TotalText>
              <TotalAmount>{total}</TotalAmount>
              <Order>
                <OrderText>FINALIZAR PEDIDO</OrderText>
              </Order>
            </TotalContainer>
          </>
        ) : (
          <EmptyContainer>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        )}
      </ContainerCart>
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
