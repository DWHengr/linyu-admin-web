export function daysDifference(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);
    const timeDifference = today - inputDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference;
}

export function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}