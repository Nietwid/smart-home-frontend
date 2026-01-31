export default (count: number) => {
    if (count <= 1) return 1;
    return Math.ceil(Math.sqrt(count));
};