export const transformBigInt = (value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

export const formatNumber = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString("id-ID");
};
