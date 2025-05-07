import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getToken } from '../../utils/helperFunction';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAddOrCreateProductApi, adminGetProductByIdApi } from '../../utils/apiEndPoints';
import Loader from '../../components/common/Loader';
import { baseUrl } from '../../utils/baseUrl';

const CreateOrUpdateProduct = () => {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    images: [],
  });
  

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive().required('Price is required'),
    stock: Yup.number().min(0).required('Stock is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().required('Main image is required'),
    images: Yup.array().of(Yup.string()),
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/admin/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data','Authorization': `Bearer ${getToken()}` },
      });
      toast.success(data?.message||"Successfully upload")
      return data.url;
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async(values) => {
    setSaving(true)
  try {
    const res = await adminAddOrCreateProductApi(values)
    if(res?.status==200){
        toast.success(res?.data?.message)
        navigate('/admin/all-product')
    }
  } catch (error) {
    console.log("err",error);
    
    toast.error(error?.response?.message || "Something went wrong")
  }
  setSaving(false)
  };

  const getProductDetails = async()=>{
    setLoading(true)
    try {
        const res = await adminGetProductByIdApi(params?.id)
        console.log(res?.data);
        let data = res?.data?.data
        if(data){
            setInitialValues({
                _id: data._id || '',
                title: data.title || '',
                description: data.description || '',
                price: data.price || '',
                stock: data.stock || '',
                category: data.category || '',
                image: data.image || '',
                images: data.images || [],
              });
    setLoading(false)
        }else{
            navigate("/admin/all-product")
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.message || "Something went wrong")
        
    }
  }

  useEffect(()=>{
    if(params?.id){
        getProductDetails()
    }
  },[params?.id])


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        {loading ? <div className="flex justify-center items-center w-full h-screen"><Loader /></div> :
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{params?.id ? "Update":"Add New"} Product</h2>
        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue,errors }) => (
            <Form className="space-y-6">
              {/* Basic Fields */}
              <FieldGroup name="title" label="Title" />
              <FieldGroup name="description" label="Description" as="textarea" rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup name="price" label="Price" type="number" />
                <FieldGroup name="stock" label="Stock" type="number" />
              </div>
              <FieldGroup name="category" label="Category" />

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Main Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = await handleImageUpload(file);
                      if (url) setFieldValue('image', url);
                    }
                  }}
                  className="mb-2"
                />
                {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
                {values.image && (
                  <img src={values.image} alt="Main" className="h-32 mt-2 rounded shadow" />
                )}
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Additional Images Upload */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Additional Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    const uploadedUrls = [];
                    for (let file of files) {
                      const url = await handleImageUpload(file);
                      if (url) uploadedUrls.push(url);
                    }
                    setFieldValue('images', [...values.images, ...uploadedUrls]);
                  }}
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-4 mt-2">
                  {values.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`img-${index}`} className="h-24 rounded shadow" />
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            'images',
                            values.images.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center -mt-2 -mr-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={uploading || saving}
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                  {saving ? 'Saving' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>}
    </div>
  );
};

// Field Group Component
const FieldGroup = ({ name, label, as = 'input', ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <Field
      name={name}
      as={as}
      id={name}
      {...props}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

export default CreateOrUpdateProduct;
