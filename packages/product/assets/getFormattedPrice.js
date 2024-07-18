// eslint-disable-next-line default-param-last
const getFormattedPrice = (price, currency, options = {}, locale = 'en-IN') => (currency
	? Number(price || 0).toLocaleString(locale, {
		style                 : 'currency',
		currency,
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
		...options,
	})
	: null);
export default getFormattedPrice;
