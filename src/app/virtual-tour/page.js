"use client";
import React, { useState, useEffect } from 'react';
import { 
  Edit,
  X,
  Ban,
  Send,
  ArrowRight
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Image from 'next/image';

const OurHistoryPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [role, setRole] = useState(null);

  // Detect admin role
  useEffect(() => {
    const initRole = async () => {
      try {
        const raw = localStorage.getItem('ecareUser') || sessionStorage.getItem('ecareUser');
        if (!raw) {
          setRole(null);
          return;
        }

        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          setRole(null);
          return;
        }

        if (parsed && parsed.encrypted) {
          try {
            const decrypted = await decryptObject(parsed);
            const user = decrypted?.user || decrypted;
            setRole(user?.role || null);
            return;
          } catch (e) {
            console.warn('Failed to decrypt stored ecareUser', e);
            setRole(null);
            return;
          }
        }

        const user = parsed.user || parsed;
        setRole(user?.role || null);
      } catch (err) {
        console.warn('Failed to read stored user for role detection', err);
        setRole(null);
      }
    };

    initRole();
  }, []);

  // Default data - CTA button links to the provided Street View URL (opens in new tab)
  const defaultData = {
    hero: {
      title: "Our Rich Heritage",
      subtitle: "Nearly a century of educational excellence, rooted in Edmund Rice values and committed to nurturing generations of compassionate leaders.",
      stats: [
        { value: "97+", label: "Years of Excellence", show: true },
        { value: "10,000+", label: "Alumni Worldwide", show: true },
        { value: "2,000+", label: "Current Students", show: true }
      ],
      ctaButton: {
        label: "View Location on Map",
        link: "https://www.google.com/maps/place/Old+Baneshwor+Road,+Kathmandu+44600/@27.6959749,85.3375764,3a,75y,358.88h,90t/data=!3m7!1e1!3m5!1scX9ydK9FjWf3uvl6RU8yoA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DcX9ydK9FjWf3uvl6RU8yoA%26yaw%3D358.88434!7i13312!8i6656!4m15!1m8!3m7!1s0x39eb19964c28ced7:0x72292b647fff641!2sOld+Baneshwor+Road,+Kathmandu+44600!3b1!8m2!3d27.6959759!4d85.337565!16s%2Fg%2F11vqd4bt54!3m5!1s0x39eb19964c28ced7:0x72292b647fff641!8m2!3d27.6959759!4d85.337565!16s%2Fg%2F11vqd4bt54?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D",
        icon: "ArrowRight",
        show: true
      },
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true
    },
    layout: {
      showHero: true
    }
  };

  const [data, setData] = useState(defaultData);

  // Enable edit mode for admin
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
      setPreviewMode(false);
    }
  }, [role]);

  // Fetch saved data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_virtual_tour', {});
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const fetchedRaw = res.data[0]?.Data || {};

          let fetchedData = fetchedRaw;
          if (typeof fetchedRaw === 'string' || (fetchedRaw && fetchedRaw.encrypted)) {
            const decrypted = await decryptObject(fetchedRaw);
            if (decrypted) fetchedData = decrypted;
            else {
              try { fetchedData = JSON.parse(fetchedRaw); } catch (e) { fetchedData = {}; }
            }
          }

          setData(prev => ({
            ...prev,
            hero: { ...prev.hero, ...fetchedData.hero },
            layout: { ...prev.layout, showHero: fetchedData.layout?.showHero ?? true }
          }));
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  // Edit modal handlers
  const openEditModal = () => {
    setEditFormOpen(true);
    setPreviewMode(false);
    const sectionData = {
      ...data.hero,
      showSection: data.layout?.showHero ?? true
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedObjectChange = (nestedKey, subField, value) => {
    setEditData(prev => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [subField]: value }
    }));
  };

  const handleNestedArrayChange = (arrayKey, index, field, value) => {
    const updatedArray = [...(editData[arrayKey] || [])];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setEditData(prev => ({ ...prev, [arrayKey]: updatedArray }));
  };

  const handleToggleSection = (value) => {
    setEditData(prev => ({ ...prev, showSection: value }));
  };

  const saveChanges = async () => {
    try {
      const updatedData = {
        ...data,
        hero: { 
          ...editData, 
          ctaButton: editData.ctaButton,
          showSection: undefined 
        },
        layout: { showHero: editData.showSection }
      };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      const encryptedPayload = await encryptObject(payload);
      const res = await apiRequest('save_data/save_virtual_tour', { payload: encryptedPayload });

      if (res?.status === 200) {
        setData(updatedData);
      }
    } catch (error) {
      console.error('Save error:', error);
    }

    setEditFormOpen(false);
    setOriginalData(null);
  };

  const cancelChanges = () => {
    if (originalData) setEditData(originalData);
    setEditFormOpen(false);
    setPreviewMode(false);
    setOriginalData(null);
  };

  const togglePreview = () => setPreviewMode(!previewMode);

  const filteredHeroStats = (data.hero?.stats || []).filter(stat => stat.show !== false);
  const showCTAButton = data.hero?.ctaButton?.show !== false;

  const renderIcon = (iconName) => {
    if (iconName === "ArrowRight") return <ArrowRight className="h-5 w-5" />;
    return null;
  };

  const ModalFooter = () => (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
      <button
        onClick={cancelChanges}
        className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center space-x-1"
      >
        <Ban className="h-4 w-4" />
        <span>Cancel</span>
      </button>
      <div className="flex space-x-2">
        <button
          onClick={togglePreview}
          className="px-3 py-2 text-sm text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
        <button
          onClick={saveChanges}
          className="px-3 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Hero Section</h2>
              <button onClick={cancelChanges} className="p-2 text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editData.showSection || false}
                      onChange={(e) => handleToggleSection(e.target.checked)}
                    />
                    <span>Show Hero Section</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleObjectChange('title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Subtitle</label>
                  <textarea
                    value={editData.subtitle || ''}
                    onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Background Image Upload</label>
                  <FileUpload
                    currentUrl={editData.backgroundImage || ''}
                    onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)}
                    label="Hero Background Image"
                  />
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.backgroundImageShow !== false}
                        onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)}
                      />
                      <span>Show Background Image</span>
                    </label>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-3">Stats</h3>
                {(editData.stats || []).map((stat, index) => (
                  <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'value', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={stat.show !== false}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'show', e.target.checked)}
                        />
                        <span>Show Stat</span>
                      </label>
                    </div>
                  </div>
                ))}

                <h3 className="text-lg font-semibold mt-6 mb-3">CTA Button</h3>
                <div className="border p-4 rounded bg-gray-50 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Button Label</label>
                    <input
                      type="text"
                      value={editData.ctaButton?.label || ''}
                      onChange={(e) => handleNestedObjectChange('ctaButton', 'label', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Button Link (Google Maps URL)</label>
                    <textarea
                      value={editData.ctaButton?.link || ''}
                      onChange={(e) => handleNestedObjectChange('ctaButton', 'link', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Paste full Google Maps URL here"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Icon (Lucide name)</label>
                    <input
                      type="text"
                      value={editData.ctaButton?.icon || 'ArrowRight'}
                      onChange={(e) => handleNestedObjectChange('ctaButton', 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="ArrowRight"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.ctaButton?.show !== false}
                        onChange={(e) => handleNestedObjectChange('ctaButton', 'show', e.target.checked)}
                      />
                      <span>Show CTA Button</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section with CTA Button */}
      {data.layout?.showHero && (
        <section
          className={`relative ${data.hero?.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}
        >
          {data.hero?.backgroundImageShow !== false && data.hero?.backgroundImage && (
            <Image src={data.hero.backgroundImage} alt="hero-background" fill className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero?.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                {data.hero?.subtitle}
              </p>

              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-8 mb-10">
                  {filteredHeroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-lg text-green-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button - opens the provided Google Maps Street View in a new tab */}
              {showCTAButton && data.hero?.ctaButton && (
                <a
                  href={data.hero.ctaButton.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-shadow shadow-lg hover:shadow-xl"
                >
                  {renderIcon(data.hero.ctaButton.icon)}
                  <span className="ml-3">{data.hero.ctaButton.label}</span>
                </a>
              )}
            </div>
          </div>

          {editMode && (
            <button
              onClick={openEditModal}
              className="absolute top-4 right-4 bg-white/80 text-green-800 p-3 rounded-full hover:bg-white shadow-lg"
            >
              <Edit className="h-6 w-6" />
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default OurHistoryPage;