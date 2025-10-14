'use client';
import { useEffect, useState } from 'react';
import { Status } from '@/lib/global-types/type';
import { ownerData } from '@/lib/store/owner/owner-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useSearchParams } from 'next/navigation';
// import EditInstituteModal from './edit-institute-modal';

const InstituteProfile = () => {
  const dispatch = useAppDispatch();
  const { owner, status } = useAppSelector((state) => state.owner);
  //for institute number
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get('instituteNumber'); // ✅

  //edit institute info
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //     dispatch(ownerData());
  // }, [dispatch]);

  useEffect(() => {
    if (instituteNumber) {
      dispatch(ownerData(instituteNumber));
      // Optionally store it in localStorage if needed elsewhere:
      localStorage.setItem("currentInstitute", JSON.stringify({ instituteNumber }));
    }
  }, [dispatch, instituteNumber]);


  if (status === Status.ERROR) {
    return (
      <div className="text-red-600 text-center mt-6 font-semibold">
        Failed to load institute information.
      </div>
    );
  }

  if (!owner) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto bg-sky-200 rounded-xl shadow-lg p-10 min-h-[80vh] flex flex-col justify-between">
      {/* {isModalOpen && (
  <EditInstituteModal 
    owner={owner} 
    closeModal={() => setIsModalOpen(false)} 
  />
)} */}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={
              typeof owner.instituteImage === 'string' && owner.instituteImage
                ? owner.instituteImage
                : '/default-institute.jpg'
            }
            alt="Institute"
            className="w-40 h-40 object-cover rounded-lg border shadow-md"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{owner.instituteName}</h1>
            <p className="text-sm text-gray-500 mt-1">Institute ID: {owner.instituteNumber}</p>
            <p className="text-xs text-gray-400 mt-1">
              Registered on: {new Date(owner.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          // href={`/owner/dashboard/edit-institute`}
          className="mt-6 md:mt-0 inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
        >
          ✏️ Edit Info
        </button>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📞 Contact Information</h2>
          <ul className="text-gray-700 space-y-2 text-base">
            <li><strong>Email:</strong> {owner.instituteEmail}</li>
            <li><strong>Phone:</strong> {owner.institutePhoneNumber}</li>
          </ul>
        </div>

        {/* Address & IDs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🏢 Institute Details</h2>
          <ul className="text-gray-700 space-y-2 text-base">
            <li><strong>Address:</strong> {owner.instituteAddress}</li>
            {owner.institutePanNumber && (
              <li><strong>PAN Number:</strong> {owner.institutePanNumber}</li>
            )}
            {owner.instituteVatNumber && (
              <li><strong>VAT Number:</strong> {owner.instituteVatNumber}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstituteProfile;
