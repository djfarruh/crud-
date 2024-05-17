import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageUpload from '../ImgUpload'
import { MdOutlineInsertPhoto } from "react-icons/md";
import { toast } from 'react-toastify';
import EditUser from '.';
import { useNavigate } from 'react-router-dom';


const TableCrud = () => {
  const [data, setData] = useState([])
  const [dataCat, setDaCat] = useState([])
  const [isopen, setIsopen] = useState(false)
  const [search,setSearch] =useState('')
  const navigate =useNavigate()
  const [inputValue, setInputValue] = useState({
    title: '',
    description: '',
    price: '',
    amount: '',
    amount_measure: '',
    category: '',
  })
  let token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://omofood.pythonanywhere.com/api/v1/products/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          navigate('/');
        } else {
          setData(res.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        } else {
          toast.error(`Error fetching products: ${error.message}`);
        }
      }
    };

    fetchData();
  }, [navigate]);

// fdjjhdf
  const open = () => {
    axios.get('https://omofood.pythonanywhere.com/api/v1/categories/').then((res) => setDaCat(res?.data))
    setIsopen(true)

  }

  const filteredData = data ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())   ) : [];
  const Submit = () => {
    const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('image', inputValue.img); // Uncomment this line if you have an image to upload
    formData.append('description', inputValue.description);
    formData.append('price', inputValue.price);
    formData.append('amount', inputValue.amount);
    formData.append('amount_measure', inputValue.amount_measure);
    formData.append('category', inputValue?.category);
  
    axios.post(
      'https://omofood.pythonanywhere.com/api/v1/products/',
      formData, // Pass formData directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
        }
      }
    )
    .then(response => {
      console.log('Product submitted successfully:', response.data);
      if(response.status===201) {
        toast.success('mahsulod qushildi')
        setIsopen(false)
        setInputValue({
          title: '',
          description: '',
          price: '',
          amount: '',
          amount_measure: '',
          category: '',
        })
        axios('https://omofood.pythonanywhere.com/api/v1/products/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => setData(res?.data))
      }
    })
    .catch(error => {
      console.error('Error submitting product:', error);
    });
  }

  const Delete = async (id) => {
    try {
      const response = await axios.delete(`https://omofood.pythonanywhere.com/api/v1/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 204) {
        toast.success('Mahsulot o\'chirildi');
  
        try {
          const res = await axios.get('https://omofood.pythonanywhere.com/api/v1/products/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setData(res.data);
        } catch (error) {
          toast.error(`Failed to refresh product list: ${error.message}`);
        }
      }
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };
  
  
  
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
              </li>
              <li>
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg></button>

                <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                  </ul>
                  <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div class=" overflow-x-auto h-[650px]">

        <div className='h-[70px]  bg-blue-500 px-[50px] flex justify-between items-center' >
          <div>
            <input onChange={(e) => setSearch(e.target.value) }  placeholder='Qidirish....' type="text" />
          </div>
          <button onClick={() => open()} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              add user
            </span>
          </button>
        </div>
        {
          isopen && <div className=' absolute bg-black h-[500px] w-full  z-10  p-[50px]'>
            <div className='flex items-end justify-end'>
              <h1 onClick={() => setIsopen(false)} className='bg-white cursor-pointer p-[4px]  rounded-full' >x</h1>
            </div>
              <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod Nomi</label>
                  <input onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                  <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Mahsulod haiqda</label>
                  <input onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
                <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot narxi</label>
                  <input onChange={(e) => setInputValue({ ...inputValue, price: e.target.value })} type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                </div>
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod soni</label>
                  <input onChange={(e) => setInputValue({ ...inputValue, amount: e.target.value })} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required />
                </div>

                <div>
                  <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod miqdori</label>
                  <select onChange={(e) => setInputValue({ ...inputValue, amount_measure: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="gram">gram</option>
                    <option value="dona">dona</option>
                    <option value="dona">kg</option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod Turi</label>
                  <select onChange={(e) => setInputValue({ ...inputValue, category: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                      dataCat?.map((value) => {
                        return (
                          <option value={value?.id}>{value?.title}</option>

                        )
                      })
                    }
                    {/* <option value="dona">dona</option>
                    <option value="dona">kl</option> */}
                  </select>
                </div>
                <div class="mb-2">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod Ichiki Turi</label>
                  <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="gram">gram</option>
                    <option value="dona">dona</option>
                    <option value="dona">kl</option>
                  </select>
                </div>
                <div>
                <ImageUpload
                    title={'Image'}
                    iconName={<MdOutlineInsertPhoto className="text-5xl" />}
                    iconTitle={'Upload Image'}
                    fileType={'PNG, JPG, JPEG up to 5MB'}
                    LabelFor={'img'}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                  />
                </div>
              </div>
              <button onClick={() => Submit()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        }

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData?.map((value) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class=" flex  gap-2  items-center  px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className='w-[100px]  h-[100px] rounded-3xl' src={value.image} alt="" />
                      {value?.title}
                    </th>
                    <td class="px-6 py-4">
                      {/* {value?.description} */}
                    </td>
                    <td class="px-6 py-4">
                      Laptop
                    </td>
                    <td class="px-6 py-4">
                      {value.price}
                    </td>
                    <td >
                      <div className='iq'>
        <EditUser object ={value}/>
                        <button onClick={() =>Delete(value?.id)} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Red to Yellow
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })

            }

          </tbody>
        </table>

      </div>


    </div>

  )



}

export default TableCrud