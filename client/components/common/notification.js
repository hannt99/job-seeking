'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoNotifications } from 'react-icons/io5';
import NotificationCard from './notificationCard';
import { socket } from '@/socket';

const Notification = () => {
    const [notiTab, setNotiTab] = useState(false);
    // const [isNewNoti, setIsNewNoti] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notReadNoti, setNotReadNoti] = useState([]);
    const [reRender, setReRender] = useState(false);

    const handleChangeNotificationStatus = async (id) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/notification/change-status/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
        );
        if (res?.data?.code === 200) {
            return setReRender(!reRender);
        } else {
            return;
        }
    };

    const handleDelete = async (id) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notification/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            return setReRender(!reRender);
        } else {
            return;
        }
    };

    useEffect(() => {
        socket.on('getNotification', (data) => {
            setReRender(!reRender);
        });
    }, [socket, reRender]);

    useEffect(() => {
        const fetchNotification = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/get-all`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setNotReadNoti(res?.data?.notRead);
                if (notiTab === false) {
                    return setNotifications(res?.data?.notifications);
                } else {
                    setNotifications(res?.data?.notRead);
                }
            } else {
                return;
            }
        };
        fetchNotification();
    }, [notiTab, reRender]);

    return (
        <div className="group relative text-[2.6rem] mr-5 p-3 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-full cursor-pointer">
            <IoNotifications />
            <span
                className={
                    notReadNoti?.length > 0
                        ? 'absolute block top-0 right-0 text-center min-w-[18px] text-[1rem] font-semibold text-[white] bg-red-600 p-1.5 rounded-full leading-none'
                        : 'hidden'
                }
            >
                {notReadNoti?.length}
            </span>
            <div className="hidden absolute top-[100%] right-[-12px] border text-black bg-white custom-shadow-v1 group-hover:block rounded-lg z-[999]">
                <div className="p-[12px] cursor-default">
                    <h3 className="text-[2.4rem] font-bold">Thông báo</h3>
                    <div className="flex items-center gap-x-3 text-[1.5rem]">
                        <div
                            onClick={() => setNotiTab(false)}
                            className={
                                notiTab === false
                                    ? 'text-[var(--primary-color)] font-semibold bg-[var(--secondary-color)] p-3 rounded-xl cursor-pointer hover:bg-[#f1f1f1]'
                                    : 'font-semibold p-3 rounded-xl cursor-pointer hover:bg-[#f1f1f1]'
                            }
                        >
                            Tất cả
                        </div>
                        <div
                            onClick={() => setNotiTab(true)}
                            className={
                                notiTab === true
                                    ? 'text-[var(--primary-color)] font-semibold bg-[var(--secondary-color)] p-3 rounded-xl cursor-pointer hover:bg-[#f1f1f1]'
                                    : 'font-semibold p-3 rounded-xl cursor-pointer hover:bg-[#f1f1f1]'
                            }
                        >
                            Chưa đọc
                        </div>
                    </div>
                </div>
                <ul className="w-[320px] max-h-[300px] overflow-hidden hover:overflow-y-auto">
                    {notifications?.length > 0 ? (
                        notifications
                            ?.sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })
                            .map((notification, index) => {
                                return (
                                    <NotificationCard
                                        key={index}
                                        linkTask={notification?.link}
                                        notification={notification?.notification}
                                        createdAt={notification?.createdAt}
                                        isRead={notification.isRead}
                                        handleChangeNotificationStatus={() =>
                                            handleChangeNotificationStatus(notification?._id)
                                        }
                                        handleDelete={() => {
                                            handleDelete(notification?._id);
                                        }}
                                    />
                                );
                            })
                    ) : (
                        <li className="w-full truncate p-[12px] text-[1.3rem] text-center cursor-default">
                            Không có thông báo
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Notification;
