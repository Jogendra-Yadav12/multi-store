import React, { useState } from 'react'
import HeadingTag from '../layout/HeadingNav'

const PaymentMethod = () => {
    const [fields, setFields] = useState([{ value: "" }])

    // handle input change

    const handleChange = (index, e) => {
        const newFeilds = [...fields];
        newFeilds[index].value = e.target.value
        setFields(newFeilds)
    }

    // add field 

    const addField = () => {
        setFields([...fields, ""])
    }
    // remove field

    const removeField = (index) => {
        const newFeilds = fields.filter((_, i) => i !== index)
        setFields(newFeilds)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit fields:", fields );
        
    }

    return (
        <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
            <HeadingTag title="Payment Management" path="Payment" />

            <form onSubmit={handleSubmit}>


                {fields.map((field, index) => (
                    <div key={index} >
                        <div className='my-5 flex gap-5'>
                            <input type="text" name="name" value={field.value}
                            onChange={(e) => handleChange(index, e)}
    
                            className="w-full p-2 border rounded" />

                            <button onClick={() => removeField(index)} className='bg-red-500 px-5 rounded-md text-white'>remove</button>
                        </div>
                    </div>
                ))}


                <div className='my-5'>
                    <button onClick={addField} type="submit" form="addCategoryForm" className="bg-green-500 text-white px-6 py-2 rounded">Add</button>
                </div>

                <button className="bg-indigo-600 text-white px-6 py-2 rounded" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PaymentMethod