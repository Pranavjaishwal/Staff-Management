"use client"

import { useState, useEffect } from "react"
import StaffProfileCreate from "@/components/staff-profile-create"
import StaffProfileDisplay from "@/components/staff-profile-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [staffList, setStaffList] = useState<any[]>([])
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  // Load staff data from localStorage on component mount
  useEffect(() => {
    const savedStaffList = localStorage.getItem("staffList")
    if (savedStaffList) {
      try {
        setStaffList(JSON.parse(savedStaffList))
      } catch (error) {
        console.error("Error parsing staff list from localStorage:", error)
      }
    }
  }, [])

  const handleSaveStaff = (data: any) => {
    // Generate a unique ID for the staff member
    const newStaff = { ...data, id: Date.now().toString() }

    // Update the staff list
    const updatedList = [...staffList, newStaff]
    setStaffList(updatedList)

    // Save to localStorage
    localStorage.setItem("staffList", JSON.stringify(updatedList))

    // Select the newly created staff
    setSelectedStaff(newStaff)
    setShowCreateForm(false)
  }

  const handleOpenCreateForm = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const handleSelectStaff = (staff: any) => {
    setSelectedStaff(staff)
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button onClick={handleOpenCreateForm}>Create Staff Profile</Button>
      </div>

      {staffList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {staffList.map((staff) => (
            <Card
              key={staff.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${selectedStaff?.id === staff.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSelectStaff(staff)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-2 mt-2">
                  {staff.avatar ? (
                    <img src={staff.avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#D8DEE9] flex items-center justify-center">
                      <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M50 50C62.1875 50 72 40.1875 72 28C72 15.8125 62.1875 6 50 6C37.8125 6 28 15.8125 28 28C28 40.1875 37.8125 50 50 50ZM50 61.5C33.3125 61.5 0 69.875 0 86.5V94H100V86.5C100 69.875 66.6875 61.5 50 61.5Z"
                          fill="#B8C4DB"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-center">
                  {staff.firstName} {staff.lastName}
                </h3>
                <p className="text-sm text-muted-foreground text-center">{staff.jobPosition || "No position"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedStaff && <StaffProfileDisplay staffData={selectedStaff} />}

      {staffList.length === 0 && !showCreateForm && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No staff profiles found. Create your first staff profile.</p>
          <Button onClick={handleOpenCreateForm}>Create Staff Profile</Button>
        </div>
      )}

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <StaffProfileCreate onSave={handleSaveStaff} onClose={handleCloseCreateForm} />
          </div>
        </div>
      )}
    </main>
  )
}
