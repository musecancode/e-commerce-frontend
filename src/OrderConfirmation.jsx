const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Your order has been placed successfully.
      </p>
      <p className="text-sm text-gray-500">
        A confirmation message has been sent. We’ll notify you once your order
        is shipped.
      </p>
    </div>
  );
};

export default OrderConfirmation;
