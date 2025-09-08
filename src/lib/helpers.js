export const transformBigInt = (value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

export const transformObjectBigInt = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => transformObjectBigInt(item));
  }
  const newObj = {};
  for (const key in obj) {
    newObj[key] = transformBigInt(obj[key]);
  }
  return newObj;
};

export const formatNumber = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString("id-ID");
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
