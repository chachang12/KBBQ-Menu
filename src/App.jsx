import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import emailjs from 'emailjs-com';

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({ firstName: '', email: '' });

  const menuItems = {
    BBQ: [
      { name: 'Bulgogi', price: 15 },
      { name: 'Dakgalbi', price: 12 },
      { name: 'LA Galbi', price: 20 },
      { name: 'Samgyeosal', price: 18 },
      { name: 'Buchaeasal', price: 17 },
    ],
    Sides: [
      { name: 'Gyeran jjim', price: 5 },
      { name: 'Soondubu', price: 6 },
      { name: 'Scallion Kimchi', price: 4 },
    ],
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (index) => {
    const itemToRemove = cart[index];
    setCart(cart.filter((_, i) => i !== index));
    setTotal(total - itemToRemove.price);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const templateParams = {
      firstName: formData.firstName,
      email: formData.email,
      cart: cart.map(item => `${item.name} - $${item.price}`).join(', '),
      total: total,
      supportEmail: 'cadchang@gmail.com', // Replace with your support email
      userEmail: formData.email // Add user email to templateParams
    };
  
    emailjs.send('service_8z1xp9b', 'template_mcc8ygx', templateParams, '5grmVDwUH09VV5o7u')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Order submitted successfully!');
  
        // Clear form
        setCart([]);
        setTotal(0);
        setFormData({ firstName: '', email: '' });
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to submit order. Please try again.');
      });
  };

  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-md text-white min-h-screen flex flex-col items-center m-4 rounded-xl outline outline-1 outline-gray-500">
      <h1 className="text-4xl font-bold mb-8 mt-2">VT-KBBQ</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            />
          </label>
        </div>
        <h2 className="text-2xl font-semibold mb-4">BBQ</h2>
        {menuItems.BBQ.map((item) => (
          <div key={item.name} className="mb-2">
            <button
              type="button"
              onClick={() => addToCart(item)}
              className="w-full p-2 bg-[#E60733] text-white rounded hover:bg-red-700"
            >
              {item.name} - ${item.price}
            </button>
          </div>
        ))}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Sides</h2>
        {menuItems.Sides.map((item) => (
          <div key={item.name} className="mb-2">
            <button
              type="button"
              onClick={() => addToCart(item)}
              className="w-full p-2 bg-[#E60733] text-white rounded hover:bg-red-700"
            >
              {item.name} - ${item.price}
            </button>
          </div>
        ))}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Cart</h2>
        <ul className="mb-4 ">
          {cart.map((item, index) => (
            <li key={index} className=" mb-4 flex justify-between items-center">
              {item.name} - ${item.price}
              <button
                type="button"
                onClick={() => removeFromCart(index)}
                className="ml-4 bg-gray-700 text-white rounded-full w-8 h-8 items-center justify-center flex outline outline-1 outline-gray-500"
              >
                <IoClose color='white' />
              </button>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-4">Total: ${total}</h3>
        <button type="submit" className="w-full p-2 bg-[#E60733] text-white rounded hover:bg-red-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;