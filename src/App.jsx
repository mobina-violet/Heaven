import { React, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { setProducts } from "./store";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductGrid from "./components/ProductGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductModal from "./components/productModal";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import products from "./data/Products";


//useEffect با آرایه خالی [] مثل یک ترمز می‌ماند که جلوی اجرای دوباره و دوباره کد را در رندرهای مجدد می‌گیرد.
function AppContent() {
  // فقط یک بار اجرا می‌شود
  useEffect(() => {
    store.dispatch(setProducts(products));
  }, []);
  // [] یعنی "فقط یک بار انجام بده، دیگر تکرار نکن"
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <section id="home">
        <Hero />
      </section>

      <About />
      <section id="catalog">
        <section className="container mx-auto px-4 py-8">
          <ProductGrid />
        </section>
      </section>
      <Contact />

      <Footer />
      <CartSidebar />
      <ProductModal />
      <CheckoutModal />
    </section>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
