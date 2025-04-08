import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import { clearNotification } from "../../redux/slide/notification";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const NotificationProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notificationType, message } = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (notificationType && message) {
      if (notificationType === "success") {
        toast.success(message, { position: "top-right", autoClose: 3000 });
      } else if (notificationType === "error") {
        toast.error(message, { position: "top-right", autoClose: 3000 });
      }

      dispatch(clearNotification());
    }
  }, [notificationType, message, dispatch]);

  return null;
};

export default NotificationProvider;
