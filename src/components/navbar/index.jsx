import React, { useState } from 'react'
import ImageUpload from '../ImgUpload'
import axios from 'axios'
import { MdOutlineInsertPhoto } from 'react-icons/md'
import { toast } from 'react-toastify'

const EditUser = ({ object }) => {

    const [isopen, setIsopen] = useState(false)
    const [inputValue, setInputValue] = useState(object)
    const [dataCat, setDaCat] = useState([])

    const Open = () => {
        axios.get('https://omofood.pythonanywhere.com/api/v1/categories/').then((res) => setDaCat(res?.data))
        setIsopen(true)
    }
    let token = localStorage.getItem('token')


    console.log(inputValue,'inputValue');
    const Submit = () => {
        const formData = new FormData();
        formData.append('title', inputValue.title);
        formData.append('image', inputValue.img); // Uncomment this line if you have an image to upload
        formData.append('description', inputValue.description);
        formData.append('price', inputValue.price);
        formData.append('amount', inputValue.amount);
        formData.append('amount_measure', inputValue.amount_measure);
        formData.append('category', inputValue?.category);

        axios.patch(
            `https://omofood.pythonanywhere.com/api/v1/products/${inputValue.id}/`,
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
                if (response.status === 200) {
                    toast.success('mahsulod uzgartirildi')
                    setIsopen(false)
                    setInputValue({
                        title: '',
                        description: '',
                        price: '',
                        amount: '',
                        amount_measure: '',
                        category: '',
                    })
    window.location.reload()
                }
            })
            .catch(error => {
                console.error('Error submitting product:', error);
            });
    }

    return (
        <div>
            <button onClick={() => Open()} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Edit
                </span>
            </button>

            {
                isopen && <div className=' absolute bg-black h-[500px] w-full left-0  top-[100px]  z-10  p-[50px]'>
                    <div className='flex items-end justify-end'>
                        <h1 onClick={() => setIsopen(false)} className='bg-white cursor-pointer p-[4px]  rounded-full' >x</h1>
                    </div>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod Nomi</label>
                            <input value={inputValue?.title} onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Mahsulod haiqda</label>
                            <input value={inputValue?.description} onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot narxi</label>
                            <input  value={inputValue?.price} onChange={(e) => setInputValue({ ...inputValue, price: e.target.value })} type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod soni</label>
                            <input value={inputValue?.amount} onChange={(e) => setInputValue({ ...inputValue, amount: e.target.value })} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required />
                        </div>

                        <div>
                            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputValue?.amount_measure}</label>
                            <select onChange={(e) => setInputValue({ ...inputValue, amount_measure: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="gram">gram</option>
                                <option value="dona">dona</option>
                                <option value="dona">kg</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulod Turi</label>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inputValue?.category}</label>

                            <select  onChange={(e) => setInputValue({ ...inputValue, category: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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

                            <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
        </div>
    )
}

export default EditUser

