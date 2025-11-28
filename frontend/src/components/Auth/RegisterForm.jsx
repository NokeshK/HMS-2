import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Stethoscope,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Eye,
  EyeOff,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { PrimaryAppBar } from "../Layout/PrimaryAppBar.jsx";

export function RegisterForm({ onNavigateToLogin }) {
  const { register, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    specialization: "",
    licenseNumber: "",
    emergencyContact: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.role === "doctor" && (!formData.specialization || !formData.licenseNumber)) {
      setError("Please fill doctor details");
      return;
    }

    if (formData.role === "patient" && (!formData.bloodGroup || !formData.emergencyContact)) {
      setError("Please fill patient details");
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setSuccess("Registration successful! Logging you in...");
      // Auto-login after registration
      try {
        const loginResult = await login(formData.email, formData.password);
        if (loginResult) {
          // Navigate to dashboard (will show correct dashboard based on role)
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setError("Registration successful but login failed. Please login manually.");
        }
      } catch (err) {
        setError("Registration successful but login failed. Please login manually.");
      }
    } else {
      setError(result.error || "Registration failed. Try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-900">
      <PrimaryAppBar />

      {/* Full-width Form */}
      <div className="py-14 px-6 lg:px-10 w-full">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-wide">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join our secure medical community
          </p>
        </div>

        {/* Role Selection */}
        <div className="flex justify-center gap-8 mb-10">
          <div
            onClick={() => setFormData({ ...formData, role: "patient" })}
            className={`cursor-pointer w-40 p-6 rounded-2xl transition transform hover:scale-105 shadow-lg text-center
              ${formData.role === "patient"
                  ? "bg-blue-100 text-blue-700 shadow-blue-300"
                  : "bg-white border border-gray-300 text-gray-900"
                }`}
          >
            <User className="mx-auto h-10 w-10 mb-3" />
            <p className="font-semibold">Patient</p>
          </div>

            <div
            onClick={() => setFormData({ ...formData, role: "doctor" })}
            className={`cursor-pointer w-40 p-6 rounded-2xl transition transform hover:scale-105 shadow-lg text-center
              ${formData.role === "doctor"
                  ? "bg-green-100 text-green-700 shadow-green-300"
                  : "bg-white border border-gray-300 text-gray-900"
                }`}
          >
            <Stethoscope className="mx-auto h-10 w-10 mb-3" />
            <p className="font-semibold">Doctor</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">

            {/* Basic Info */}
            <Section title="Basic Information" icon={User} />

            <TwoCol>
              <Input label="Full Name" name="name" icon={<User />} required value={formData.name} onChange={handleChange} />

              <Input label="Email" name="email" type="email" icon={<Mail />} required value={formData.email} onChange={handleChange} />

              <Input label="Phone Number" name="phone" icon={<Phone />} value={formData.phone} onChange={handleChange} />

              <Input label="Date of Birth" name="dateOfBirth" type="date" icon={<Calendar />} value={formData.dateOfBirth} onChange={handleChange} />
            </TwoCol>

            {/* Role Specific */}
            <Section
              title={formData.role === "doctor" ? "Doctor Information" : "Patient Information"}
              icon={formData.role === "doctor" ? Stethoscope : HeartPulse}
            />

            {formData.role === "doctor" ? (
              <TwoCol>
                <Select
                  label="Specialization"
                  name="specialization"
                  required
                  value={formData.specialization}
                  onChange={handleChange}
                  options={[
                    "Cardiology",
                    "Neurology",
                    "Dermatology",
                    "Radiology",
                    "Pediatrics",
                    "Surgery",
                  ]}
                />

                <Input label="License Number" name="licenseNumber" required value={formData.licenseNumber} onChange={handleChange} />
              </TwoCol>
            ) : (
              <TwoCol>
                <Select
                  label="Blood Group"
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                />

                <Input label="Emergency Contact" name="emergencyContact" required icon={<Phone />} value={formData.emergencyContact} onChange={handleChange} />
              </TwoCol>
            )}

            {/* Address */}
            <Section title="Address" icon={MapPin} />
            <textarea
              name="address"
              rows="3"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />

            {/* Password Section */}
            <Section title="Security" icon={ShieldCheck} />

            <TwoCol>
              <PasswordInput
                label="Password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </TwoCol>

            {/* Alerts */}
            {error && <Alert type="error" msg={error} />}
            {success && <Alert type="success" msg={success} />}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>

            {/* Navigate to Login */}
            <p className="text-center text-white mt-4">
              Already have an account?{" "}
              <button onClick={onNavigateToLogin} className="font-bold text-yellow-300 hover:underline">
                Login
              </button>
            </p>
        </form>
      </div>
    </div>
  );
}

/* ----------------- Reusable Components ----------------- */

function Section({ title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 text-gray-900">
      <Icon className="h-6 w-6 text-gray-700" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}

function Input({ label, icon, ...rest }) {
  return (
    <div>
      <label className="text-gray-900 text-sm">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        <input
          {...rest}
          className="w-full pl-11 p-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>
    </div>
  );
}

function PasswordInput({ label, show, toggle, ...rest }) {
  return (
    <div>
      <label className="text-gray-900 text-sm">{label}</label>
      <div className="relative mt-1">
        <Lock className="absolute left-3 top-3 text-gray-400" />
        <input
          {...rest}
          type={show ? "text" : "password"}
          className="w-full pl-11 pr-12 p-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <button type="button" onClick={toggle} className="absolute right-3 top-3 text-gray-500">
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
}

function Select({ label, options, ...rest }) {
  return (
    <div>
      <label className="text-gray-900 text-sm">{label}</label>
      <select
        {...rest}
        className="w-full p-3 rounded-xl bg-white border border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Select</option>
        {options.map((o, i) => (
          <option key={i} value={o} className="text-black">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Alert({ type, msg }) {
  return (
    <div
      className={`p-4 rounded-xl text-center font-medium ${
        type === "error"
          ? "bg-red-500/20 border border-red-300 text-red-200"
          : "bg-green-500/20 border border-green-300 text-green-200"
      }`}
    >
      {msg}
    </div>
  );
}

RegisterForm.propTypes = {
  onNavigateToLogin: PropTypes.func.isRequired,
};
