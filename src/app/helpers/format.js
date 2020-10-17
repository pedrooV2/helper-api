const { format: formatPrice } = new Intl.NumberFormat('pt-Br', {
  style: 'currency',
  currency: 'BRL',
});

export default formatPrice;
