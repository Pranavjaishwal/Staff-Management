import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface StaffProfileDisplayProps {
  staffData: any
}

export default function StaffProfileDisplay({ staffData }: StaffProfileDisplayProps) {
  // Format date if it exists
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return format(new Date(date), "do MMM yyyy")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border mb-4">
              {staffData.avatar ? (
                <img src={staffData.avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
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
            </div>

            <h2 className="text-xl font-bold mb-2">
              {staffData.firstName} {staffData.lastName}
            </h2>

            <div className="flex gap-3 mb-4">
              {staffData.facebook && (
                <a href={staffData.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              )}

              {staffData.linkedin && (
                <a href={staffData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}

              {staffData.email && (
                <a href={`mailto:${staffData.email}`} className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>{staffData.email}</span>
            </div>

            {staffData.phone && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{staffData.phone}</span>
              </div>
            )}

            {staffData.academicLevel && staffData.academicLevel !== "Not required" && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>{staffData.academicLevel}</span>
              </div>
            )}

            {staffData.jobPosition && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{staffData.jobPosition}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {staffData.directManager && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Direct manager:</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span>{staffData.directManager}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>General information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Staff code</span>
                <span className="font-medium">{staffData.staffCode}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Staff name</span>
                <span className="font-medium">
                  {staffData.firstName} {staffData.lastName}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Gender</span>
                <span className="font-medium">{staffData.gender || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Birthday</span>
                <span className="font-medium">{formatDate(staffData.birthday) || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{staffData.phone || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Workplace</span>
                <span className="font-medium">{staffData.workplace || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Status</span>
                <span className="font-medium">{staffData.status || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Job position</span>
                <span className="font-medium">{staffData.jobPosition || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Academic level</span>
                <span className="font-medium">
                  {staffData.academicLevel !== "Not required" ? staffData.academicLevel : "-"}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Hourly Rate</span>
                <span className="font-medium">₹{staffData.hourlyRate}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Religion</span>
                <span className="font-medium">{staffData.religion || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Nation</span>
                <span className="font-medium">{staffData.nation || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Marital status</span>
                <span className="font-medium">{staffData.maritalStatus || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Related information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Citizen identification</span>
                <span className="font-medium">{staffData.citizenIdentification || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Date of issue</span>
                <span className="font-medium">{formatDate(staffData.dateOfIssue) || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Place of birth</span>
                <span className="font-medium">{staffData.placeOfBirth || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Current address</span>
                <span className="font-medium">{staffData.currentAddress || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Bank account number</span>
                <span className="font-medium">{staffData.bankAccountNumber || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Bank account name</span>
                <span className="font-medium">{staffData.bankAccountName || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Bank name</span>
                <span className="font-medium">{staffData.bankName || "-"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Personal tax code</span>
                <span className="font-medium">{staffData.personalTaxCode || "-"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
