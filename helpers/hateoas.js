require("dotenv").config({ path: "./.env" });

const formatHATEOAS = async (jewel) => {
  const domain = process.env.DOMAIN;
  const PORT = process.env.PORT;

  try {
    const results = jewel.map((j) => {
      return {
        name: j.nombre,
        href: `${domain}:${PORT}/joyas/${j.id}`,
      };
    });
    const total = jewel.length;

    const HATEOAS = {
      total,

      results,
    };
    return HATEOAS;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { formatHATEOAS };
