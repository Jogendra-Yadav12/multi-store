import React, { useState } from "react";

const PaymentMethod = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const [customFields, setCustomFields] = useState([]);
  const [newField, setNewField] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

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

  // Remove custom field
  const handleRemoveField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, customFields };
    setSubmittedData(finalData); // store submitted data for table display
    console.log("Form Data:", finalData);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8">
      <h2 className="text-xl font-bold">Payment Management</h2>

      {/* Table Preview */}
      {submittedData && (
        <div className="overflow-x-auto shadow bg-white rounded p-4">
          <h3 className="text-lg font-semibold mb-3">Submitted Data</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Field</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Payment Name</td>
                <td className="border p-2">{submittedData.name}</td>
              </tr>
              <tr>
                <td className="border p-2">Status</td>
                <td className="border p-2">
                  {submittedData.status === "1"
                    ? "Active"
                    : submittedData.status === "0"
                      ? "Disabled"
                      : ""}
                </td>
              </tr>
              {submittedData.customFields.map((field, index) => (
                <tr key={index}>
                  <td className="border p-2">{field.label}</td>
                  <td className="border p-2">{field.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              className="bg-green-600 w-1/6 text-white px-4 py-2 rounded"
            >
              + Add Field
            </button>
          </div>

          {/* Render Custom Fields */}
          {customFields.map((field, index) => (
            <div key={index} className="mt-4 flex gap-3 items-end">
              <div className="flex-1">
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
              <div>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
