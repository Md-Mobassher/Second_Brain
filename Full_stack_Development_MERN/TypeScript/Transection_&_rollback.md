```
const customer = {
	name: "jhon doe",
	email: "john.doe@example.com",
	address: "anddorkilla banddorban 123",
};
// product এর তথ্য
const products = [
	{ name: "iPhone 15", price: 999, quantity: 2 },
	{ name: "Walton premio zx9", price: 399, quantity: 5 },
];

let newCreatedOrder = null;
const session = await mongoose.startSession();

try {
	session.startTransaction();
	const orderId = await generateOrderId();
	let customerId;

	const existingCustomer = await Customer.findOne({
		email: customer.email
	});

  if (existingCustomer) {
	  customerId = existingCustomer._id;
  } else {
	  const newCustomer = await Customer.create([customer], { session });

	  customerId = newCustomer[0]._id; }
	  const newOrder = {
		  orderId: orderId,
		  customerId: customerId,
		  products: [], totalAmount: 0,
	 };

	for (const product of products) {
		const newProduct = await Product.create([product], { session }
	);

	newOrder.products.push(newProduct[0]._id);
	newOrder.totalAmount += product.price * product.quantity; }

  const createdOrder = await Order.create([newOrder], { session });

  newCreatedOrder=createdOrder[0]);
  await session.commitTransaction();
  await session.endSession();

} catch (error) {
	await session.abortTransaction();
	await session.endSession();
	throw error;
}
```
