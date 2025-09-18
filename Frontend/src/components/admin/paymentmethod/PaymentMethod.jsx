import React, { useState } from "react";
import HeadingTag from "../layout/HeadingNav";

const PaymentMethod = () => {
    const [fields, setFields] = useState([{ name: "", status: "" }]);
    const [submittedData, setSubmittedData] = useState([]);

    // handle input change
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newFields = [...fields];
        newFields[index][name] = value;
        setFields(newFields);
    };

    // add field
    const addField = (e) => {
        e.preventDefault();
        setFields([...fields, { name: "", status: "" }]);
    };

    // remove field (kam se kam ek rehna chahiye)
    const removeField = (index) => {
        if (fields.length > 1) {
            const newFields = fields.filter((_, i) => i !== index);
            setFields(newFields);
        }
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Submit fields:", fields);
        setSubmittedData([...submittedData, ...fields]);
        setFields([{ name: "", status: "" }]);
    };

    return (
        <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
            <HeadingTag title="Payment Management" path="Payment" />

            {/* Submitted Data upar list me */}
            <div className="bg-gray-100 p-4 rounded shadow">
                <h2 className="text-lg text-gray-800 font-bold mb-2">Added Payment Methods:</h2>
                {submittedData.length > 0 ? (
                    <table className="table-auto w-96 text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr className="border-b ">
                                <th scope="col" className="px-2 py-3">Name</th>
                                <th cope="col" className="px-2 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.map((item, i) => (

                                <tr key={i} className="bg-white border-b">
                                    <td className="px-2 py-3"><strong>{item.name}</strong> </td>
                                    <td className="px-2 py-3">{item.status}</td>
                                </tr>


                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No methods added yet</p>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <div key={index} className="my-5 flex gap-5 items-center">
                        <div>
                            <label className="block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={field.name}
                                onChange={(e) => handleChange(index, e)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Status</label>
                            <input
                                type="text"
                                name="status"
                                value={field.status}
                                onChange={(e) => handleChange(index, e)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="bg-red-500 px-5 py-2 rounded-md text-white"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <div className="my-5 flex gap-3">
                    <button
                        onClick={addField}
                        type="button"
                        className="bg-green-500 text-white px-6 py-2 rounded"
                    >
                        Add
                    </button>

                    <button
                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;
