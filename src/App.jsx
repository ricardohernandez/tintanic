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
      <nav className="w-full bg-white border-b-2 border-amber-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-amber-700 rounded-lg flex items-center justify-center text-white font-bold text-sm border-2 border-amber-900">
              T
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-amber-900 tracking-tight">Tintanic</h1>
          </div>

          <div className="hidden md:flex items-center gap-6 font-medium text-amber-800 text-sm">
            <a href="#productos" className="hover:text-amber-600 transition border-b-2 border-transparent hover:border-amber-600 pb-1">Productos</a>
            <a href="#servicios" className="hover:text-amber-600 transition border-b-2 border-transparent hover:border-amber-600 pb-1">Servicios</a>
            <a href="#contacto" className="hover:text-amber-600 transition border-b-2 border-transparent hover:border-amber-600 pb-1">Contacto</a>
          </div>

          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative px-3 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-semibold flex items-center gap-2 text-sm border-2 border-amber-900">
            🛍️
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* CARRITO MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end">
          <div className="bg-white w-full md:w-80 h-screen overflow-y-auto shadow-2xl p-5 border-l-4 border-amber-900">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-900">Carrito</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Carrito vacío</p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="border border-amber-200 rounded-lg p-3 bg-amber-50">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover border border-amber-300" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900 text-sm">{item.name}</h3>
                          <p className="text-amber-700 font-bold text-sm">${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-1.5 py-0.5 bg-amber-700 text-white rounded text-xs hover:bg-amber-800">−</button>
                            <span className="px-2 text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-1.5 py-0.5 bg-amber-700 text-white rounded text-xs hover:bg-amber-800">+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-600 hover:text-red-800 font-bold">×</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-amber-300 pt-3 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-amber-900">
                    <span>Total:</span>
                    <span className="text-amber-700">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-amber-700 text-white py-2 rounded-lg font-bold hover:bg-amber-800 transition text-sm border-2 border-amber-900">
                    Pagar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-b-4 border-amber-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 inline-block bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-amber-900">
                ARTESANAL + MODERNO
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-amber-900 leading-tight mb-4 tracking-tight">
                Soluciones Gráficas Únicas
              </h1>

              <p className="text-amber-800 text-sm md:text-base mb-6 leading-relaxed max-w-sm">
                Impresión, estampados y cortes láser con toque artesanal. Diseños únicos que hacen la diferencia.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#productos" 
                   className="px-6 py-3 bg-amber-700 text-white font-bold rounded-lg hover:bg-amber-800 transition border-2 border-amber-900 text-sm text-center">
                  Ver Productos
                </a>

                <a href="#contacto" 
                   className="px-6 py-3 bg-white text-amber-700 font-bold rounded-lg border-2 border-amber-700 hover:bg-amber-50 transition text-sm text-center">
                  Consultar
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border-2 border-amber-300">
                  <p className="text-2xl font-black text-amber-900">500+</p>
                  <p className="text-xs text-amber-700">Clientes</p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-amber-300">
                  <p className="text-2xl font-black text-amber-900">10+</p>
                  <p className="text-xs text-amber-700">Años</p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-amber-300">
                  <p className="text-2xl font-black text-amber-900">5★</p>
                  <p className="text-xs text-amber-700">Puntuación</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl blur-2xl opacity-30 -z-10"></div>
                <div className="bg-white p-4 rounded-2xl border-4 border-amber-900 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=600&fit=crop" 
                    alt="Productos" 
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS SECTION */}
      <section id="productos" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-amber-900 mb-3 tracking-tight">Catálogo</h2>
            <p className="text-amber-700 text-sm max-w-md mx-auto">Productos de calidad con diseño artesanal</p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-orange-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white border-3 border-amber-900 rounded-xl overflow-hidden hover:shadow-lg transition group">
                <div className="relative overflow-hidden h-40">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-amber-700 text-white px-2 py-1 rounded-full text-xs font-bold border border-amber-900">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-black text-amber-900 mb-2 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-600 font-bold">★</span>
                    <span className="text-amber-700 font-bold text-sm">{product.rating}</span>
                  </div>

                  <p className="text-amber-800 text-xs mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <p className="text-amber-600 text-xs font-semibold">Precio</p>
                      <p className="text-xl font-black text-amber-900">${product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-amber-700 text-white font-bold rounded-lg hover:bg-amber-800 transition text-xs border-2 border-amber-900">
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
      <section id="servicios" className="py-12 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-amber-900 mb-3 tracking-tight">Nuestros Servicios</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-xl border-3 border-amber-900 hover:shadow-lg transition">
              <div className="text-3xl mb-3">🖨️</div>
              <h3 className="text-lg font-black text-amber-900 mb-2">Impresión</h3>
              <p className="text-amber-800 text-sm mb-4">
                Impresión de alta resolución en documentos, tarjetas y material promocional.
              </p>
              <ul className="text-amber-700 space-y-1 text-xs font-semibold">
                <li>✓ Tarjetas corporativas</li>
                <li>✓ Flyers y catálogos</li>
                <li>✓ Lonas y pendones</li>
              </ul>
            </div>

            
            <div className="bg-white p-6 rounded-xl border-3 border-amber-900 hover:shadow-lg transition">
              <div className="text-3xl mb-3">👕</div>
              <h3 className="text-lg font-black text-amber-900 mb-2">Estampados</h3>
              <p className="text-amber-800 text-sm mb-4">
                Personalización de prendas con DTF, sublimación y técnicas modernas.
              </p>
              <ul className="text-amber-700 space-y-1 text-xs font-semibold">
                <li>✓ DTF y sublimación</li>
                <li>✓ Chapitas promocionales</li>
                <li>✓ Prendas personalizadas</li>
              </ul>
            </div>

          
            <div className="bg-white p-6 rounded-xl border-3 border-amber-900 hover:shadow-lg transition">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-lg font-black text-amber-900 mb-2">Corte Láser</h3>
              <p className="text-amber-800 text-sm mb-4">
                Corte y grabado láser en MDF, acrílico y otros materiales.
              </p>
              <ul className="text-amber-700 space-y-1 text-xs font-semibold">
                <li>✓ Señalética personalizada</li>
                <li>✓ Placas corporativas</li>
                <li>✓ Merchandising único</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-12 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">¿Necesitas una Cotización?</h2>
          <p className="text-amber-100 text-sm mb-8">
            Contacta con nosotros para proyectos personalizados
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-800 p-5 rounded-xl border-2 border-amber-700">
              <p className="text-2xl font-black text-amber-100 mb-1">tinttanic@gmail.com</p>
              <p className="text-amber-200 text-sm">Email</p>
            </div>
            <div className="bg-amber-800 p-5 rounded-xl border-2 border-amber-700">
              <p className="text-2xl font-black text-amber-100 mb-1">+56 9 9401 4008</p>
              <p className="text-amber-200 text-sm">WhatsApp</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/56994014008"
               className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition border-2 border-green-700 text-sm">
              💬 WhatsApp
            </a>
            <a href="mailto:tinttanic@gmail.com"
               className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition border-2 border-blue-700 text-sm">
              ✉️ Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-amber-900 bg-amber-100 border-t-4 border-amber-900">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-black mb-1 text-sm">Tintanic Soluciones Gráficas</p>
          <p className="text-xs">© 2025 — Impresión • Estampados • Corte Láser</p>
        </div>
      </footer>
    </>
  )
}

export default App
