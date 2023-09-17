import { toast } from 'react-toastify';

const TOAST_OPTIONS = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showApiError = (msg = 'API error') => {
  toast.error(msg, TOAST_OPTIONS);
};

const roundNumber = (num: number, decimalPlaces: number) => {
  return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

const ceilingNumber = (num: number, decimalPlaces: number) => {
  return Math.ceil(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

const floorNumber = (num: number, decimalPlaces: number) => {
  return Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

const absMaxChangePercent = (martket: string) => {
  switch (martket) {
    case 'HOSE':
      return 0.07;
    case 'HNX.NY':
      return 0.1;
    case 'HNX.UPCOM':
      return 0.15;
    default:
      return 0.07;
  }
};

const ceilingPrice = (reference: number, maxChangePercent: number) => {
  return ceilingNumber(reference * (1 + maxChangePercent), 1);
};

const floorPrice = (reference: number, maxChangePercent: number) => {
  return floorNumber(reference * (1 - maxChangePercent), 1);
};

export const getPriceProps = (close: number, reference: number, martket: string) => {
  const ref = roundNumber(reference, 1);
  const price = roundNumber(close, 1);
  const maxChangePercent = absMaxChangePercent(martket);
  const ceiling = ceilingPrice(ref, maxChangePercent);
  const floor = floorPrice(ref, maxChangePercent);

  let color;
  switch (true) {
    case price >= ceiling:
      color = '#F23AFF';
      break;
    case price <= floor:
      color = '#00C9FF';
      break;
    case price > floor && price < ref:
      color = '#FF0017';
      break;
    case price < ceiling && price > ref:
      color = '#0BDF39';
      break;
    default:
      color = '#f5cb42';
      break;
  }
  return { ceiling, floor, color };
};

export const formatNumber = (num: number, maxFractionDigits: number = 0) => {
  return (
    num?.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxFractionDigits,
    }) ?? ''
  );
};
