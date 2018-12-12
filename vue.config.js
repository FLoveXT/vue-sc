module.exports = {
  //解决build后，找不到资源的问题
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/"
};
