
export const random = (arr: any[]) => {
    if (typeof arr === "undefined") return
    return arr[Math.floor(Math.random() * arr?.length)]
}

export const cleanDescription = (string?: string) => {
    let cleanString = string?.replace(/<[^>]*>/g, '');
    cleanString = cleanString?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    return cleanString
}