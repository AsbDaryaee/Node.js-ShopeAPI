# Overview

* This is a practice project based on https://github.com/john-smilga/node-express-course.

This code implements two functionalities related to MongoDB and Node.js. Firstly, it provides an API to retrieve product data from a MongoDB database using Node.js and Express. The `getAllProducts` function allows the user to specify flexible filtering and sorting options based on query parameters. Secondly, it includes a script to add data from a JSON file into a MongoDB database.

## Retrieving Product Data API

### API Endpoints

The following API endpoint is available:

- GET `/api/v1/products`: This endpoint retrieves products from the database based on user-specified filtering and sorting options.

### `getAllProducts` Function

This function retrieves products based on user-specified filtering and sorting options. It accepts the following query parameters:

- `featured`: If this parameter is set to "true", only featured products will be returned; otherwise, all products will be returned.
- `company`: Filters products by company name.
- `name`: Filters products by name. Allows partial matches using regular expressions.
- `sort`: Sorts products based on user-specified criteria in ascending or descending order.
- `select`: Allows selecting specific fields to return.
- `limit`: Limits the number of products returned.
- `filter`: Allows filtering products based on user-specified criteria.

The function returns a JSON response containing the message 'Successful', the number of products found, and an array of products with their name, price, and other details based on the specified filtering and sorting options.

## Implementation Details

- The function first extracts the query parameters from the request object.
- It then creates an empty `queryObject` that will be used to build the MongoDB query based on the queried parameters.
- For each query parameter, the function checks if it exists and adds it to the `queryObject` with appropriate value and operator.
- If a filter parameter is provided, it is parsed to extract the filtering criteria and add them to the `queryObject`.
- The `Product.find()` method is used to retrieve products based on the constructed `queryObject`.
- The resultset of the query is then sorted, selected, and limited as per the requested parameters.
- Finally, the retrieved products are returned as a JSON response with a message indicating success or failure.

## Adding Data from a JSON File to MongoDB

### Implementation Details

- The `dotenv` package is used to load environment variables from a `.env` file in the root directory.
- The `connectDB` module establishes connection with the MongoDB database using the provided URI in the environment variable `MONGO_URI`.
- The `Product.deleteMany()` method is used to delete all existing documents from the `products` collection in the database.
- The `Product.create()` method is used to add new products to the `products` collection by reading data from a local JSON file located at `./src/data/products.json`.
- Once the data has been added successfully to the database, a message indicating successful completion is displayed on the console.

## Conclusion

This code provides flexible APIs to retrieve and manipulate product data stored in a MongoDB database. The `getAllProducts` function allows the user to specify filtering and sorting options based on query parameters, while the script to add data from a JSON file into MongoDB provides a straightforward way to populate a database. By modifying the code, the script can be extended to read data from other file formats or sources for populating the database.
