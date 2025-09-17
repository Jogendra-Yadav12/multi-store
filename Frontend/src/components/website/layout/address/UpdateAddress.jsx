import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAuth } from "../../../../context/AuthContext";
import { useAddressApi } from "../../../../context/address/AddressApiContaxt";

const UpdateAddress = ({ showModal, setShowModal, id }) => {
  const { user } = useAuth();
  const { saveAndUpdateAddress, getAddress } = useAddressApi();

  const [formData, setFormData] = useState({
   
    postal_code: "",
    state: "",
    city: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    if (id && Array.isArray(getAddress)) {
      const addr = getAddress.find((addrs) => addrs.id === id);
      if (addr) {
        setFormData({
          id: addr.id, 
          postal_code: addr.postal_code || "",
          state: addr.state || "",
          city: addr.city || "",
          country: addr.country || "",
          address: addr.address || "",
        });
      }
    }
  }, [id, getAddress]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveAndUpdateAddress(formData, user.id);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6 space-y-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <CloseOutlinedIcon />
            </button>

            <h2 className="text-2xl font-semibold text-gray-700">
              {formData.id ? "Update Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    value={formData.postal_code}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    State
                  </label>
                  <select
                    id="state"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option>Select state</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="DL">Delhi</option>
                    <option value="MH">Maharashtra</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Address
                </label>
                <textarea
                  id="address"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                >
                  {formData.id ? "Update Address" : "+ Save New Address"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateAddress;
