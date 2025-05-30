import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useQueryClient } from "@tanstack/react-query";

// Renders errors or successful transactions on the screen.
// function Message({ content }:{content:any}) {
//   return <p>{content}</p>;
// }

interface cartPaymentType {
  id: string;
  quantity: number;
  amount: number;
}
interface PaymentProps {
  cart: cartPaymentType[];
}

function Payment({ cart }: PaymentProps) {
  const initialOptions = {
    clientId:
      "ASCdRwy8AZjLU406aPa_GIUZTw8ilk8mOSfvD1aVhssuHhPRkY3wuZz1GZ8Zd2zGtaAcPNvVJbAG041g",
    "enable-funding": "venmo",
    "buyer-country": "US",
    currency: "USD",
    components: "buttons",
  };

  const token = sessionStorage.getItem("token");
  const queryClient = useQueryClient();

  return (
    <div className="paypal-button-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              const response = await fetch(
                "http://localhost:3000/api/payments/orders",

                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ cart }), // Use the cart prop here
                }
              );

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `http://localhost:3000/api/payments/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              await fetch(`http://localhost:3000/api/Cart/CartToOrders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              queryClient.invalidateQueries({
                queryKey: ["getAllCartItemsQuery"],
              });
              const orderData = await response.json();

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              }
              // } else {
              //   const transaction =
              //     orderData.purchase_units[0].payments.captures[0];
              // }
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
