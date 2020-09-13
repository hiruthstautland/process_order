import React from 'react';
import { withRouter } from 'react-router-dom';
import DetailedOrderCard from '../DetailedOrderCard';
import { ContentLoader } from '../ContentLoader';
import BtnOrderView from '../Buttons/BtnOrderView';
import BackButton from '../Buttons/BackButton';
import { Grid, Header, HeaderInfo, Main } from './Style';
import {
  FormattedDeadline,
  TimeText,
  GetPacking,
} from '../../utils/listOrderCardFunc';
import { OrderVariables } from '../ListOrderCard/Style';

const ProcessingOrderView = (props) => {
  const { order, now, handleChange, handleClick, pickedProducts } = props;

  let formattedDeadLine = FormattedDeadline(order, now);
  let timeText = TimeText(order);
  let getPacking = GetPacking(order, now);

  if (order && order.order_lines) {
    let orderElements = order.order_lines.map(
      ({ productName, orderQuantity, productId, imgUrl, color, size }) => {
        return (
          <DetailedOrderCard
            key={productId}
            cardTitle={productName}
            size={size}
            color={color}
            orderQuantity={orderQuantity}
            imgUrl={imgUrl}
            productId={productId}
            showButton={true}
            pickedProducts={pickedProducts}
            handleClick={handleClick}
          />
        );
      }
    );
    return (
      <Grid>
        <Header>
          <BackButton onClick={() => props.history.goBack()} />
          <HeaderInfo>
            {timeText}{' '}
            <OrderVariables expires={getPacking}>
              {formattedDeadLine}
            </OrderVariables>
            <br />
            Antall SKU plukket: {pickedProducts.length} av{' '}
            {order.order_lines.length}
          </HeaderInfo>
        </Header>
        <Main>{orderElements}</Main>
        <BtnOrderView
          pickedProducts={pickedProducts}
          handleChange={handleChange}
          order={order}
        />
      </Grid>
    );
  }
  return <ContentLoader />;
};
export default withRouter(ProcessingOrderView);
