
export const random = (arr: any[]) => {
    if (typeof arr === "undefined") return
    return arr[Math.floor(Math.random() * arr?.length)]
}