function formatToINR(number) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",

    maximumFractionDigits: 0,
  });

  return formatter.format(number);
}

export default formatToINR;
