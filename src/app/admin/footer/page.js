"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Ban, X } from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject } from '@/utils/encryption';
import footerDataJson from '@/data/footer.json';

const FooterEditPage = () => {
  const router = useRouter();
  const [editData, setEditData] = useState({
    schoolName: footerDataJson.schoolName || '',
    year: footerDataJson.year || '',
    tagline: footerDataJson.tagline || '',
  });

  const handleChange = (key, value) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    try {
      const payload = {
        ...editData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0',
      };

      const encryptedPayload = await encryptObject(payload);
      const res = await apiRequest('save_data/save_footer', { payload: encryptedPayload });
      if (res?.status === 200) {
        router.back();
      } else {
        console.error('Save failed', res);
        alert('Save failed');
      }
    } catch (err) {
      console.error('Save error', err);
      alert('Save error');
    }
  };

  const cancel = () => router.back();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold">Edit Footer</h1>
          <button onClick={cancel} className="text-gray-600 hover:text-gray-800 p-1 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
            <input
              value={editData.schoolName || ''}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Year</label>
            <input
              value={editData.year || ''}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full p-3 border rounded"
              placeholder={String(new Date().getFullYear())}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            <input
              value={editData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>

        <div className="p-4 border-t flex justify-end space-x-3">
          <button onClick={cancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={saveChanges} className="px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterEditPage;
