const pool = require("../config/pool");
const format = require("pg-format");

const getAllJewels = async ({ limits = 6, page = 1, order_by = "id_ASC" }) => {
  const [field, order] = order_by.split("_");
  const offset = (page - 1) * limits;
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    field,
    order,
    limits,
    offset
  );

  const { rows: jewels } = await pool.query(formattedQuery);
  return jewels;
};

const getFilteredJewels = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filters = [];
  let values = [];
  if (precio_max) {
    filters.push("precio <= $1");
    values.push(precio_max);
  }
  if (precio_min) {
    filters.push("precio >= $2");
    values.push(precio_min);
  }
  if (categoria) {
    filters.push("categoria = $3");
    values.push(categoria);
  }
  if (metal) {
    filters.push("metal = $4");
    values.push(metal);
  }
  let query = "SELECT * FROM inventario";
  if (filters.length > 0) {
    filters = filters.join(" AND ");
    query += ` WHERE ${filters}`;
  }
  const { rows: inventory } = await pool.query(query, values);
  return inventory;
};

module.exports = {
  getAllJewels,
  getFilteredJewels,
};
