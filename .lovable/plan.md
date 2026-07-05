## Plan

### 1. Fix the “working system” issue for orders and WhatsApp
- Replace the current fragile `window.open`/redirect flow with explicit action links/buttons that reliably open WhatsApp with the full order message.
- After the customer enters address and confirms payment method, show a final order screen with:
  - Order ID
  - Full total
  - A clear “Send order on WhatsApp” button
  - A fallback “Copy order details” button in case WhatsApp is blocked by the browser
- Keep your WhatsApp destination as `+91 8097132801`.

### 2. Fix UPI behavior realistically
- Important limitation: a normal website cannot “ask for the customer’s UPI ID” and send a payment request directly from your UPI account without a real payment gateway/merchant integration.
- I will make UPI work as a deep-link payment intent instead:
  - Opens the customer’s installed UPI app
  - Pre-fills merchant UPI ID `8097132801@fam`
  - Pre-fills Sofi Crafts as merchant name
  - Pre-fills the cart total
  - Includes the order ID in the payment note
- Add fallback options:
  - Copy UPI ID
  - Copy total amount
  - Then prompt the customer to send the order details on WhatsApp after payment.

### 3. Improve checkout order flow
- Cash on Delivery:
  - Create the order summary
  - Open/send WhatsApp order details
  - Show confirmation only after the WhatsApp step is available
- UPI:
  - Create the order summary
  - Open UPI app with amount pre-filled
  - Provide WhatsApp order-send button and fallback copy controls
- Avoid claiming the order was sent if the browser blocks WhatsApp.

### 4. Add uploaded PDF catalog pieces into the marketplace
- Use the parsed uploaded PDFs:
  - `cord_sets.pdf`: 5 cord set / kurta-style pieces
  - `pashmina_stoles.pdf`: 3 pashmina stole pieces
- Add the new category: `Crush Cotton Kaftans`.
- Add meaningful product names instead of generic labels, for example names inspired by color, motif, Kashmir landscape, craft, and mood.
- Add long descriptions for each new item so product cards still feel premium and Kashmiri.

### 5. Product imagery from PDFs
- Use the extracted PDF images as actual product visuals where possible, rather than only placeholder symbols.
- Store those extracted images as app assets and connect them to the marketplace products.
- Update product cards/cart/checkout summaries to show real product images when available, with the existing icon fallback retained.

### 6. Marketplace updates
- Update category filters so `Crush Cotton Kaftans` appears.
- Ensure all new products appear in search, sort, cart, and checkout.
- Keep the Kashmiri luxury marketplace styling intact.

### 7. Verify
- Check the collection page shows the added products and new category.
- Check adding products to cart works.
- Check checkout creates correct WhatsApp text.
- Check UPI link contains the correct UPI ID, amount, merchant name, and order ID.

## Note on true payment requests
If you want automatic UPI collect requests, verified payment status, and order storage without depending on customer WhatsApp/browser behavior, the site needs Lovable Cloud plus a supported payment provider/backend workflow. For now I’ll fix the current no-backend flow so it works as reliably as a website can with WhatsApp + UPI deep links.