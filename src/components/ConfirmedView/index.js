import React, { useEffect, useState } from 'react';
import {
  updateOrderStatus,
  updateRejectedOrderStatus,
} from '../../clientAPI/clientAPI';
import Accepted from './Accepted';
import Rejected from './Rejected';
import ErrorCard from '../ErrorAndInfoCard/ErrorCard';
import { ContentLoader } from '../ContentLoader/index';

const ConfirmedView = ({ match, history }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [rejected, setRejected] = useState(null);
  const [reason, setReason] = useState('');
  const { ordernumber, status } = match.params;

  const updateState = (status) => {
    try {
      if (status === 'rejected') {
        setRejected(true);
      } else if (status === 'packed') {
        setRejected(false);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    updateState(status);
    setLoading(false);

    return () => {
      setLoading(null);
    };
  }, [setConfirmed, status]);

  const handleButtonClick = async (newStatus) => {
    //only orders with status "packed are going through here"
    try {
      setRejected(false);
      setConfirmed(true);
      setReason(null);
      await updateOrderStatus(ordernumber, newStatus);

      return history.push(`/${newStatus}/${ordernumber}/`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeclinedReason = async (reason) => {
    try {
      await updateRejectedOrderStatus(ordernumber, status, reason);

      setConfirmed(true);
      setRejected(true);
      setReason(reason);
    } catch (error) {
      console.log(`Was not able to delete order! Error: ${error.message}`);
    }
  };
  if (loading) return <ContentLoader />;

  if (error) return <ErrorCard />;

  return (
    <React.Fragment>
      {rejected ? (
        <Rejected
          handleDeclinedReason={handleDeclinedReason}
          confirmed={confirmed}
          history={history}
          reason={reason}
        />
      ) : (
        <Accepted
          handleButtonClick={handleButtonClick}
          ordernumber={ordernumber}
          history={history}
          confirmed={confirmed}
        />
      )}
    </React.Fragment>
  );
};
export default ConfirmedView;
