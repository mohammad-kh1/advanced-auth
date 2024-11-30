export const daysFromNow = (day:number):Date => new Date(Date.now() + day * 24 * 60 * 60 *1000);
export const minuteFromNow = (minute:number): Date => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minute);
    return now;

}