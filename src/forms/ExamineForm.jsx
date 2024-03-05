import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Label, TextInput, Select, Checkbox } from 'flowbite-react';
import { FaPrint } from 'react-icons/fa6'
import { useState, useEffect } from 'react';

export default function ExamineForm() {
  const [trips, setTrips] = useState([])
  useEffect(() => {
      axios.get('http://localhost:3000/trips')
      .then(res => setTrips(res.data))
      .catch(err => console.log(err))
  }, [])

  const formik = useFormik({
      initialValues: {
        trip: "",
        weight: "",
        extra: false,
        price: ""
      },
      onSubmit: (values) => {
          console.log('onSubmit', values)
      },
      validationSchema: Yup.object({
        trip: Yup.string().required("Trip is required"),
        weight: Yup.string().required("Weight is required")
      })
  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-2/5'>
                <div className="mb-2 block">
                <Label htmlFor="trip" value="Trip" />
                </div>
                <Select 
                  id="trip" 
                  name="trip" 
                  required
                  value={formik.values.trip} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="0">-- Choose a Trip --</option>
                    {
                        trips.map((d, i) => {
                            return <option value={d.tripName} key={i}>{d.tripName}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.trip && formik.touched.trip && formik.errors.trip}</div>
            </div>
            <div className='w-1/5'>
                <div className="mb-2 block">
                <Label htmlFor="weight" value="Weight" />
                </div>
                <TextInput 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  placeholder="Weight" 
                  required 
                  value={formik.values.weight} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.weight && formik.touched.weight && formik.errors.weight}</div>
            </div>
            <div className='w-1/5'>
                <div className="mb-2 block">
                <Label htmlFor="extra" value="Extra?" />
                </div>
                <Checkbox 
                  id="extra" 
                  name="extra" 
                  value={formik.values.extra} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.extra && formik.touched.extra && formik.errors.extra}</div>
            </div>
            <div className='w-1/5'>
                <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
                </div>
                <TextInput 
                  id="price" 
                  name="price" 
                  type="number" 
                  placeholder="Price" 
                  value={formik.values.price} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.price && formik.touched.price && formik.errors.price}</div>
            </div>
          </div>
          <Button type='submit'><FaPrint className='mr-2' />  Print</Button>
      </form>
    </>
  );
}
