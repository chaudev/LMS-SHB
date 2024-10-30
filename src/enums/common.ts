/** Dựa vào file sheet phân quyền
 * * Link: https://docs.google.com/spreadsheets/d/1UtzzVoqTLlofG7hcpnliltl1fUWwA7Cu/edit?gid=332214583#gid=332214583
 *
 * * Khối đào tạo
 * 2. Giáo viên
 * 9. Trợ lý đào tạo
 *
 * * Khối tuyền sinh
 * 5. Tư vấn viên
 * 10. Sale-admin
 * 11. Marketing
 *
 * * Khối quản trị tổng hợp
 * 6. Kế toán
 * 12. Kế toán trưởng
 * 13. Nhân viên hành chính - nhân sự
 * 14. Trưởng phòng hành chính - nhân sự
 *
 * * Khối TN-QLHV
 * 7. Học vụ
 * 15. Hồ sơ (giống học vụ)
 * 16. Nội trú (giống học vụ)
 *
 * * Khối NV&ĐN
 * 17. Nhân viên nghiệp vụ và đối ngoại
 *
 * * Quyền quản lý
 * 1. Admin
 * 4. Quản lý
 *
 *
 * 3. Học sinh
 * 8. Phụ huynh
 */
export enum ERole {
	admin = 1,
	teacher = 2,
	student = 3,
	manager = 4,
	saler = 5,
	accountant = 6,
	academic = 7,
	parent = 8,
	trainingAssistant = 9,
	saleAdmin = 10,
	marketing = 11,
	chiefAccountant = 12,
	administrativeHRStaff = 13,
	administrativeHRManager = 14,
	profile = 15,
	residency = 16,
	foreignAffairsOfficer = 17
}

export enum EGender {
	Other = 0,
	Male = 1,
	Female = 2
}

export enum EParentRelationship {
	/** Cha */
	Father = 1,
	/** Mẹ */
	Mother = 2,
	/** Người thân */
	Relatives = 3
}

export enum EDormitoryRegisterStatus {
	ChoNhapKhu = 1,
	TrongKhu = 2,
	XuatKhu = 3,
	Huy = 4
}

export const dormitoryRegisterStatusFilter = [
	{
		label: "Chờ nhập khu",
		value: EDormitoryRegisterStatus.ChoNhapKhu
	},
	{
		label: "Trong khu",
		value: EDormitoryRegisterStatus.TrongKhu
	},
	{
		label: "Xuất khu",
		value: EDormitoryRegisterStatus.XuatKhu
	},
	{
		label: "Hủy",
		value: EDormitoryRegisterStatus.Huy
	},
]
