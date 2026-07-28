'use client'

import { useState, useRef } from 'react'
import { Camera, Edit2, Save, X, Mail, Phone, BookOpen, Building2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export interface BackendUserPayload {
  id: string
  name: string
  phoneNumber: string
  email: string | null
  profilePicture: string | null
  class: string
  institute: string
  role: string
  createdAt?: string
  updatedAt?: string
  isApproved?: string
  status?: string
}

export interface ApiResponse {
  success: boolean
  statusCode: number
  message: string
  data: BackendUserPayload
}

interface UserProfileProps {
  initialData?: ApiResponse | BackendUserPayload | null
  onUpdateAction?: (data: Partial<BackendUserPayload>) => Promise<unknown>
}

// সেফলি ডাটা এক্সট্রাক্ট করার ফাংশন
const extractUserInfo = (data: ApiResponse | BackendUserPayload | null | undefined): BackendUserPayload => {
  if (!data) {
    return {
      id: '',
      name: 'User',
      phoneNumber: 'N/A',
      email: null,
      profilePicture: null,
      class: 'N/A',
      institute: 'N/A',
      role: 'STUDENT'
    }
  }
  if ('data' in data && data.data) {
    return data.data
  }
  return data as BackendUserPayload
}

export function UserProfile({ initialData, onUpdateAction }: UserProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // লেটেস্ট ইউজার ইনফো বের করে নেওয়া
  const userInfo = extractUserInfo(initialData)

  const [userData, setUserData] = useState<BackendUserPayload>(userInfo)
  const [editData, setEditData] = useState<Partial<BackendUserPayload>>(userInfo)

  // 🌟 Navbar-এর মতো প্রোফাইল পিকচার পাথ ফরম্যাট করার লজিক 🌟
  const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";
  
  const formatProfilePic = (picPath: string | null) => {
    if (!picPath) return null;
    if (picPath.startsWith("http://") || picPath.startsWith("https://") || picPath.startsWith("data:image/")) {
      return picPath;
    }
    const cleanPath = picPath.replace(/\\/g, "/");
    return `${BACKEND_URL}/${cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath}`;
  };

  const handleEditClick = () => {
    setEditData(userData)
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setProfileImage(null)
    setEditData(userData)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const payload: Partial<BackendUserPayload> = {
        name: editData.name,
        phoneNumber: editData.phoneNumber,
        email: editData.email,
        class: editData.class,
        institute: editData.institute,
        profilePicture: profileImage || userData.profilePicture,
      }

      if (onUpdateAction) {
        await onUpdateAction(payload)
      }

      setUserData(prev => ({
        ...prev,
        ...payload,
        profilePicture: payload.profilePicture || prev.profilePicture,
      }))
      setIsEditMode(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof BackendUserPayload, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (name: string) => {
    if (!name) return 'RB'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const profileImageToDisplay = formatProfilePic(profileImage || userData.profilePicture)

  return (
    <div className="relative min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-400/10 dark:bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-[#05130d]/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-emerald-100/80 dark:border-emerald-900/40 shadow-xl shadow-emerald-950/[0.03]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/50 dark:border-emerald-800/60 rounded-full mb-2 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-widest">
                Account Control
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-emerald-50 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-500 dark:text-emerald-200/60 font-medium mt-0.5">
              {isEditMode ? 'আপনার প্রোফাইল তথ্য আপডেট করুন' : 'আপনার অ্যাকাউন্টের ব্যক্তিগত ও একাডেমিক বিবরণ'}
            </p>
          </div>

          {!isEditMode && (
            <Button
              onClick={handleEditClick}
              className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30 rounded-xl px-6 py-2.5 font-bold transition-all duration-300"
            >
              <Edit2 size={16} />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <div className="relative rounded-[2.2rem] bg-white/90 dark:bg-[#05130d]/90 backdrop-blur-2xl border border-emerald-100/80 dark:border-emerald-900/30 shadow-2xl shadow-emerald-950/[0.04] overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-emerald-900/30">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-4 border-emerald-200/60 dark:border-emerald-800/60 shadow-xl">
                  <AvatarImage src={profileImageToDisplay || undefined} alt={userData.name} className="object-cover" />
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-950 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>

                {isEditMode && (
                  <button
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 rounded-2xl bg-emerald-600 p-3 text-white shadow-xl transition-all duration-300 hover:bg-emerald-700 hover:scale-110 active:scale-95"
                  >
                    <Camera size={18} />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                {isEditMode ? (
                  <div className="space-y-2 max-w-md">
                    <Input
                      value={editData.name || ''}
                      onChange={e => handleInputChange('name', e.target.value)}
                      placeholder="Full Name"
                      className="text-xl font-bold bg-slate-50 dark:bg-[#020a07] border-emerald-200 dark:border-emerald-800 rounded-xl"
                    />
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{userData.role}</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-emerald-50 tracking-tight">
                      {userData.name}
                    </h2>
                    <div className="inline-block mt-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60 rounded-lg text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
                      {userData.role}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-200/50">
                  Contact Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-emerald-300">
                      <Mail size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Email Address
                    </label>
                    {isEditMode ? (
                      <Input
                        type="email"
                        value={editData.email || ''}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="Email"
                        className="bg-slate-50 dark:bg-[#020a07] border-slate-200 dark:border-emerald-900/40 rounded-xl h-11 font-medium"
                      />
                    ) : (
                      <div className="rounded-xl bg-slate-50/80 dark:bg-[#020a07]/60 px-4 py-3 text-slate-800 dark:text-emerald-100 font-semibold border border-slate-100 dark:border-emerald-900/30 text-sm">
                        {userData.email || 'N/A'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-emerald-300">
                      <Phone size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Phone Number
                    </label>
                    {isEditMode ? (
                      <Input
                        type="tel"
                        value={editData.phoneNumber || ''}
                        onChange={e => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="Phone Number"
                        className="bg-slate-50 dark:bg-[#020a07] border-slate-200 dark:border-emerald-900/40 rounded-xl h-11 font-medium"
                      />
                    ) : (
                      <div className="rounded-xl bg-slate-50/80 dark:bg-[#020a07]/60 px-4 py-3 text-slate-800 dark:text-emerald-100 font-semibold border border-slate-100 dark:border-emerald-900/30 text-sm">
                        {userData.phoneNumber || 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-200/50">
                  Academic Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-emerald-300">
                      <BookOpen size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Class / Batch
                    </label>
                    {isEditMode ? (
                      <Input
                        value={editData.class || ''}
                        onChange={e => handleInputChange('class', e.target.value)}
                        placeholder="Class"
                        className="bg-slate-50 dark:bg-[#020a07] border-slate-200 dark:border-emerald-900/40 rounded-xl h-11 font-medium"
                      />
                    ) : (
                      <div className="rounded-xl bg-slate-50/80 dark:bg-[#020a07]/60 px-4 py-3 text-slate-800 dark:text-emerald-100 font-semibold border border-slate-100 dark:border-emerald-900/30 text-sm">
                        {userData.class || 'N/A'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-emerald-300">
                      <Building2 size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Institute
                    </label>
                    {isEditMode ? (
                      <Input
                        value={editData.institute || ''}
                        onChange={e => handleInputChange('institute', e.target.value)}
                        placeholder="Institute"
                        className="bg-slate-50 dark:bg-[#020a07] border-slate-200 dark:border-emerald-900/40 rounded-xl h-11 font-medium"
                      />
                    ) : (
                      <div className="rounded-xl bg-slate-50/80 dark:bg-[#020a07]/60 px-4 py-3 text-slate-800 dark:text-emerald-100 font-semibold border border-slate-100 dark:border-emerald-900/30 text-sm">
                        {userData.institute || 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Mode Buttons */}
            {isEditMode && (
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-emerald-900/30">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30 rounded-xl h-12 font-bold"
                >
                  <Save size={16} />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 gap-2 border-slate-200 dark:border-emerald-900/60 hover:bg-slate-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-emerald-200 rounded-xl h-12 font-bold"
                >
                  <X size={16} />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-4 backdrop-blur-xl">
          <p className="text-xs font-semibold text-slate-600 dark:text-emerald-200/80 text-center">
            💡 আপনার প্রোফাইল তথ্য আপডেট রাখলে রুটস অব বায়োলজি (Roots Of Biology) থেকে সঠিক সময়ে নোটিফিকেশন ও সার্ভিস পেতে সুবিধা হবে।
          </p>
        </div>

      </div>
    </div>
  )
}