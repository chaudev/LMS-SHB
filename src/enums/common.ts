/**
 * 1. Admin
 * 2. Giáo viên
 * 3. Học sinh
 * 4. Quản lý
 * 5. Tư vấn viên
 * 6. Kế toán
 * 7. Học vụ
 * 8. Phụ huynh
 * 9. Trợ lý đào tạo
 * 10. Sale-admin
 * 11. Marketing
 * 12. Kế toán trưởng
 * 13. Nhân viên hành chính - nhân sự
 * 14. Trưởng phòng hành chính - nhân sự
 * 15. Hồ sơ (giống học vụ)
 * 16. Nội trú (giống học vụ)
 * 17. Nhân viên nghiệp vụ và đối ngoại
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
