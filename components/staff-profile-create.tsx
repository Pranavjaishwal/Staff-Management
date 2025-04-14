"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Eye, EyeOff, X, Info, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StaffProfileCreateProps {
  onSave: (data: any) => void
  onClose: () => void
}

export default function StaffProfileCreate({ onSave, onClose }: StaffProfileCreateProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Profile tab
    enableTwoFactor: false,
    avatar: "",
    staffCode: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthday: null as Date | null,
    email: "",
    phone: "",
    workplace: "",
    status: "",
    jobPosition: "",
    directManager: "",
    role: "Employee",
    academicLevel: "Not required",
    hourlyRate: "0.00",
    defaultLanguage: "System Default",
    direction: "System Default",
    emailSignature: "",
    otherInformation: "",
    twilioPhoneNumber: "",
    isTwilioWhatsAppEnabled: "",
    password: "",

    // Related information tab
    domicile: "",
    maritalStatus: "",
    currentAddress: "",
    nation: "",
    placeOfBirth: "",
    religion: "",
    citizenIdentification: "",
    dateOfIssue: null as Date | null,
    placeOfIssue: "",
    resident: "",
    bankAccountNumber: "",
    bankAccountName: "",
    bankName: "",
    personalTaxCode: "",
    epfNo: "",
    socialSecurityNo: "",
    facebook: "",
    linkedin: "",
    skype: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleInputChange("avatar", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Basic validation
    if (!formData.staffCode || !formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all required fields")
      return
    }

    onSave(formData)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Staff profile Create</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 max-w-[400px] mx-4 mt-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="related-information">Related information</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="enableTwoFactor"
                checked={formData.enableTwoFactor}
                onCheckedChange={(checked) => handleInputChange("enableTwoFactor", checked)}
              />
              <div className="flex items-center gap-1">
                <Label htmlFor="enableTwoFactor">Enable Email Two Factor Authentication</Label>
                <Info size={16} className="text-gray-500" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
                {formData.avatar ? (
                  <img
                    src={formData.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#D8DEE9] flex items-center justify-center">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M50 50C62.1875 50 72 40.1875 72 28C72 15.8125 62.1875 6 50 6C37.8125 6 28 15.8125 28 28C28 40.1875 37.8125 50 50 50ZM50 61.5C33.3125 61.5 0 69.875 0 86.5V94H100V86.5C100 69.875 66.6875 61.5 50 61.5Z"
                        fill="#B8C4DB"
                      />
                    </svg>
                  </div>
                )}

                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        handleInputChange("avatar", reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />

                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white"
                >
                  <span>Upload Photo</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="staffCode">Staff code</Label>
                </div>
                <Input
                  id="staffCode"
                  value={formData.staffCode}
                  onChange={(e) => handleInputChange("staffCode", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="firstName">First name</Label>
                </div>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="lastName">Last name</Label>
                </div>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.birthday && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthday ? format(formData.birthday, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.birthday || undefined}
                      onSelect={(date) => handleInputChange("birthday", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workplace">Workplace</Label>
                <Select value={formData.workplace} onValueChange={(value) => handleInputChange("workplace", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office1">Office 1</SelectItem>
                    <SelectItem value="office2">Office 2</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="status">Status</Label>
                </div>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Working" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="onLeave">On Leave</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label htmlFor="jobPosition">Job position</Label>
                </div>
                <Select value={formData.jobPosition} onValueChange={(value) => handleInputChange("jobPosition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="directManager">Direct manager</Label>
                <Select
                  value={formData.directManager}
                  onValueChange={(value) => handleInputChange("directManager", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager1">Manager 1</SelectItem>
                    <SelectItem value="manager2">Manager 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicLevel">Academic level</Label>
                <Select
                  value={formData.academicLevel}
                  onValueChange={(value) => handleInputChange("academicLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not required" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not required">Not required</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <div className="flex">
                  <Input
                    id="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                    className="rounded-r-none"
                  />
                  <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-gray-50">
                    ₹
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <Select
                  value={formData.defaultLanguage}
                  onValueChange={(value) => handleInputChange("defaultLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="System Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="System Default">System Default</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direction">Direction</Label>
                <Select value={formData.direction} onValueChange={(value) => handleInputChange("direction", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="System Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="System Default">System Default</SelectItem>
                    <SelectItem value="LTR">LTR</SelectItem>
                    <SelectItem value="RTL">RTL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="emailSignature">Email Signature</Label>
                  <Info size={16} className="text-gray-500" />
                </div>
                <Textarea
                  id="emailSignature"
                  value={formData.emailSignature}
                  onChange={(e) => handleInputChange("emailSignature", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherInformation">Other information</Label>
                <Textarea
                  id="otherInformation"
                  value={formData.otherInformation}
                  onChange={(e) => handleInputChange("otherInformation", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Check size={16} className="text-blue-500" />
                <Label htmlFor="twilioPhoneNumber">Twilio Phone Number</Label>
              </div>
              <Input
                id="twilioPhoneNumber"
                value={formData.twilioPhoneNumber}
                onChange={(e) => handleInputChange("twilioPhoneNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Check size={16} className="text-blue-500" />
                <Label htmlFor="isTwilioWhatsAppEnabled">Is twilio number whats app enabled</Label>
              </div>
              <Select
                value={formData.isTwilioWhatsAppEnabled}
                onValueChange={(value) => handleInputChange("isTwilioWhatsAppEnabled", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Note: if you populate this field, password will be changed on this member.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="related-information" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domicile">Domicile</Label>
              <Input
                id="domicile"
                value={formData.domicile}
                onChange={(e) => handleInputChange("domicile", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital status</Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) => handleInputChange("maritalStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current address</Label>
              <Input
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => handleInputChange("currentAddress", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nation">Nation</Label>
              <Input
                id="nation"
                value={formData.nation}
                onChange={(e) => handleInputChange("nation", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of birth</Label>
              <Input
                id="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                value={formData.religion}
                onChange={(e) => handleInputChange("religion", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenIdentification">Citizen identification</Label>
              <Input
                id="citizenIdentification"
                value={formData.citizenIdentification}
                onChange={(e) => handleInputChange("citizenIdentification", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfIssue">Date of issue</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfIssue && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfIssue ? format(formData.dateOfIssue, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfIssue || undefined}
                    onSelect={(date) => handleInputChange("dateOfIssue", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfIssue">Place of issue</Label>
              <Input
                id="placeOfIssue"
                value={formData.placeOfIssue}
                onChange={(e) => handleInputChange("placeOfIssue", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resident">Resident</Label>
              <Input
                id="resident"
                value={formData.resident}
                onChange={(e) => handleInputChange("resident", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">Bank account number</Label>
              <Input
                id="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountName">Bank account name</Label>
              <Input
                id="bankAccountName"
                value={formData.bankAccountName}
                onChange={(e) => handleInputChange("bankAccountName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Bank name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalTaxCode">Personal tax code</Label>
              <Input
                id="personalTaxCode"
                value={formData.personalTaxCode}
                onChange={(e) => handleInputChange("personalTaxCode", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="epfNo">EPF No</Label>
              <Input id="epfNo" value={formData.epfNo} onChange={(e) => handleInputChange("epfNo", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialSecurityNo">Social Security No</Label>
              <Input
                id="socialSecurityNo"
                value={formData.socialSecurityNo}
                onChange={(e) => handleInputChange("socialSecurityNo", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="facebook">Facebook</Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="skype">Skype</Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M12 18c-6.36 0-11.5-2.69-11.5-6s5.14-6 11.5-6 11.5 2.69 11.5 6-5.14 6-11.5 6Z"></path>
                  <path d="M12 14v4"></path>
                  <path d="M9 14v4"></path>
                  <path d="M15 14v4"></path>
                  <path d="M12 8v6"></path>
                </svg>
              </div>
              <Input id="skype" value={formData.skype} onChange={(e) => handleInputChange("skype", e.target.value)} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 p-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}
