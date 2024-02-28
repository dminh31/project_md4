import { notification } from "antd"
const successNoti = (type:any) => {
    notification.success({
        message: type,
        style: {
            top: 100,
        },
    });
}
const failedNoti = (type:any) => {
    notification.error({
        message: type,
        style: {
            top: 100,
        },
    });
}
export { successNoti, failedNoti }