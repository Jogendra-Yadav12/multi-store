import React, { useState } from "react";
<<<<<<< HEAD
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

    // remove field 
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
=======

const PaymentMethod = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const [customFields, setCustomFields] = useState([]);
  const [newField, setNewField] = useState("");

  // Handle default form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new dynamic field
  const handleAddField = () => {
    if (newField.trim() !== "") {
      setCustomFields([...customFields, { label: newField, value: "" }]);
      setNewField("");
    }
  };

  // Handle dynamic field value change
  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, customFields };
    console.log("Form Data:", finalData);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
      <h2 className="text-xl font-bold">Payment Management</h2>

      <div className="flex justify-end">
        <button
          type="submit"
          form="paymentForm"
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>

      <div className="w-full bg-gray-100 p-6 rounded shadow">
        <form
          id="paymentForm"
          onSubmit={handleSubmit}
          className="space-y-5 mt-5"
        >
          {/* Default Fields */}
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Payment Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 border rounded text-gray-600"
              >
                <option value="">Select status</option>
                <option value="1">Active</option>
                <option value="0">Disabled</option>
              </select>
            </div>
          </div>

          {/* Add New Field Input */}
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Enter field name"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddField}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Field
            </button>
          </div>

          {/* Render Custom Fields */}
          {customFields.map((field, index) => (
            <div key={index} className="mt-4">
              <label className="block mb-2 text-gray-600">{field.label}</label>
              <input
                type="text"
                value={field.value}
                name={field.label}
                onChange={(e) =>
                  handleCustomFieldChange(index, e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
>>>>>>> be8404aa0b990fa635301f76f73c614801d92ae1
};

export default PaymentMethod;
