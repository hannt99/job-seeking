'use client';

import Link from 'next/link';
import { FaCircle, FaXmark } from 'react-icons/fa6';
import { formatVNTimeAgo } from '@/utils/formatDateTime';

const NotificationCard = (props) => {
    return (
        <li
            onClick={props.handleChangeNotificationStatus}
            className="group/item-list relative w-full p-[12px] text-[1.3rem] cursor-pointer hover:bg-[var(--secondary-color)] transition-all duration-[0.5s]"
        >
            <Link className="w-full" href={props.linkTask}>
                <p title={props.notification} className="w-[90%] truncate">
                    {props.notification}
                </p>
                <p className="text-[1rem]">{formatVNTimeAgo(props.createdAt)}</p>
            </Link>
            {!props.isRead && (
                <div className="absolute top-[50%] translate-y-[-50%] right-[16px] text-blue-500">
                    <FaCircle />
                </div>
            )}
            <div
                onClick={props.handleDelete}
                className="hidden absolute top-[50%] translate-y-[-50%] right-[36px] w-[30px] h-[30px] bg-white text-[1.8rem] leading-none rounded-full custom-shadow-v2 group-hover/item-list:flex"
            >
                <FaXmark className="m-auto" />
            </div>
        </li>
    );
};

export default NotificationCard;
