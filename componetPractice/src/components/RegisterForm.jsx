import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    dateOfBirth: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, files, checked } = event.target;
  
    if (name === "hobbies") {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: checked
          ? [...prevData.hobbies, value]
          : prevData.hobbies.filter((hobby) => hobby !== value),
      }));
  
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (formData.hobbies.length === 0) {
        newErrors.hobbies = "Please select at least one hobby";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedData(null);
      return;
    }

    setErrors({});
    setSubmittedData(formData);

    console.log("Form submitted successfully:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Registration Form
          </h1>
          <p className="mt-2 text-slate-600">
            Fill all required fields. 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Radio Buttons */}
          <div>
            <label className="mb-3 block font-medium text-slate-700">
              Gender <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-4">
              {["Male", "Female"].map((gender) => (
                <label
                  key={gender}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>

            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Select Input */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>

            {errors.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Date Input */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Checkbox */}
            <div>
            <label className="mb-3 block font-medium text-slate-700">
                Hobbies <span className="text-red-500">*</span>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
                {["Reading", "Music", "Sports", "Gaming"].map(
                (hobby) => (
                    <label
                    key={hobby}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
                    >
                    <input
                        type="checkbox"
                        name="hobbies"
                        value={hobby}
                        checked={formData.hobbies.includes(hobby)}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />

                    <span className="text-slate-700">{hobby}</span>
                    </label>
                )
                )}
            </div>

            {errors.hobbies && (
                <p className="mt-1 text-sm text-red-500">{errors.hobbies}</p>
            )}
            </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Submit Form
          </button>
        </form>

        {submittedData && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-4">
            <h2 className="font-bold text-green-700">
              Form submitted successfully!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;