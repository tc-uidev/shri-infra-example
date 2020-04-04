export const loadData = (value?: string) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => resolve(value), Math.random() * 5000)
    });
};