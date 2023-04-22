const Product = require("../models/product");

// ************ SANDBOX *************

const getAllProductsStatic = async (req, res) => {
  const allProducts = await Product.find({ price: { $gt: 100 } })
    .select("name  price")
    .sort("-price");

  res.status(200).json({
    message: "Successful",
    count: allProducts.length,
    Products: allProducts,
  });
};

// ************ MAIN *************

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, limit, filter } = req.query;
  const queryObject = {};

  if (featured) {
    // It's called ternary operator
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (filter) {
    console.log(filter);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|=|<=|>=)\b/g;
    let regFilter = filter.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });
    console.log(regFilter);
    const options = ["price", "rating"];
    finalFilter = regFilter.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    // Default Sort in case of user doesn't provide sort
    result = result.sort("createdAt");
  }

  if (select) {
    const selectList = select.split(",").join(" ");
    console.log(`Select ${selectList}`);
    result = result.select(selectList);
  }

  if (limit) {
    limitNum = Number(limit);
    result = result.limit(limitNum);
  } else {
    // Default limit
    result = result.limit(15);
  }

  const products = await result.exec();

  res.status(200).json({
    message: "Successful",
    count: products.length,
    Products: products,
  });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
