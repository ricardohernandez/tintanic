import { useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Tarjetas Corporativas Premium',
      category: 'Impresión',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      description: 'Pack de 500 tarjetas de presentación impresas en papel 300gr',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Estampado DTF en Tela',
      category: 'Estampados',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
      description: 'Estampado de alta calidad en prendas personalizadas',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Corte Láser Acrílico',
      category: 'Corte Láser',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1609708536965-49cdc976ffe4?w=500&h=500&fit=crop',
      description: 'Placas y señalética personalizadas con corte láser',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Flyers y Folletos',
      category: 'Impresión',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop',
      description: '1000 volantes impresos a todo color en papel mate',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Chapitas Promocionales',
      category: 'Estampados',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      description: 'Pack 100 chapitas personalizadas con tu diseño',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Lonas y Pendones',
      category: 'Impresión',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1587985294348-c5378b50910b?w=500&h=500&fit=crop',
      description: 'Lonas de alta resolución para exteriores',
      rating: 4.9
    },
  ]

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-lg fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Tintanic</h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <a href="#productos" className="hover:text-blue-600 transition">Productos</a>
            <a href="#servicios" className="hover:text-blue-600 transition">Servicios</a>
            <a href="#contacto" className="hover:text-blue-600 transition">Contacto</a>
          </div>

          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* CARRITO MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-full md:w-96 h-screen overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-blue-600 font-bold">${item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                          <span className="px-3">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-700">×</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                    Proceder al Pago
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Soluciones Gráficas de Calidad
              </h1>

              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Impresión profesional, estampados personalizados, cortes láser y mucho más. 
                Todo lo que necesitas para potenciar tu marca en un solo lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#productos" 
                   className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg">
                  Explorar Productos
                </a>

                <a href="#contacto" 
                   className="px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition border-2 border-white">
                  Contactar Ahora
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-100">Clientes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">10+</p>
                  <p className="text-blue-100">Años</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">5★</p>
                  <p className="text-blue-100">Calificación</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-3xl opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=600&fit=crop" 
                  alt="Productos" 
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS SECTION */}
      <section id="productos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Productos de alta calidad con precios competitivos. Compra directamente desde nuestra tienda online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition group">
                <div className="relative overflow-hidden rounded-t-2xl h-64">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 font-semibold">{product.rating}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Precio</p>
                      <p className="text-3xl font-bold text-blue-600">${product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Servicios Personalizados
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl">
                🖨️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Impresión Digital</h3>
              <p className="text-gray-700 mb-4">
                Impresión de alta resolución para documentos, tarjetas y material promocional.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Tarjetas corporativas</li>
                <li>✓ Flyers y catálogos</li>
                <li>✓ Lonas y pendones</li>
              </ul>
            </div>

            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border-2 border-pink-200 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl">
                👕
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Estampados</h3>
              <p className="text-gray-700 mb-4">
                Personalización de prendas y productos con DTF, sublimación y más técnicas.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ DTF y sublimación</li>
                <li>✓ Chapitas promocionales</li>
                <li>✓ Prendas personalizadas</li>
              </ul>
            </div>

          
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl">
                ⚙️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Corte Láser</h3>
              <p className="text-gray-700 mb-4">
                Corte y grabado láser en MDF, acrílico y otros materiales.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Señalética personalizadas</li>
                <li>✓ Placas corporativas</li>
                <li>✓ Merchandising</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Necesitas una Cotización?</h2>
          <p className="text-gray-300 text-lg mb-10">
            Contáctanos por WhatsApp o correo para proyectos personalizados y cotizaciones especiales.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-800 p-6 rounded-2xl">
              <p className="text-3xl font-bold text-blue-400 mb-2">tinttanic@gmail.com</p>
              <p className="text-gray-400">Correo electrónico</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl">
              <p className="text-3xl font-bold text-green-400 mb-2">+56 9 9401 4008</p>
              <p className="text-gray-400">WhatsApp</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/56994014008"
               className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition text-lg">
              💬 Enviar Mensaje por WhatsApp
            </a>
            <a href="mailto:tinttanic@gmail.com"
               className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg">
              ✉️ Enviar Correo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 bg-gray-100 border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold mb-2">Tintanic Soluciones Gráficas</p>
          <p className="text-sm">© 2025 Todos los derechos reservados • Impresión • Estampados • Corte Láser</p>
        </div>
      </footer>
    </>
  )
}

export default App
