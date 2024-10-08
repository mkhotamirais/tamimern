const url = import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD;

const urlMysql =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV_MYSQL : import.meta.env.VITE_URL_PROD_MYSQL;

const urlSequelize =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_URL_DEV_SEQUELIZE
    : import.meta.env.VITE_URL_PROD_SEQUELIZE;

export { url, urlMysql, urlSequelize };
