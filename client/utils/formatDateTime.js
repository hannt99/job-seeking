export const formatVNDate = (dateToFormat) => {
    const date = new Date(dateToFormat || null);
    let intl = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
    });
    const formatedDate = intl.format(date);
    return formatedDate;
};
