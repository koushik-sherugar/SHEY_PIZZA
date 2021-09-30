import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, getAllOrders } from '../../actions/orderActions';
import Loading from '../Loading';
import { setAlert } from '../../actions/alert';
import Moment from 'react-moment';

const OrdersList = () => {
  const dispatch = useDispatch();
  const getAllOrdersState = useSelector((state) => state.getAllOrders);

  const { loading, error, orders } = getAllOrdersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const onClick = (orderid) => {
    dispatch(deliverOrder(orderid));
  };

  return (
    <div>
      <h1>Orders List</h1>

      <table className='table table-striped table-bordered table-responsive-sm'>
        <thead className='table-dark'>
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading && <Loading />}
          {error && dispatch(setAlert('Something went wrong!', 'danger'))}
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userid}</td>
                  <td>{order.orderAmount}</td>
                  <td>
                    <Moment format='DD/MM/YYYY'>{order.date}</Moment>
                  </td>
                  <td>
                    {!order.isDelivered ? (
                      <button
                        className='btn'
                        onClick={() => onClick(order._id)}
                      >
                        Deliver
                      </button>
                    ) : (
                      <h1>Delivered</h1>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
