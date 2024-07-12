export function formatDate(date, format) {
  const optionsShort = { day: '2-digit', month: '2-digit' };
  const optionsLong = { day: '2-digit', month: 'short', year: 'numeric' };
  const options = format === 'short' ? optionsShort : optionsLong;
  
  return new Date(date).toLocaleDateString('en-GB', options).replace(/ /g, '/').replace(',', '');
}

export function totalAmount(products) {
  return products.reduce((total, product) => total + product.price, 0);
}

export function convertToUAH(amount) {
  const exchangeRate = 40;
  return (amount * exchangeRate).toFixed(2);
}
