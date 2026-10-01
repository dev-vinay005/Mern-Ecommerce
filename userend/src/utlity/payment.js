import axios from "axios";

export const openRazorpay = async (amount, orderId, checkoutId, navigate) => {

    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;
    const options = {
        key: RAZORPAY_KEY_ID,
        secret: RAZORPAY_KEY_SECRET,

        amount: amount, // already in paise from backend
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
            const razorpay_order_id = response.razorpay_order_id;
            const razorpay_payment_id = response.razorpay_payment_id;
            const razorpay_signature = response.razorpay_signature;
            try {
                const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                console.log("Payment successful", res.data);
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                console.log("order placed successfully", res.data);
                navigate(`/order-confirmation?orderid=${res.data._id}`)
            } catch (err) {
                console.log(err);

            }
        },
        prefill: {
            name: "Test User",
            email: "test@example.com",
        },

        theme: {
            color: "#3399cc",
        },

        modal: {
            ondismiss: function () {
                console.log("Payment popup closed")
            }
        }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
}