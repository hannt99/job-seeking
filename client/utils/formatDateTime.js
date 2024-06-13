import TimeAgo from 'javascript-time-ago';

export const formatVNDate = (dateToFormat) => {
    const date = new Date(dateToFormat || null);
    let intl = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
    });
    const formatedDate = intl.format(date);
    return formatedDate;
};

export const formatVNTimeAgo = (timeToFormat) => {
    const timeAgo = new TimeAgo();
    const result = timeAgo.format(new Date(timeToFormat));
    return result;
};
