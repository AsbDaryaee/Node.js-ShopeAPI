Overview:
This code implements an API to retrieve products data from a MongoDB database using Node.js and Express. The getAllProducts function provides flexible filtering and sorting options based on user input through query parameters.

API Endpoints:
The following API endpoint is available:

    GET /api/v1/products - This endpoint retrieves products from the database based on user-specified filtering and sorting options.

Function:

    getAllProducts: This function retrieves products based on user-specified filtering and sorting options. It accepts the following query parameters:

    featured: If this parameter is set to "true", only featured products will be returned; otherwise, all products will be returned.
    company: Filters products by company name.
    name: Filters products by name. Allows partial matches using regular expressions.
    sort: Sorts products based on user-specified criteria in ascending or descending order.
    select: Allows selecting specific fields to return.
    limit: Limits the number of products returned.
    filter: Allows filtering products based on user-specified criteria.

The function returns a JSON response containing the message 'Successful', the number of products found, and an array of products with their name, price, and other details based on the specified filtering and sorting options.

Implementation:

    The function first extracts the query parameters from the request object.
    It then creates an empty queryObject that will be used to build the MongoDB query based on the queried parameters.
    For each query parameter, the function checks if it exists and adds it to the queryObject with appropriate value and operator.
    If a filter parameter is provided, it is parsed to extract the filtering criteria and add them to the queryObject.
    Product.find() method is used to retrieve products based on the constructed queryObject.
    The resultset of the query is then sorted, selected, and limited as per the requested parameters.
    Finally, the retrieved products are returned as a JSON response with a message indicating success or failure.

Conclusion:
This code provides flexible APIs to retrieve products data from a MongoDB database using Node.js and Express. The getAllProducts function implements a dynamic query builder based on user input through query parameters.
