import React, { useState, useEffect } from 'react';
import { Edit, X, Send, Ban } from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';

const Footer = () => {
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState(null);
  const [footerData, setFooterData] = useState({
    schoolName: "Abc School",
    year: "2025",
    tagline: "An Edmund Rice Educational Institution"
  });
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Role detection
  useEffect(() => {
    const initRole = async () => {
      try {
        const raw = localStorage.getItem('ecareUser') || sessionStorage.getItem('ecareUser');
        if (!raw) {
          setRole(null);
          setEditMode(false);
          return;
        }

        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          console.warn('Failed to parse stored user data', e);
          setRole(null);
          setEditMode(false);
          return;
        }

        // If encrypted, decrypt it
        if (parsed && parsed.encrypted) {
          try {
            const decrypted = await decryptObject(parsed);
            const user = decrypted?.user || decrypted;
            const userRole = user?.role || null;
            setRole(userRole);
            setEditMode(userRole === 'admin');
          } catch (e) {
            console.warn('Failed to decrypt stored user', e);
            setRole(null);
            setEditMode(false);
          }
        } else {
          // Not encrypted, parse normally
          const user = parsed.user || parsed;
          const userRole = user?.role || null;
          setRole(userRole);
          setEditMode(userRole === 'admin');
        }
      } catch (err) {
        console.warn('Failed to read stored user for role detection', err);
        setRole(null);
        setEditMode(false);
      }
    };

    initRole();
  }, []);

  // Fetch footer data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await apiRequest('save_data/get_all_footer_data', {});
        console.log('Footer API Response:', res);
        
        if (res.status === 200 && res.data && Array.isArray(res.data) && res.data.length > 0) {
          let fetched = res.data[0]?.Data || {};
          
          // Handle decryption if needed
          if (typeof fetched === 'string' || (fetched && fetched.encrypted)) {
            try {
              const decrypted = await decryptObject(fetched);
              if (decrypted) {
                fetched = decrypted;
              } else {
                // If decryption fails but it's a string, try parsing
                try {
                  fetched = JSON.parse(fetched);
                } catch (parseErr) {
                  console.warn('Failed to parse footer data as JSON', parseErr);
                  fetched = {};
                }
              }
            } catch (decryptErr) {
              console.warn('Failed to decrypt footer data', decryptErr);
              fetched = {};
            }
          }
          
          console.log('Processed Footer Data:', fetched);
          setFooterData(prev => ({ ...prev, ...fetched }));
        } else {
          console.log('No footer data found, using defaults');
        }
      } catch (error) {
        console.error('Footer fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openEditModal = () => {
    setEditData({ ...footerData });
    setOriginalData({ ...footerData });
    setEditFormOpen(true);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    try {
      const payload = {
        ...editData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      console.log('Saving footer payload:', payload);
      
      // Encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const res = await apiRequest('save_data/save_footer', { 
        payload: encryptedPayload 
      });
      
      console.log('Save response:', res);
      
      if (res?.status === 200) {
        setFooterData(editData);
        setEditFormOpen(false);
        setOriginalData(null);
      } else {
        console.error('Footer save failed:', res);
      }
    } catch (error) {
      console.error('Footer save error:', error);
    }
  };

  const cancelChanges = () => {
    setEditData(originalData || {});
    setEditFormOpen(false);
  };

  if (isLoading) {
    return (
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <p className="text-sm">
            © {footerData.year || '2025'} {footerData.schoolName || "Abc School"}. All rights reserved.
          </p>
          <p className="text-xs text-green-200 mt-1">
            {footerData.tagline || "An Edmund Rice Educational Institution"}
          </p>

          {/* Edit Icon - visible for admin only */}
          {editMode && (
            <button
              onClick={openEditModal}
              className="absolute top-1/2 -translate-y-1/2 right-4 bg-white text-green-800 p-2 rounded-full shadow-xl hover:bg-gray-100 hover:scale-110 transition-all duration-200"
              title="Edit Footer"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </div>
      </footer>

      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-bold text-gray-800">Edit Footer</h2>
              <button
                onClick={cancelChanges}
                className="text-gray-600 hover:text-gray-800 transition p-1 hover:bg-gray-200 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  value={editData.schoolName || ''}
                  onChange={(e) => handleChange('schoolName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Copyright Year
                </label>
                <input
                  type="text"
                  value={editData.year || ''}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="e.g. 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editData.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={cancelChanges}
                className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <Ban className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={saveChanges}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;