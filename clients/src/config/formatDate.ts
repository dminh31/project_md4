function formatDate(inputDate: any) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    const formattedDate = `${h}:${m}:${s} , ${day}/${month}/${year}`;
    return formattedDate;
}

export default formatDate;
