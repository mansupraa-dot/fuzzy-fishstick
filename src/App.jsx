import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CatalogRootPage from './pages/CatalogRootPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import PortfolioItemPage from './pages/PortfolioItemPage'
import ProcessPage from './pages/ProcessPage'
import ContactPage from './pages/ContactPage'
import PhilosophyPage from './pages/PhilosophyPage'
import BriefPage from './pages/BriefPage'
import ShowroomPage from './pages/ShowroomPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionItemPage from './pages/CollectionItemPage'
import DeliveryPage from './pages/DeliveryPage'
import ReturnPage from './pages/ReturnPage'

// Placeholder pages — will be fleshed out in later plans
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen pt-28 pb-20 max-w-6xl mx-auto px-6">
      <h1 className="text-2xl font-light text-ink">{title}</h1>
      <p className="text-ink-3 mt-2 text-sm">Страница в разработке.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogRootPage />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioItemPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionItemPage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/brief" element={<BriefPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<PlaceholderPage title="Поиск" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="*" element={<PlaceholderPage title="Страница не найдена" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
