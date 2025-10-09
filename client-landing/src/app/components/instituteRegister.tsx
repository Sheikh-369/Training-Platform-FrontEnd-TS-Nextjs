'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IInstituteRegisterData } from '@/lib/store/register-institute/register-institut-slice-type';
import { createInstitute } from '@/lib/store/register-institute/register-institute-slice';

function InstituteRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [idType, setIdType] = useState<'PAN' | 'VAT' | ''>('');

  const [registerInstituteData, setRegisterInstituteData] = useState<IInstituteRegisterData>({
    instituteName: '',
    instituteEmail: '',
    institutePhoneNumber: '',
    instituteAddress: '',
    institutePanNumber: '',
    instituteVatNumber: '',
    instituteImage: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'instituteImage' && files) {
      setRegisterInstituteData({ ...registerInstituteData, instituteImage: files[0] });
    } else if (name === 'idType') {
      setIdType(value as 'PAN' | 'VAT');
      // Clear both PAN and VAT when switching
      setRegisterInstituteData({
        ...registerInstituteData,
        institutePanNumber: '',
        instituteVatNumber: '',
      });
    } else {
      setRegisterInstituteData({ ...registerInstituteData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = registerInstituteData;

    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(instituteEmail)) {
      toast.error('Invalid email format.');
      return;
    }

    const result = await dispatch(createInstitute(registerInstituteData) as any);

    if (result?.success) {
      toast.success(result.message);
      router.push(`/institute/${result.instituteNumber}/dashboard`);
    } else {
      toast.error(result.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[320px] bg-white rounded-lg p-5 shadow-md border border-gray-200">
        <header className="text-center mb-4">
          <img
            className="w-12 mx-auto mb-3"
            src="https://img.icons8.com/fluent/344/university.png"
            alt="Institute Logo"
          />
          <h2 className="text-lg font-bold text-indigo-700">Register Institute</h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="instituteName"
            placeholder="Institute Name"
            value={registerInstituteData.instituteName}
            onChange={handleChange}
            className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
            required
          />

          <input
            type="email"
            name="instituteEmail"
            placeholder="Email"
            value={registerInstituteData.instituteEmail}
            onChange={handleChange}
            className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
            required
          />

          <input
            type="text"
            name="institutePhoneNumber"
            placeholder="Phone Number"
            value={registerInstituteData.institutePhoneNumber}
            onChange={handleChange}
            className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
            required
          />

          <textarea
            name="instituteAddress"
            placeholder="Address"
            value={registerInstituteData.instituteAddress}
            onChange={handleChange}
            className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition resize-none"
            required
          />

          {/* Dropdown to choose between PAN and VAT */}
          <select
            name="idType"
            value={idType}
            onChange={handleChange}
            className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
          >
            <option value="">Select ID Type</option>
            <option value="PAN">PAN Number</option>
            <option value="VAT">VAT Number</option>
          </select>

          {/* Conditional Input Fields */}
          {idType === 'PAN' && (
            <input
              type="text"
              name="institutePanNumber"
              placeholder="Enter PAN Number"
              value={registerInstituteData.institutePanNumber}
              onChange={handleChange}
              className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
            />
          )}

          {idType === 'VAT' && (
            <input
              type="text"
              name="instituteVatNumber"
              placeholder="Enter VAT Number"
              value={registerInstituteData.instituteVatNumber}
              onChange={handleChange}
              className="w-full text-sm p-2 border-b border-indigo-500 text-indigo-700 outline-none focus:bg-gray-100 transition"
            />
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              Institute Cover Image
            </label>
            <input
              type="file"
              name="instituteImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-indigo-600"
            />
          </div>

          <div className="mt-4">
            <input
              type="submit"
              value="Register Institute"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded cursor-pointer transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default InstituteRegister;
