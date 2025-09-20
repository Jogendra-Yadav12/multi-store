import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const UserInfo = () => {
    const { user, updateUserDetails } = useAuth();



    const [isEditing, setIsEditing] = useState(false); // toggle edit mode
    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        email: "",
        number: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                f_name: user.f_name || "",
                l_name: user.l_name || "",
                email: user.email || "",
                number: user.number || "",
            })
        }
    }, [user])

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle update submit
    const handleUpdate = () => {
        updateUserDetails(user.id, formData)
        setIsEditing(false); // back to view mode
    };

    return (
        <div>
            <div className="w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="w-full">
                        <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                {isEditing ? (

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="f_name"
                                            value={formData.f_name}
                                            onChange={handleChange}
                                            className="border p-1 text-gray-600 rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="l_name"
                                            value={formData.l_name}
                                            onChange={handleChange}
                                            className="border p-1 text-gray-600 rounded w-full"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.f_name} {user.l_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border p-1 text-gray-600 rounded w-full"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="border p-1 text-gray-600 rounded w-full"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.number}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleUpdate}
                                    className="flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-500 text-white px-6 py-3 text-sm font-medium shadow-theme-xs hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
