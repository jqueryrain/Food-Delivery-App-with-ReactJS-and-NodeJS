const config = {
    Server_URL: String(import.meta.env.VITE_SERVER_URL),
    Server_product_image_URL: String(import.meta.env.VITE_SERVER_PRODUCT_IMAGE_URL),
    Server_category_image_URL: String(import.meta.env.VITE_SERVER_CATEGORY_IMAGE_URL),
    Stripe_publish_key: String(import.meta.env.VITE_STRIPE_PUSBLISH_KEY),
    Stripe_secret_key: String(import.meta.env.VITE_STRIPE_SCERET_KEY)

}
export default config