const Product = require('../models/product')

// ************ SANDBOX *************

const getAllProductsStatic = async (req, res) => {
    const allProducts = await Product.find().select('name  price').exec()
    res.status(200).json({ message: "Successful", count: allProducts.length, Products: allProducts })
}


// ************ MAIN *************

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, select } = req.query
    const queryObject = {}

    if (featured) {
        // It's called ternary operator
        queryObject.featured = featured === "true" ? true : false
    }
    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    console.log(queryObject);

    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        // Default Sort in case of user doesn't provide sort
        result = result.sort('createdAt')
    }

    if (select) {
        const selectList = select.split(',').join(' ')
        console.log(`Select ${selectList}`);
        result.select(selectList)
    }

    console.log(`Sort: ${sort}`);

    const products = await result.exec()


    res.status(200).json({ message: "Successful", count: products.length, Products: products })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}