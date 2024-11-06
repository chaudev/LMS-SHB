import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { dormitoryRegisterApi } from "~/api/dormitory/dormitory-register"
import { userInformationApi } from "~/api/user/user"
import { EDormitoryRegisterStatus } from "~/enums/common"
import { RootState } from "~/store"

export const useCurrentUserDormitory = (props?: {
    enabled?: boolean
}) => {
    const { enabled = true } = props || {}
    const userInformation = useSelector((state: RootState) => state.user.information)
    const userId = +userInformation.UserInformationId

    const { data, isLoading } = useQuery({
		queryKey: [userInformationApi.keyGetUserDormitory, userId],
		queryFn: () => userInformationApi.getDormitory(userId).then(data => data.data.data),
		enabled: !!userId && enabled
	})

    return {
        data: data || [],
        isLoading,
    }
}