import { useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Tarjetas Corporativas',
      category: 'Impresión',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      description: 'Pack de 500 tarjetas premium en papel 300gr',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Estampado DTF',
      category: 'Estampados',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
      description: 'Estampado de alta calidad en prendas',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Corte Láser',
      category: 'Corte Láser',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1609708536965-49cdc976ffe4?w=500&h=500&fit=crop',
      description: 'Placas y señalética personalizadas',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Flyers y Folletos',
      category: 'Impresión',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop',
      description: '1000 volantes a todo color',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Chapitas',
      category: 'Estampados',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      description: 'Pack 100 chapitas personalizadas',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Lonas',
      category: 'Impresión',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1587985294348-c5378b50910b?w=500&h=500&fit=crop',
      description: 'Lonas de alta resolución',
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
      <nav className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
              T
            </div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight">Tintanic</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 font-semibold text-white text-xs">
            <a href="#productos" className="hover:text-yellow-300 transition-all hover:scale-105">Productos</a>
            <a href="#servicios" className="hover:text-yellow-300 transition-all hover:scale-105">Servicios</a>
            <a href="#contacto" className="hover:text-yellow-300 transition-all hover:scale-105">Contacto</a>
          </div>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all font-semibold flex items-center gap-2 text-sm border border-white/40 hover:scale-105">
            🛍️
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* CARRITO MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-end animate-fadeIn">
          <div className="bg-white w-full md:w-80 h-screen overflow-y-auto shadow-2xl p-4 animate-slideInRight">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent">Carrito</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-700 text-2xl font-bold transition">×</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-sm">Carrito vacío</p>
            ) : (
              <>
                <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="border border-purple-200 rounded-lg p-2.5 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-md transition">
                      <div className="flex gap-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-xs">{item.name}</h3>
                          <p className="text-pink-600 font-black text-xs">${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-xs hover:scale-105 transition font-bold">−</button>
                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-xs hover:scale-105 transition font-bold">+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-700 font-bold text-lg">×</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-purple-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm font-black">
                    <span className="text-gray-700">Total:</span>
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white py-2 rounded-lg font-black hover:scale-105 transition-all text-sm shadow-lg">
                    Pagar Ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-8 pb-8 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="mb-3 inline-block bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-white/40">
                CMYK • IMPRESIÓN PROFESIONAL
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 drop-shadow-lg">
                Soluciones Gráficas de Alto Impacto
              </h1>

              <p className="text-white/90 text-xs md:text-sm mb-5 leading-relaxed max-w-md">
                Impresión, estampados y cortes láser con tecnología de vanguardia. Colores vibrantes que destacan tu marca.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <a href="#productos"
                  className="px-5 py-2.5 bg-white text-purple-600 font-black rounded-lg hover:scale-105 transition-all shadow-lg text-xs text-center">
                  Ver Catálogo
                </a>

                <a href="#contacto"
                  className="px-5 py-2.5 bg-white/20 backdrop-blur-md text-white font-black rounded-lg border border-white/40 hover:bg-white/30 transition-all text-xs text-center">
                  Cotizar
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-lg border border-white/40">
                  <p className="text-xl font-black text-white">500+</p>
                  <p className="text-[10px] text-white/80 font-semibold">Clientes</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-lg border border-white/40">
                  <p className="text-xl font-black text-white">10+</p>
                  <p className="text-[10px] text-white/80 font-semibold">Años</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-lg border border-white/40">
                  <p className="text-xl font-black text-white">5★</p>
                  <p className="text-[10px] text-white/80 font-semibold">Rating</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-2xl blur-3xl opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-md p-3 rounded-2xl border-2 border-white/40 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=600&fit=crop"
                    alt="Productos"
                    className="rounded-xl w-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS SECTION */}
      <section id="productos" className="py-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Catálogo Premium</h2>
            <p className="text-gray-600 text-xs max-w-md mx-auto">Productos de calidad profesional</p>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all group border border-purple-100 hover:scale-105 duration-300">
                <div className="relative overflow-hidden h-32">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-lg">
                    {product.category}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-black text-gray-800 mb-1 line-clamp-1">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500 font-bold text-sm">★</span>
                    <span className="text-gray-700 font-bold text-xs">{product.rating}</span>
                  </div>

                  <p className="text-gray-600 text-[11px] mb-2 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <p className="text-gray-500 text-[10px] font-semibold">Desde</p>
                      <p className="text-lg font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">${product.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black rounded-lg hover:scale-110 transition-all text-xs shadow-lg">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Nuestros Servicios</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 rounded-xl border-2 border-cyan-200 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">🖨️</div>
              <h3 className="text-base font-black text-cyan-700 mb-2">Impresión</h3>
              <p className="text-cyan-600 text-xs mb-3">
                Impresión de alta resolución en documentos, tarjetas y material promocional.
              </p>
              <ul className="text-cyan-700 space-y-1 text-[11px] font-semibold">
                <li>✓ Tarjetas corporativas</li>
                <li>✓ Flyers y catálogos</li>
                <li>✓ Lonas y pendones</li>
              </ul>
            </div>


            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">👕</div>
              <h3 className="text-base font-black text-purple-700 mb-2">Estampados</h3>
              <p className="text-purple-600 text-xs mb-3">
                Personalización de prendas con DTF, sublimación y técnicas modernas.
              </p>
              <ul className="text-purple-700 space-y-1 text-[11px] font-semibold">
                <li>✓ DTF y sublimación</li>
                <li>✓ Chapitas promocionales</li>
                <li>✓ Prendas personalizadas</li>
              </ul>
            </div>


            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border-2 border-pink-200 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="text-base font-black text-pink-700 mb-2">Corte Láser</h3>
              <p className="text-pink-600 text-xs mb-3">
                Corte y grabado láser en MDF, acrílico y otros materiales.
              </p>
              <ul className="text-pink-700 space-y-1 text-[11px] font-semibold">
                <li>✓ Señalética personalizada</li>
                <li>✓ Placas corporativas</li>
                <li>✓ Merchandising único</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-8 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2">¿Necesitas una Cotización?</h2>
          <p className="text-white/90 text-xs mb-6">
            Contacta con nosotros para proyectos personalizados
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/30 hover:bg-white/20 transition">
              <p className="text-lg font-black text-white mb-0.5">tinttanic@gmail.com</p>
              <p className="text-white/80 text-xs">Email</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/30 hover:bg-white/20 transition">
              <p className="text-lg font-black text-white mb-0.5">+56 9 9401 4008</p>
              <p className="text-white/80 text-xs">WhatsApp</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/56994014008"
              className="px-5 py-2.5 bg-green-500 text-white font-black rounded-lg hover:bg-green-600 transition-all text-xs shadow-lg hover:scale-105">
              💬 WhatsApp
            </a>
            <a href="mailto:tinttanic@gmail.com"
              className="px-5 py-2.5 bg-blue-500 text-white font-black rounded-lg hover:bg-blue-600 transition-all text-xs shadow-lg hover:scale-105">
              ✉️ Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-4 text-center bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-black mb-0.5 text-xs bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tintanic Soluciones Gráficas</p>
          <p className="text-[10px] text-gray-400">© 2025 — Impresión • Estampados • Corte Láser</p>
        </div>
      </footer>
    </>
  )
}

export default App
