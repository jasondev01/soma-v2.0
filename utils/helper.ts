
export const random = (arr: any[]) => {
    if (typeof arr === "undefined") return
    return arr[Math.floor(Math.random() * arr?.length)]
}

export const cleanDescription = (string?: string) => {
    let cleanString = string?.replace(/<[^>]*>/g, '')
    cleanString = cleanString?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    
    return cleanString
}

export const formatTime = (totalMinutes: number): string => {
    const hours: number = Math.floor(totalMinutes / 60)
    const minutes: number = totalMinutes % 60
    
    let formattedTime: string = ''
    
    if (hours > 0) {
        formattedTime += `${hours} hour`
        if (hours > 1) {
            formattedTime += 's'
        }
    }
    
    if (minutes > 0) {
        if (formattedTime !== '') {
            formattedTime += ', '
        }
        formattedTime += `${minutes} min`
    }
    
    return formattedTime
}